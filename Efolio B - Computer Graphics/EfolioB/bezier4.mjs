import * as THREE from "https://unpkg.com/three@0.124.0/build/three.module.js";

/**
 * 
 * @param {*} obj  -> {c0:Vector3, c1: Vector3, c2:Vector3, c3:Vector3, c4:Vector3, t:float}
 */
function bezier4(obj) {
  //vetor para armazenar o resultado
  const {c0, c1, c2, c3, c4, t} = obj;
  
  const xFinal = (Math.pow((1 - t), 4) * c0.x) + (4 * Math.pow((1 - t), 3) * t * c1.x) + (6 * Math.pow((1 - t), 2) * Math.pow(t, 2) * c2.x) + (4 * (1 - t) * Math.pow(t, 3) * c3.x) + (Math.pow(t, 4) * c4.x);
  const yFinal = (Math.pow((1 - t), 4) * c0.y) + (4 * Math.pow((1 - t), 3) * t * c1.y) + (6 * Math.pow((1 - t), 2) * Math.pow(t, 2) * c2.y) + (4 * (1 - t) * Math.pow(t, 3) * c3.y) + (Math.pow(t, 4) * c4.y);
  const zFinal = (Math.pow((1 - t), 4) * c0.z) + (4 * Math.pow((1 - t), 3) * t * c1.z) + (6 * Math.pow((1 - t), 2) * Math.pow(t, 2) * c2.z) + (4 * (1 - t) * Math.pow(t, 3) * c3.z) + (Math.pow(t, 4) * c4.z);
  const result = new THREE.Vector3(xFinal, yFinal, zFinal);
  return result;
}

export {bezier4};
