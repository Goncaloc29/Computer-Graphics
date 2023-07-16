import * as THREE from "https://unpkg.com/three@0.124.0/build/three.module.js";
/**
 * Função que desenha um quadrado no ponto dado com a cor escolhida
 * @param {*} x 
 * @param {*} y 
 * @param {*} color 
 * @param {*} scene 
*/
function drawSquare(x, y, color, scene) {
  var geometry = new THREE.PlaneGeometry(1, 1);
  var material = new THREE.MeshLambertMaterial({ color });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = x;
  mesh.position.y = y;
  scene.add(mesh);
}
/**
 * Função que desenha uma caixa no ponto dado com a cor escolhida
 * @param {*} x 
 * @param {*} y 
 * @param {*} color 
 * @param {*} scene 
*/
function drawBox(x, y, color, scene) {
  var geometry = new THREE.BoxGeometry(1, 1, 0.25);
  var material = new THREE.MeshLambertMaterial({
    color,
    opacity: 0.5,
    transparent: true,
  });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = x;
  mesh.position.y = y;
  mesh.position.z = 0.125;
  scene.add(mesh);
}

/**
 * Função que desenha a grelha do quadriculado
 * @param {*} scene 
*/
function drawGrid(scene) {
  const color1 = "lightcoral",
    color2 = "lightsteelblue";
  for (let y = -10; y <= 10; y += 1) {
    for (let x = -10; x <= 10; x += 1) {
      if (y % 2 === 0) {
        if (x % 2 === 0) {
          drawSquare(x, y, color2, scene);
        } else {
          drawSquare(x, y, color1, scene);
        }
      } else {
        if (x % 2 === 0) {
          drawSquare(x, y, color1, scene);
        } else {
          drawSquare(x, y, color2, scene);
        }
      }
    }
  }
}

/**
 * Função que desenha uma linha entre dois pontos com a cor escolhida
 * @param {*} p1
 * @param {*} p2
 * @param {*} color 
 * @param {*} scene 
*/
function drawLine(p1, p2, color, scene) {
  const material = new THREE.LineBasicMaterial({ color });
  const points = [];
  points.push(new THREE.Vector3(p1.x, p1.y, 0));
  points.push(new THREE.Vector3(p2.x, p2.y, 0));

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(geometry, material);
  scene.add(line);
}
/**
 * Função que desenha os eixos do x e y
 * @param {*} scene 
*/
function drawAxis(scene){
  const p0 = { x: 0, y: 0 },
  p1 = { x: 0, y: 20 },
  p2 = { x: 20, y: 0 };
  drawLine(p0, p1, "blue", scene);
  drawLine(p0, p2, "red", scene);
}
export {
  drawSquare,
  drawBox,
  drawGrid,
  drawLine,
  drawAxis,
}