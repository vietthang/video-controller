const url = require("url");

const browserUrl = window.location.href;
const { videoUrl } = url.parse(browserUrl, true).query;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.OrthographicCamera(
  -width / 2,
  width / 2,
  height / 2,
  -height / 2,
  1,
  1000
);
camera.position.z = 75;

const scene = new THREE.Scene();
const geometry = new THREE.PlaneGeometry(width, height);
const video = document.createElement("video");
video.src = videoUrl;
video.autoplay = true;
video.loop = true;

const texture = new THREE.VideoTexture(video);
const material = new THREE.MeshBasicMaterial({ map: texture });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

let frameCount = 0;
let lastFrameTime = Date.now();

function animate() {
  requestAnimationFrame(animate);

  //   const video = document.getElementById("video");
  //   //   console.log("video.readyState", video.readyState);
  //   const now = Date.now();
  //   if (video.readyState >= video.HAVE_CURRENT_DATA) {
  //     frameCount++;
  //   }
  //   if (now <= lastFrameTime + 1000) {
  //     // console.log("Average Frame Time", (now - lastFrameTime) / frameCount, "ms");
  //     frameCount = 0;
  //     lastFrameTime = now;
  //   }

  renderer.render(scene, camera);
}

animate();
