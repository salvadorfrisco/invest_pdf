import { useMemo, useState, useEffect } from "react";
import Head from "next/head";
import generatePDF, { Margin } from "react-to-pdf";
import { ChartsInvictus } from "../components/charts_invictus";
import { getPosicaoData } from "../useCases/fetchPosicaoUseCase";

export default function Home() {
  const [posicao, setPosicao] = useState([]);
  const [competencia, setCompetencia] = useState("");
  const [clientId, setClientId] = useState("");
  const [isTextareaVisible, setIsTextareaVisible] = useState(true);

  const personalizacaoBase = {
    method: "save",
    resolution: 3, // 0: menor > 10: maior
    page: {
      margin: Margin.NONE,
      format: "A4",
      orientation: "portrait",
    },
    overrides: {
      pdf: { compress: true },
      canvas: { useCORS: true },
    },
  };

  const recuperarConteudoParaPDF = () => document.getElementById("conteudo");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPosicaoData();
        setPosicao(data);
      } catch (error) {
        console.error("Erro ao carregar posicao:", error);
      }
    }
    fetchData();
  }, []);

  // Extrair opções únicas de `competencia`
  const competenciasUnicas = useMemo(() => {
    const competencias = posicao.map((item) => item.competencia);
    return ["", ...new Set(competencias)];
  }, [posicao]);

  // Filtrar os `client_id` com base na `competencia` selecionada
  const clientIdsFiltrados = useMemo(() => {
    if (!competencia) return [];
    const clientIds = posicao
      .filter((item) => item.competencia === competencia)
      .map((item) => item.client_id);
    return ["", ...new Set(clientIds)];
  }, [posicao, competencia]);

  const formattedCompetencia = (competencia) => {
    if (!competencia) return "";

    const [year, month] = competencia.split("-");
    const date = new Date(year, month - 1); // Cria uma data com o mês correto

    const formattedMonth = date.toLocaleString("pt-BR", { month: "long" }); // Nome do mês
    return `${formattedMonth.toUpperCase()}/${year}`;
  };

  // trecho para somente salvar o pdf
  const gerarPDF = () => {
    const nomePDF = `Invictus-${competencia}-${clientId}.pdf`;
    const personalizacao = {
      method: "save",
      resolution: 3,
      page: {
        margin: Margin.NONE,
        format: "A4",
        orientation: "portrait",
      },
      filename: nomePDF,
      overrides: {
        pdf: { compress: true },
        canvas: { useCORS: true },
      },
    };
    generatePDF(recuperarConteudoParaPDF, personalizacao);
  };

  // Função que será passada ao ChartsInvictus para monitorar a visibilidade do textarea
  const handleTextareaVisibilityChange = (isVisible) => {
    setIsTextareaVisible(isVisible);
  };

  return (
    <>
      <Head>
        <title>Gerador de PDF</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          fontSize: "20px",
          width: "100vw",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            padding: "16px",
            gap: "32px",
          }}
        >
          <div>
            <label
              htmlFor="competenciaFilter"
              style={{ fontSize: "18px", marginRight: "8px" }}
            >
              Competência:
            </label>
            <select
              id="competenciaFilter"
              value={competencia}
              onChange={(e) => setCompetencia(e.target.value)}
              style={{
                fontSize: "16px",
                backgroundColor: "#777",
                borderRadius: "8px",
                padding: "2px 8px",
              }}
            >
              {competenciasUnicas.map((competencia) => (
                <option key={competencia} value={competencia}>
                  {formattedCompetencia(competencia)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="clientIdFilter"
              style={{ fontSize: "18px", marginRight: "8px" }}
            >
              Cliente:
            </label>
            <select
              id="clientIdFilter"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              disabled={!competencia || clientIdsFiltrados.length <= 1}
              style={{
                fontSize: "16px",
                backgroundColor: "#777",
                borderRadius: "8px",
                padding: "2px 8px",
              }}
            >
              {clientIdsFiltrados.map((clientId) => (
                <option key={clientId} value={clientId}>
                  {clientId}
                </option>
              ))}
            </select>
          </div>

          <div style={{ paddingLeft: "24px" }}>
            <button
              className={
                isTextareaVisible || !competencia || !clientId
                  ? "btn-pdf-disabled"
                  : "btn-pdf"
              }
              onClick={gerarPDF}
              disabled={isTextareaVisible || !competencia || !clientId} // Desabilita o botão quando o textarea está visível
            >
              PDF
            </button>
          </div>
        </div>

        <div
          id="conteudo"
          style={{
            width: "826px",
            height: "1168px",
            padding: "20px 20px",
            backgroundColor: "#111E25",
          }}
        >
          <ChartsInvictus
            competencia={competencia}
            clientId={clientId}
            onTextareaVisibilityChange={handleTextareaVisibilityChange} // Passa a função de monitoramento
          />
        </div>
      </main>
    </>
  );
}
