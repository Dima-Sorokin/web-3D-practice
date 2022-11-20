import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 500);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg') });
let theModel;
let scrollPasition = 0;

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(50);
renderer.render(scene, camera);

////torus sphear
// const geometry = new THREE.TorusGeometry(12, 4, 30, 100);
// const material = new THREE.MeshStandardMaterial({ color: 'green' });
// const torus = new THREE.Mesh(geometry, material);

// scene.add(torus);
////lights
const pointLight = new THREE.PointLight(0xffffff);
const ambientLight = new THREE.AmbientLight(0x404040, 1)
pointLight.position.set(14, 14, 14);
scene.add(pointLight, ambientLight);

////helpers
//const lightHelper = new THREE.PointLightHelper(pointLight);
// const axesHelper = new THREE.AxesHelper(30);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper,axesHelper);


////controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true
controls.target.set(0, 0, 0)

//space background
function addStar() {
  const geometry = new THREE.SphereGeometry(0.05, 5, 5);
  const material = new THREE.MeshStandardMaterial({ color: '#ffffff' });
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}
Array(1000).fill().forEach(addStar);

//  const spaceTexture = new THREE.TextureLoader().load('./3dObjects/space.jpg');
//  scene.background = spaceTexture;

// ////texture
// const cottageTexture = new THREE.TextureLoader().load('./3dObjects/cottage.png');
// const cottageNormalTexture = new THREE.TextureLoader().load('./3dObjects/cottage_normal.png'); 
// const cottage = new THREE.Mesh(
// new THREE.BoxGeometry(3,3,3),
// new THREE.MeshStandardMaterial({
//   map:cottageTexture,
//   normalMap:cottageNormalTexture,
// })
// );
// scene.add(cottage);

////loader
// // const mixer = THREE.AnimationMixer();
// // let modelReady = false
// // const animationActions = THREE.AnimationAction();;
// // let activeAction = THREE.AnimationAction();
// // let lastAction = THREE.AnimationAction();


//Load model
const loader = new GLTFLoader();
loader.load('./3dObjects/Animation.gltf', function (gltf) {
  gltf.scene.scale.set(5, 5, 5);
  gltf.scene.position.set(0, -5, 0);
  scene.add(gltf.scene);
  theModel = gltf.scene;
  gltf.animations; // Array<THREE.AnimationClip>
  gltf.scenes; // Array<THREE.Group>
  gltf.cameras; // Array<THREE.Camera>
  gltf.scene; // THREE.Group
  gltf.asset; // Object
  animate();

}, function (xhr) {
  console.log((xhr.loaded / xhr.total * 100) + '% loaded');
}, undefined, function (error) {
  console.error(error);
});


function animate() {
  requestAnimationFrame(animate);
  theModel.rotation.y += 0.01;
  //theModel.rotation.x += 0.0001;
   //torus.rotation.x += 0.001;
  // torus.rotation.y += 0.005;
   //torus.rotation.z += 0.01;
  renderer.render(scene, camera);
}

function rotateModel() {
  const t = document.body.getBoundingClientRect().top;
  const b = document.body.getBoundingClientRect().bottom;

  if (scrollPasition < document.documentElement.scrollTop) {
    theModel.rotation.y += 0.05;
    camera.position.z += t * -0.001
    camera.position.x += t * 0.0005
    camera.position.y += t * -0.00002
    scrollPasition = document.documentElement.scrollTop;
  } else {
    theModel.rotation.y += -0.05;
    camera.position.z += t * 0.001
    camera.position.x += t * -0.0005
    camera.position.y += t * 0.00002
    scrollPasition = document.documentElement.scrollTop;
  }
}
document.body.onscroll = rotateModel;


// document.querySelector('#app').innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `
