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
    // 手の検出システムをインスタンス化
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

  

