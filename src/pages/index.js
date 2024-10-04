import Head from "next/head";
import generatePDF, { Margin } from "react-to-pdf";
import { ChartsInvictus } from "../components/charts_invictus";

const personalizacao = {
  // Baixar/Salvar = save / Abrir no navegador = open
  method: "open",
  page: {
    // Definir a margem: NONE, SMALL, MEDIUM, etc...
    margin: Margin.NONE,
    // Formato da página: A4 ou letter
    format: "A4",
    // Orientação do arquivo: portrait ou landscape
    orientation: "portrait",
  },
};

const recuperarConteudoParaPDF = () => document.getElementById("conteudo");

export default function Home() {
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
          textAlign: "center",
          backgroundColor: "#223345",
          fontSize: "27px",
        }}
      >
        <button
          onClick={() => generatePDF(recuperarConteudoParaPDF, personalizacao)}
        >
          Gerar PDF
        </button>

        <div id="conteudo">
          {/* <h1 style={{ textAlign: "center", color: "#f00", fontSize: "27px;" }}>
            Conteúdo do PDF 2
          </h1> */}

          {/* <div> */}
          <ChartsInvictus />
          {/* </div> */}
        </div>
      </main>
    </>
  );
}
