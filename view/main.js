let renderer, scene, camera; // Threejs Stuff
let cube; // Objects
let video; // Background video
let canvas = document.getElementById('canvas');

init();
animate();
initCamera();

function init() {
  renderer = new THREE.WebGLRenderer({
    canvas,
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

  // handler touch event to rotate object
  dragHandler(canvas);
}

function animate() {
  requestAnimationFrame(animate);
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

// touch event handler
function dragHandler(canvas) {
  let isDragging = false;
  let prevMousePos = {
    x: cube.position.x,
    y: cube.position.y,
  };

  canvas.addEventListener('touchstart', e => {
    e.preventDefault();
    isDragging = true;
    // console.log('touchstart');
  });
  canvas.addEventListener('touchmove', e => {
    // console.log('touchmove');
    const { clientX, clientY } = e.touches[0];
    let deltaMove = {
      x: clientX - prevMousePos.x,
      y: clientY - prevMousePos.y
    };

    if (isDragging) {
      let deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(toRadians(deltaMove.y * 1), toRadians(deltaMove.x * 1), 0, 'XYZ'));
      cube.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube.quaternion);
    }

    prevMousePos = { x: clientX, y: clientY };
    // console.log(prevMousePos);
  });
  canvas.addEventListener('touchend', e => {
    // console.log('touchend');
    isDragging = false;
  });
}

function toRadians(angle) {
  return angle * (Math.PI / 180);
}

function initCamera() {
  function hasGetUserMedia() {
    return !!(navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia);
  }

  if (hasGetUserMedia()) {
    const constraints = {
      video: {
        width: {
          min: window.innerWidth
        },
        height: {
          min: window.innerHeight
        },
        facingMode: {
          exact: 'environment'
        }
      }
    };

    const video = document.querySelector('video');

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(stream => {
        video.srcObject = stream;
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    alert('getUserMedia() is not supported by your browser');
  }
}