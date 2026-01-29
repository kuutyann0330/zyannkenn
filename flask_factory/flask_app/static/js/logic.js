import {
    HandLandmarker,
    FilesetResolver
  } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0";

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
        delegate: "cpu"
      },
    //   渡されるデータの種類 VIDEP or IMAGE
      runningMode: "VIDEO",
      //   認識する手の数
      numHands: 2
    });
    demosSection.classList.remove("invisible");
  };
  createHandLandmarker();

  // ここでキャンバスを定数に入れて手のlandmarkを描画する
  const canvasElement = document.getElementById("output_canvas");
  // 2dで描画をするよ！！
  const canvasCtx = canvasElement.getContext("2d")

  // このブラウザはカメラのサポートしているか確認
  const hasGetUserMedia = () => !!navigator.mediaDevices?.getUserMedia;

  // イベントハンドラーの作成　ボタンのクリックでlandmarkの描画
  if(hasGetUserMedia()){
    enableWebcamButton = document.getElementById("webcamButton");
    enableWebcamButton.addEventListener("click", enableCam);
  } else{
    // console.warn console.log の警告メッセージ版
    console.warn("カメラが対応していません")
  }

  // イベントの内容を決定
  function enableCam(event){
    // ！handLandmarker：　！handLandmarkerが準備できていなければ
    if (!handLandmarker){
      console.log("インスタンス化エラー")
      return;
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

    画面サイズが変更されても表示がバグるのを防ぐために
    let lastVideoTime = -1;
    let results = undefined;
    console.log(video);
    async function predictWebcam() {
      canvasElement.style.width = video.videoWidth;;
      canvasElement.style.height = video.videoHeight;
      canvasElement.width = video.videoWidth;
      canvasElement.height = video.videoHeight;
    
    
    
    
    }
  
