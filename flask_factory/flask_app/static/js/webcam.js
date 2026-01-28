// webcam.js の中身

// 画面のパーツが全部揃うのを待つ
window.addEventListener('load', () => {
  const videoElement = document.getElementById('webcam');

  // もしパーツが見つからなかったらエラーを出す（デバッグ用）
  if (!videoElement) {
      console.error("video要素が見つかりません！id='webcam'は合っていますか？");
      return;
  }

  // 外の世界（window）にある Camera を使う
  // @ts-ignore (TypeScriptの場合のみ必要)
  const camera = new window.Camera(videoElement, {
      onFrame: async () => {
        
      },
      width: 640,
      height: 480
  });

  console.log("カメラを開始します...");
  camera.start();
});