//読込確認用
// alert("logic.js 読み込み中")　

import {
  HandLandmarker,
  FilesetResolver
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0";

import {judgeHand} from './gesture.js';

// ランドマーク取得用AIの初期設定用
let runningMode = "VIDEO";

let webcamRunning = false;
let enableWebcamButton;
// ランドマークをどの関数でも使用できるにグローバルに記述
let handLandmarker = undefined;
const video = document.getElementById("webcam");
// ここでキャンバスを定数に入れて手のlandmarkを描画する
const canvasElement = document.getElementById("output_canvas");
// 2dで描画をするよ！！
const canvasCtx = canvasElement.getContext("2d")

const demosSection = document.getElementById("demos");
//   インポートの読み込み確認
console.log("HandLandmarkerの読み込みに成功しました:", HandLandmarker);

// インスタンス化
// インターネットからダウンロードするから非同期関数（async）にしてほかの処理を同時に行う
const createHandLandmarker = async () => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
  );
  // 手の検出システムをインスタンス化(createFromOptions:オプション設定)
  handLandmarker = await HandLandmarker.createFromOptions(vision, {
    baseOptions: {
      // 手の形を学習済みの「モデルデータ（.taskファイル）」を読み込むURL
      modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
      // CPUとGPUどちらで計算するか
      delegate: "GPU"
    },
    //   渡されるデータの種類 VIDEP or IMAGE
    runningMode: runningMode,
    //   認識する手の数
    numHands: 1
  });
  demosSection.classList.remove("invisible");
};
createHandLandmarker();


// このブラウザはカメラのサポートしているか確認
const hasGetUserMedia = () => !!navigator.mediaDevices?.getUserMedia;

// イベントハンドラーの作成　ボタンのクリックでlandmarkの描画
if (hasGetUserMedia()) {
  enableWebcamButton = document.getElementById("webcamButton");
  // enableWebcamButton.addEventListener("click", console.log("インベトハンドラー"));
  enableWebcamButton.addEventListener("click", enableCam); 
} else {
  // console.warn console.log の警告メッセージ版
  console.warn("カメラが対応していません")
}

// イベントの内容を決定
function enableCam(event) {
  // ！handLandmarker：　！handLandmarkerが準備できていなければ
  if (!handLandmarker) {
    console.log("インスタンス化エラー")
    return;
  }

  // ボタンのオンオフ切り替え
  if (webcamRunning === true) {
    webcamRunning = false;
    enableWebcamButton.innerText = "falseになってます";
  } else {
    webcamRunning = true;
    enableWebcamButton.innerText = "trueになってます";
  }

  // getUserMedia パラメータ。 ユーザ側のカメラ設定をいじることができるので個別に分けて設定しておく
  const constraints = {
    video: true
  };
  // カメラのストリーミング
  // getUserMedia(constraints).を起動して streamという型に 撮影したデータを入れていく
  navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
    //videoタグに対して取得した映像を張り付けしている
    video.srcObject = stream;
    //videoタグがデータがロードし始めたらイベントを開始する
    video.addEventListener("loadeddata", predictWebcam);
  });
}

// lastVideoTime:ビデオの再生時間から
let lastVideoTime = -1;
let results = undefined;
console.log(video);
// 画面サイズが変更されても表示がバグるのを防ぐために
async function predictWebcam() {
  // video.videoWidth = 640　ブラウザ側が動画データに合わせてサイズを入れてくれる
  // style.width：キャンパスのブラウザ上の大きさ
  canvasElement.style.width = video.videoWidth;
  canvasElement.style.height = video.videoHeight;
  // width：キャンパスの解像度を入れる
  canvasElement.width = video.videoWidth;
  canvasElement.height = video.videoHeight;
  // video.videoHeightを両方入れ揃えないとウィンドウのサイズなどでランドマークの位置がずれて表示される！！

  // ▽▽ここは念のために書いている場所です本来は必要ありません！▽▽
  // AIのモードが静止画になっているなら動画ように切り替えます！
  if (runningMode === "IMAGE") {
    runningMode = "VIDEO"; //ここで現在のモードをビデオだよってメモする
    await handLandmarker.setOptions({ runningMode: "VIDEO" }); //実際にAIにあなたはビデオを監視してねって伝える！
    // 同じようなことを2回している理由は下のコードがawait(非同期)で実行することになっているので処理が遅くなっているから
    // 値が完全にビデオモードになる前に他の関数から現在の状態を聞かれた時の為にすぐ切り替えられる runningMode = "VIDEO"; で他の関数に伝える
  }
  // △△ここは念のために書いている場所です本来は必要ありません！△△

  // predictWebcam が 動いてからの時間を取得して変数に入れる
  // detecFOrVideo モードのAIは、前のフレームからどれくらい時間が経過したかを確認する必要があるため

  //startTimeMs：AIに入れる用の変数
  let startTimeMs = performance.now();
  // ここで前のフレームから進んでいるのか確認することで同じフレームを２回解析するのを防ぐ
  if (lastVideoTime !== video.currentTime) {
    // lastVideoTime:私たちが使う用の変数
    lastVideoTime = video.currentTime

    // ここでresultsに手のlandmarkを取得していれる
    // detectForVideo：これが解析用の関数
    results = handLandmarker.detectForVideo(video, startTimeMs);
  }

  // キャンバスに関する設定を保存する
  canvasCtx.save();

  // キャンバスの絵を削除している　これで今のフレームの絵だけ描画する
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

  // 検出結果が格納されているならば
  if (results.landmarks) {
    console.log(results.landmarks)
    // ここで定数landmarksにresults.landmarksを代入
    for (const landmarks of results.landmarks) {
      // drawConnectors :landmarkの線の描画
      drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
        color: "#00FF00", //線の色　ライムグリーン
        lineWidth: 5 //描画の線のピクセル
      });
      // ランドマークが取得できているか確認用
      //drawLandmarks　:landmarkの点の描画
      drawLandmarks(canvasCtx, landmarks, { color: "#FF0000", lineWidth: 2 });
      let hand_gestuer = judgeHand(landmarks)
      if(hand_gestuer == "paper"){
        console.log("これはパーです")
      }else if(hand_gestuer == "scissors"){
        console.log("これはチョキです")
      }else if(hand_gestuer == "rock"){
        console.log("これはグーです")
      }else{
        console.log("じゃんけんだろぉ")
      }
    }

    
  }
    // キャンバスの設定をいったんリセットする
    canvasCtx.restore();

    // ブラウザの準備が整ったら、予測を継続するためにこの関数を再度呼び出してください。
    if (webcamRunning == true) {
      console.log("ボタン押されたよ！")
      window.requestAnimationFrame(predictWebcam);
    }
}

