// import excuteQuery from "../../lib/db";

// export default async function handler(req, res) {
//   if (req.method === "GET") {
//     try {
//       const query =
//         "SELECT id, Data, Estabelecimento, Portador, Valor, Parcela FROM fatura";
//       const results = await excuteQuery({ query });

//       if (results.error) {
//         console.log(results.error);
//         return res.status(500).json({ error: results.error });
//       }

//       res.status(200).json({ faturas: results });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ error: "Ocorreu um erro ao buscar os dados." });
//     }
//   } else {
//     res.setHeader("Allow", ["GET"]);
//     res.status(405).end(`Método ${req.method} não permitido`);
//   }
// }

import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Fazendo uma chamada GET para a API externa
      const response = await axios.get(
        `${process.env.BASE_URL}/api/api_faturas.php`
      );

      // Se a resposta for bem-sucedida, enviamos os dados de volta
      res.status(200).json({ faturas: response.data });
    } catch (error) {
      // Tratamento de erro, retornando a mensagem de erro
      console.error("Erro ao buscar dados da API externa:", error);
      res.status(500).json({ error: "Erro ao buscar dados da API externa." });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
