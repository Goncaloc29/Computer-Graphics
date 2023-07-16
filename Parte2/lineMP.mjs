export function lineMP(p1, p2) {
  // Cria um array vazio para armazenar os pontos
  let pointsArray = [];
  // Calcular valores de delta
  var dx = Math.abs(p2.x - p1.x);
  var dy = Math.abs(p2.y - p1.y);
  // Inicializar variáveis de decisão
  var sx = p1.x < p2.x ? 1 : -1;
  var sy = p1.y < p2.y ? 1 : -1;
  // 
  var auxiliar = dx - dy;

  while (true) {
    // Adiciona o ponto atual ao array
    pointsArray.push({ x: p1.x, y: p1.y });
    // Verifica se o ponto atual é o ponto final
    if (p1.x === p2.x && p1.y === p2.y) break;
    // Calcula o próximo ponto
    var decisao = 2 * auxiliar;

    if (decisao > -dy) {
      auxiliar -= dy;
      p1.x += sx;
    }
    if (decisao < dx) {
      auxiliar += dx;
      p1.y += sy;
    }
  }
  // Retorna o array de pontos
  return pointsArray;
}
