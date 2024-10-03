import axios from "axios";

export async function fetchPosicao() {
  try {
    const response = await axios.get("/api/posicao");
    return response.data.posicao;
  } catch (error) {
    console.error("Erro ao buscar posicao:", error);
    throw new Error("Erro ao buscar posicao");
  }
}
