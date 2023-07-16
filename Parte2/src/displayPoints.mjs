import * as THREE from "https://unpkg.com/three@0.124.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.124.0/examples/jsm/controls/OrbitControls.js";
import { lineMP } from "../lineMP.mjs";
import { drawSquare, drawBox, drawGrid, drawLine, drawAxis } from "./drawFunctions.mjs";

export function displayPoints() {
  // renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor("#e5e5e5");
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  var scene = new THREE.Scene();

  // camara
  var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.z = 20;
  camera.lookAt(0, 0, 0);

  // controls
  const controls = new OrbitControls(camera, renderer.domElement);
  camera.position.set(0, 0, 40);
  controls.update();

  // resize
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
  });

  // Chamada da função que desenha o tabuleiro
  drawGrid(scene);
  drawAxis(scene);

  // Desenhar os quadrados com o LineMP
  function drawPoints (pointsArray){
    pointsArray.forEach((element) => {
      drawBox(element.x, element.y, "yellow", scene);
    });
  }

  // Ponto de luz
  var light = new THREE.PointLight(0xffffff, 1, 500);
  light.position.set(10, 0, 25);
  scene.add(light);

  /**
   * raycaster
   */
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let coordX, coordY; // variaveis para guardar o ponto em que estamos atualmente com o rato
  let xPoints = []; // Array que vai ter os pontos guardados ao clicar na tecla X
  // Funçao chamada quando é detetado um movimento do rato
  function onPointerMove( event ) {
    raycaster.setFromCamera( pointer, camera );
    // calcular as coordenadas do ponto onde o rato está para os dois componentes
    // calcular os objectos de interseção
    const intersects = raycaster.intersectObjects( scene.children );
    const x = intersects[0] ? intersects[0].object.position.x : 0;
    const y = intersects[0] ? intersects[0].object.position.y : 0;
    // Condição para apenas alterar as variaveis coordX e coordY quando muda de quadrado
    if(x !== coordX || y !== coordY) {
      coordX = x;
      coordY = y;
    }
    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  }
  // função que é accionada ao clicar numa tecla
  function onKeyPress(event) {
    // se a tecla for X vai selecionar uma casa
    if(event.key === 'x' || event.key === 'X') {
      drawSquare(coordX, coordY, 'red', scene);
      xPoints.push({ x: coordX, y: coordY });
      if(xPoints.length === 2) {
        drawLine(xPoints[0], xPoints[1], "black", scene)
        drawPoints(lineMP(xPoints[0], xPoints[1]));
        xPoints = [];
      }
    } 
    // se a tecla for backspace vai limpar o tabuleiro
    if(event.key === 'Backspace') {
      while(scene.children.length > 0){ 
        scene.remove(scene.children[0]); 
      }
      drawGrid(scene);
      drawAxis(scene);
      scene.add(light);
    }
  }
  //Função render
  var render = function () {
    
    
    requestAnimationFrame(render);

    renderer.render(scene, camera);
  };
  window.addEventListener( 'pointermove', onPointerMove );
  window.addEventListener( 'keydown', onKeyPress );
  render();
}
