import './style.css'
import * as THREE from 'three'
let scene, camera, renderer, canvas;

let sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}


function main() {

  //get canvas 
  canvas = document.querySelector('canvas.webgl')

  //initialize the camera, renderer and scene 
  init()

  //create triangle mesh 
  createTriangle()

  //register event handlers 
  window.addEventListener('resize', resize, false);

  //start the animation loop
  draw();

}

function init() {
  //get webgl context 
  renderer = new THREE.WebGLRenderer({ canvas: canvas });

  //set renderer size
  renderer.setSize(sizes.width, sizes.height)

  //set up scene 
  scene = new THREE.Scene();

  //set up camera
  camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.01, 100);
  //put camera little back to make sure our triangle is visible 
  camera.position.set(0, 0, 5)
  scene.add(camera);


}

function createTriangle() {

  // const geometry = new THREE.BoxGeometry(1, 1, 1)
  // const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
  // const mesh = new THREE.Mesh(geometry, material)
  // scene.add(mesh)

  const bufferGeometry = new THREE.BufferGeometry()

  //traingle Vertices 
  const triangleVertices = new Float32Array(
    [
      0.0, 1.0, 0.0,     // v0
      - 1.0, -1.0, 0.0,  // v1
      1.0, -1.0, 0.0     // v2
    ]);

  const traingleColor = new Float32Array(
    [
      1.0, 0.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 0.0, 1.0
    ]
  )

  bufferGeometry.setAttribute('position', new THREE.BufferAttribute(triangleVertices, 3));
  bufferGeometry.setAttribute('color', new THREE.BufferAttribute(traingleColor, 3));

  const material = new THREE.MeshBasicMaterial({ vertexColors: true })
  const mesh = new THREE.Mesh(bufferGeometry, material)
  scene.add(mesh)




}

function resize() {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
}

function draw() {

  renderer.render(scene, camera);
  requestAnimationFrame(draw)
}

main();