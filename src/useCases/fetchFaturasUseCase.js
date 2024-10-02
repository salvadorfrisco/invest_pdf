import { fetchFaturas } from "../services/faturasService";

export async function getFaturasData() {
  // Aqui podemos adicionar qualquer lógica adicional de processamento dos dados
  const faturas = await fetchFaturas();
  return faturas;
}
