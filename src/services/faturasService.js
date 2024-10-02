import axios from "axios";

export async function fetchFaturas() {
  try {
    const response = await axios.get("/api/faturas");
    return response.data.faturas;
  } catch (error) {
    console.error("Erro ao buscar faturas:", error);
    throw new Error("Erro ao buscar faturas");
  }
}
