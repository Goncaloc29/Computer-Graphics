import * as THREE from "https://unpkg.com/three@0.124.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.124.0/examples/jsm/controls/OrbitControls.js";
import { bezier4 } from "../bezier4.mjs";
import { drawSquare, drawSphere, drawGrid, drawLine } from "./drawFunctions.mjs";

export function displayPoints() {
  // renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor("#060606");
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  var scene = new THREE.Scene();

  // camara
  var camera = new THREE.PerspectiveCamera(
    32,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.z = 20;
  camera.lookAt(0, 0, 0);

  // controls
  const controls = new OrbitControls(camera, renderer.domElement);
  camera.position.set(0, -25, 12);
  controls.update();

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
  });

  function initialize (){
    // Chamada da função que desenha o tabuleiro
    drawGrid(scene);

    // desenhar os eixos 
    const axesHelper = new THREE.AxesHelper( 15 );
    scene.add( axesHelper );
   
    // desenhar as esferas incialmente numa posição aleatoria
    // a funçao draw sphere recebe a posição da esfera (x,y,z), a cor, cena e o nome para atribuir a esfera
      drawSphere( Math.floor(Math.random() * 20) - 10,  Math.floor(Math.random() * 20) - 10, 0, "yellow", scene, "c0");
      drawSphere( Math.floor(Math.random() * 20) - 10,  Math.floor(Math.random() * 20) - 10, 0, "orange", scene, "c1");
      drawSphere( Math.floor(Math.random() * 20) - 10,  Math.floor(Math.random() * 20) - 10, 0, "red", scene, "c2");
      drawSphere( Math.floor(Math.random() * 20) - 10,  Math.floor(Math.random() * 20) - 10, 0, "green", scene, "c3");
      drawSphere( Math.floor(Math.random() * 20) - 10,  Math.floor(Math.random() * 20) - 10, 0, "blue", scene, "c4");
  }

  initialize();

  // light point
  var light = new THREE.PointLight(0xffffff, 1, 500);
  light.position.set(0, 0, 8);
  scene.add(light);

  /**
   * raycaster
   * usado para monitorizar a posição correta do ponteiro do rato em relação ao tabuleiro
   */
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let coordX, coordY; // variaveis para guardar o ponto em que estamos atualmente com o rato
  
  // Funçao chamada quando é detetado um movimento do rato
  // guarda na variavel pointer a posição atual do rato
  function onPointerMove( event ) {
    raycaster.setFromCamera( pointer, camera );
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
  //função que ao receber o nome de uma bola retorna as coordenadas no formato correto para apresentar no ecra
  function getCoordinates (name) {
    const bola = scene.children.find(x => x.name === name);
    const x = Math.round(bola.position.x * 100) / 100;
    const y = Math.round(bola.position.y * 100) / 100;
    const z = Math.round(bola.position.z * 100) / 100;
    return `(x: ${x}; y: ${y}; z: ${z})`
  }

  // função que é accionada ao clicar numa tecla
  let bolaSelecionada;
  function onKeyPress(event) {
    const valor = document.getElementById("bolaSelecionada");
    const coordenadas = document.getElementById("coordenadas");
    // se a tecla for X vai selecionar uma casa
    const c0 = scene.children.find(x => x.name === 'c0');
    const c1 = scene.children.find(x => x.name === 'c1');
    const c2 = scene.children.find(x => x.name === 'c2');
    const c3 = scene.children.find(x => x.name === 'c3');
    const c4 = scene.children.find(x => x.name === 'c4');
    if(event.key==='1' || event.key==='2' || event.key==='3' || event.key==='4' || event.key==='5'){
      c0.material.opacity = 0.5;
      c1.material.opacity = 0.5;
      c2.material.opacity = 0.5;
      c3.material.opacity = 0.5;
      c4.material.opacity = 0.5;
      switch (event.key) {
        case '1':
          c0.material.opacity = 1;
          bolaSelecionada = 'c0';
          valor.innerHTML = "C0";
          coordenadas.innerHTML = getCoordinates('c0');
          break;
        case '2':
          c1.material.opacity = 1;
          bolaSelecionada = 'c1';
          valor.innerHTML = "C1";
          coordenadas.innerHTML = getCoordinates('c1');
          break;
        case '3':
          c2.material.opacity = 1;
          bolaSelecionada = 'c2';
          valor.innerHTML = "C2";
          coordenadas.innerHTML = getCoordinates('c2');
          break;  
        case '4':
          c3.material.opacity = 1;
          bolaSelecionada = 'c3';
          valor.innerHTML = "C3";
          coordenadas.innerHTML = getCoordinates('c3');
          break;
        case '5':
          c4.material.opacity = 1;
          bolaSelecionada = 'c4';
          valor.innerHTML = "C4";
          coordenadas.innerHTML = getCoordinates('c4');
          break;
        default:
          break;
      }
    }
    if(event.code==="Space"){
      // intercetar o tabuleiro com a posicao do rato para ignorar a perpetiva da camara
      raycaster.setFromCamera( pointer, camera ); 
      const intersects = raycaster.intersectObjects( scene.children );
      const mousePoint = intersects.filter(x => x.object.name=="square")[0].point;
      //mudar a bola de posiçao
      scene.children.find(x => x.name === bolaSelecionada).position.x = mousePoint.x;
      scene.children.find(x => x.name === bolaSelecionada).position.y = mousePoint.y;

      // encontrar a posição da bola selecionada 
      const ballPosition = scene.children.find(x => x.name === bolaSelecionada).position;
      drawLine({x: ballPosition.x, y: ballPosition.y, z: 0}, ballPosition, "red", scene, bolaSelecionada);
      // Colocar as novas coordenadas no ecra
      coordenadas.innerHTML = getCoordinates(bolaSelecionada);
    }
    //condiçao que vai subir a bola verticalmente
    if(event.key === 'w' || event.key === 'W'){
      //encontrar a bola selecionada de entre todos os elementos na scene e aumentar o seu z
      scene.children.find(x => x.name === bolaSelecionada).position.z += 0.1;
      const ballPosition = scene.children.find(x => x.name === bolaSelecionada).position;
      drawLine({x: ballPosition.x, y: ballPosition.y, z: 0}, ballPosition, "red", scene, bolaSelecionada);
      coordenadas.innerHTML = getCoordinates(bolaSelecionada);
    }
    //condiçao que vai baixar a bola verticalmente
    if(event.key === 's' || event.key === 'S'){
      scene.children.find(x => x.name === bolaSelecionada).position.z -= 0.1;
      const ballPosition = scene.children.find(x => x.name === bolaSelecionada).position;
      drawLine({x: ballPosition.x, y: ballPosition.y, z: 0}, ballPosition, "red", scene, bolaSelecionada);
      coordenadas.innerHTML = getCoordinates(bolaSelecionada);
    }
    if(event.key === 'x' || event.key === 'X') {
      const p0 = {x: c0.position.x, y: c0.position.y, z: c0.position.z};
      const p1 = {x: c1.position.x, y: c1.position.y, z: c1.position.z};
      const p2 = {x: c2.position.x, y: c2.position.y, z: c2.position.z};
      const p3 = {x: c3.position.x, y: c3.position.y, z: c3.position.z};
      const p4 = {x: c4.position.x, y: c4.position.y, z: c4.position.z};
      const t = 1;
      const obj = {
        c0: p0, 
        c1: p1,
        c2: p2, 
        c3: p3, 
        c4: p4,
        t
      };
      //criar a curva para depois usar no tube geometry
      const curve = new THREE.QuadraticBezierCurve3(
        bezier4({c0:p0, c1:p1, c2:p2, c3:p3, c4:p4, t:0}),
        bezier4({c0:p0, c1:p1, c2:p2, c3:p3, c4:p4, t:0.5}),
        bezier4({c0:p0, c1:p1, c2:p2, c3:p3, c4:p4, t:1}),
      );
      // criar o tube geometry
      const path = curve;
      const geometry = new THREE.TubeGeometry( path, 64, 0.35, 20, false );
      const material = new THREE.MeshBasicMaterial({
        color: "#18ff00",
        wireframe: true
      });
      const mesh = new THREE.Mesh( geometry, material );
      scene.add( mesh );
    } 
    // se a tecla for backspace vai limpar o tabuleiro
    if(event.key === 'Backspace') {
      while(scene.children.length > 0){ 
        scene.remove(scene.children[0]); 
      }
      initialize();
      scene.add(light);
      // inicializar tags de informação
      document.getElementById("bolaSelecionada").innerHTML = "";
      document.getElementById("coordenadas").innerHTML = "";
    }
  }
  //render function
  var render = function () {
    
    requestAnimationFrame(render);

    renderer.render(scene, camera);
  };
  window.addEventListener( 'pointermove', onPointerMove );
  window.addEventListener( 'keydown', onKeyPress );
  render();
}
