import { fetchPosicao } from "../services/posicaoService";

export async function getPosicaoData() {
  // Aqui podemos adicionar qualquer lógica adicional de processamento dos dados
  const posicao = await fetchPosicao();
  return posicao;
}
