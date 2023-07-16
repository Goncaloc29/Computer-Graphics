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
  var material = new THREE.MeshLambertMaterial({ color, transparent:true, opacity: 0.8 });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = x+0.5;
  mesh.position.y = y+0.5;
  mesh.name = 'square';
  scene.add(mesh);
}
/**
 * Função que desenha uma esfera no ponto dado com a cor escolhida
 * @param {*} x 
 * @param {*} y 
 * @param {*} color 
 * @param {*} scene 
*/
function drawSphere(x, y, z, color, scene, name) {
  var geometry = new THREE.SphereGeometry(0.5, 32, 16);
  var material = new THREE.MeshLambertMaterial({
    color,
    opacity: 0.8,
    transparent: true,
  });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = x;
  mesh.position.y = y;
  mesh.position.z = z;
  mesh.name = name;
  scene.add(mesh);
}

/**
 * Função que desenha a grelha do quadriculado
 * @param {*} scene 
*/
function drawGrid(scene) {
  const color1 = "#a90099",
    color2 = "##ffffff";
  for (let y = -10; y <10; y += 1) {
    for (let x = -10; x < 10; x += 1) {
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
function drawLine(p1, p2, color, scene, name) {
  const linhaAntiga = scene.children.find(x => x.name === `linha-${name}`)
  scene.remove(linhaAntiga);
  const material = new THREE.LineBasicMaterial({ color });
  const points = [];
  points.push(new THREE.Vector3(p1.x, p1.y,p1.z));
  points.push(new THREE.Vector3(p2.x, p2.y, p2.z));

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(geometry, material);
  line.name=`linha-${name}`;
  scene.add(line);
}

export {
  drawSquare,
  drawSphere,
  drawGrid,
  drawLine,
}