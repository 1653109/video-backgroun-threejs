let renderer, scene, camera; // Threejs Stuff
let cube; // Objects
let video; // Background video

init();
animate();
initCamera();

function init() {
  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('canvas'),
    antialias: true,
    alpha: true
  });

  renderer.setClearColor(0x00ff00, 0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);

  scene = new THREE.Scene();

  // Ambient light
  let light = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
  scene.add(light);

  // Point light
  let light1 = new THREE.PointLight(0xffffff, 0.5);
  scene.add(light1);

  // the cube
  cube = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 100), new THREE.MeshLambertMaterial({ color: 0xff0000 }));
  cube.position.set(0, 0, -1000);
  scene.add(cube);


}

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

function initCamera() {
  function hasGetUserMedia() {
    return !!(navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia);
  }

  if (hasGetUserMedia()) {
    const constraints = {
      video: true
    };
    const video = document.querySelector('video');

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(stream => {
        video.srcObject = stream;
      })
      .catch(err => {
        console.log(err);
        alert(err);
      });
  } else {
    alert('getUserMedia() is not supported by your browser');
  }

}