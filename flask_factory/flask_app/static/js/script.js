const videoElement = document.getElementById('input_video');

// 1. カメラを起動する設定
const camera = new Camera(videoElement, {
  onFrame: async () => {
     
  },
  width: 640,
  height: 480
});

// 2. カメラ開始
camera.start();




