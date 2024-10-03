import excuteQuery from "../../lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const query =
        "SELECT id, produto, competencia, asset, client_id, effective_date, closing_quantity, closing_value, strategy FROM posicao_cliente";
      const results = await excuteQuery({ query });

      if (results.error) {
        console.log(results.error);
        return res.status(500).json({ error: results.error });
      }

      res.status(200).json({ posicao: results });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Ocorreu um erro ao buscar os dados." });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
