"use client";

import DoughnutChart from "./components/DoughnutChart";
import { useMemo, useState, useEffect } from "react";
import React from "react";
import { getPosicaoData } from "../../useCases/fetchPosicaoUseCase";
import Image from "next/image"; // Import the Image component

const MemoizedDoughnutChart = React.memo(DoughnutChart);

const factor = 3;
const widthPage = 2480 / factor;
const heightPage = 3506 / factor;
const fontSizeXl = 80 / factor;
const fontSizeLg = 60 / factor;
const fontSizeMd = 40 / factor;
const fontSizeSm = 30 / factor;
const fontSizeXs = 20 / factor;
const rem = 8 / factor;
const borderWidth = 1;
const borderHeight = rem / 4 / factor;

export function ChartsInvictus({ competencia, clientId }) {
  const [posicao, setPosicao] = useState([]);

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

  // console.log(posicao);
  // console.log(competencia);
  // console.log(clientId);

  const totalCustodia = useMemo(() => {
    return posicao
      .filter(
        (item) =>
          (competencia === "todas" || item.competencia === competencia) &&
          (clientId === "todos" || item.client_id === clientId)
      )
      .reduce((total, item) => total + (item.closing_value || 0), 0);
  }, [clientId, competencia, posicao]);

  const formattedTotalCustodia = `$${totalCustodia.toLocaleString("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  const posicaoFiltrada = useMemo(() => {
    return posicao.filter(
      (item) =>
        (competencia === "todas" || item.competencia === competencia) &&
        (clientId === "todos" || item.client_id === clientId)
    );
  }, [clientId, competencia, posicao]);

  const posicaoAgrupada = useMemo(() => {
    return posicao.reduce((acc, item) => {
      const strategy = item.strategy;

      if (!acc[strategy]) {
        acc[strategy] = {
          produto: item.produto,
          asset: item.asset,
          closing_quantity: 0,
          closing_value: 0,
          competencia: item.competencia,
          strategy: item.strategy,
        };
      }

      acc[strategy].closing_quantity += item.closing_quantity || 0;
      acc[strategy].closing_value += item.closing_value || 0;

      return acc;
    }, {});
  }, [posicao]);

  const posicaoAgrupadaArray = Object.values(posicaoAgrupada);

  return (
    <div
      style={{
        display: "flex",
        height: `${heightPage - 16 * rem}px`, // "3380px",
        flexDirection: "column",
        position: "relative", // Para permitir a posição dos desenhos nos cantos
        zIndex: 1, // Garante que a borda tenha menor prioridade que a imagem
      }}
    >
      {/* Logotipo */}
      <div
        style={{
          position: "absolute",
          backgroundColor: "#FFF",
          top: "24px",
          left: "50%", // Centraliza horizontalmente
          transform: "translateX(-50%)", // Move o logotipo para o centro exato
          zIndex: 1000, // Alta prioridade para ficar acima de outros elementos
        }}
      >
        <Image
          src="/logo_invictus.png"
          alt="Logotipo Invictus"
          width={72 * rem}
          height={50 * rem}
        />
      </div>
      <div // Borda superior
        style={{
          position: "absolute",
          top: 0,
          left: -10,
          width: "80%",
          height: "1px",
          backgroundColor: "white",
        }}
      />
      <div // Borda esquerda
        style={{
          position: "absolute",
          top: -10,
          left: 0,
          width: "1px",
          height: "87%",
          backgroundColor: "white",
        }}
      />
      <div // Borda direita
        style={{
          position: "absolute",
          bottom: -10,
          right: 0,
          width: "1px",
          height: "86%",
          backgroundColor: "white",
        }}
      />
      <div // Borda inferior
        style={{
          position: "absolute",
          bottom: 0,
          right: -10,
          width: "81%",
          height: "1px",
          backgroundColor: "white",
        }}
      />
      {/* Imagem no canto superior direito */}
      <div
        style={{
          position: "absolute",
          top: -20,
          right: -20,
          zIndex: 9999,
          backgroundColor: "#FFF", // Alta prioridade para sobrepor tudo, inclusive a borda
        }}
      >
        <Image
          src="/borda_superior_direito.png"
          alt="Desenho moldura superior"
          width={166}
          height={168}
        />
      </div>

      <div
        style={{
          position: "absolute", // Desenho no canto inferior esquerdo
          bottom: -20,
          left: -20,
          zIndex: 9999,
          backgroundColor: "#FFF", // Alta prioridade para sobrepor tudo, inclusive a borda
        }}
      >
        <Image
          src="/borda_inferior_esquerda.png"
          alt="Desenho moldura inferior"
          width={154}
          height={154}
        />
      </div>

      <div
        style={{
          position: "absolute", // Desenho no canto inferior direito
          bottom: 20,
          right: 20,
          zIndex: 9999, // Alta prioridade para sobrepor tudo, inclusive a borda
        }}
      >
        <Image
          src="/logo-psr-tech-light-transp.png" // Substitua com o caminho do seu png
          alt="Logo PSR"
          width={120}
          height={31}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            width: "100%",
            height: "160px",
            alignContent: "end",
            fontSize: fontSizeXl,
            fontWeight: "bold",
            color: "#CACACA",
            marginTop: `${20 * rem}px`,
            lineHeight: "0.96",
          }}
        >
          PERFORMANCE MENSAL
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            alignContent: "center",
            justifyContent: "center",
            color: "#CACAFF",
            fontSize: fontSizeLg,
            fontWeight: "bold",
            marginTop: "4px",
          }}
        >
          AGOSTO 2024
        </div>
        <div
          style={{
            display: "flex",
            height: "360px",
          }}
        >
          <div
            style={{
              width: "280px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                height: "320px",
                // backgroundColor: "#FFF",
                marginLeft: "30px",
              }}
            >
              <div
                style={{
                  // height: "220px",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Image
                  src="/icone_mao_dinheiro.png"
                  alt="Icone Invest"
                  width={30 * rem}
                  height={25 * rem}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  // height: `${50 * rem}px`,
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: fontSizeMd,
                  }}
                >
                  CUSTÓDIA TOTAL
                </span>
                <span
                  style={{
                    fontSize: fontSizeLg,
                    fontWeight: "bold",
                  }}
                >
                  {formattedTotalCustodia}
                </span>
              </div>
            </div>
          </div>
          <div
            style={{
              alignContent: "center",
              overflow: "hidden",
              width: `560px`,
              height: `400px`,
            }}
          >
            <MemoizedDoughnutChart posicao={posicaoFiltrada} />
          </div>
        </div>

        <div
          style={{
            width: "100%",
            height: `${heightPage / 2}px`,
            padding: "0 2rem",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between", // Centraliza o conteúdo horizontalmente
              alignItems: "baseline",
              margin: "0px 50px 10px 20px",
            }}
          >
            {/* Logo à esquerda */}
            <div style={{ marginLeft: "80px" }}>
              {/* Empurra o logo à esquerda */}
              <Image src="/logo_xp.png" alt="Logo XP" width={90} height={90} />
            </div>

            <span
              style={{
                fontSize: fontSizeLg,
                fontWeight: "bold",
                color: "#BABABA",
              }}
            >
              DEMONSTRATIVO
            </span>
            <span></span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Poppins, sans-serif",
              // height: `${heightPage / 2}px`,
              fontSize: fontSizeMd,
              marginLeft: "6rem",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: fontSizeMd,
                textAlign: "left",
                fontWeight: "bold",
              }}
            >
              <div style={{ flex: 2, padding: "8px" }}>PRODUTO</div>
              <div style={{ flex: 1, padding: "8px" }}>QUANTIDADE</div>
              <div style={{ flex: 1, padding: "8px" }}>VALOR</div>
              {/* <div style={{ flex: 1, padding: "8px" }}>COMPETÊNCIA</div> */}
              <div style={{ flex: 1, padding: "8px" }}>ATIVO</div>
            </div>
            {posicao
              .filter(
                (item) =>
                  (competencia === "todas" ||
                    item.competencia === competencia) &&
                  (clientId === "todos" || item.client_id === clientId)
              )
              .map((item, index) => {
                return (
                  index < 11 && <div className="page-break" /> && (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        textAlign: "left",
                        lineHeight: "0.8",
                      }}
                    >
                      <div style={{ flex: 2, padding: "8px" }}>
                        {item.asset}
                      </div>
                      <div style={{ flex: 1, padding: "8px" }}>
                        {item.closing_quantity.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                      <div style={{ flex: 1, padding: "8px" }}>
                        {item.closing_value.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </div>
                      {/* <div style={{ flex: 1, padding: "8px" }}>{item.competencia}</div> */}
                      <div style={{ flex: 1, padding: "8px" }}>
                        {item.strategy}
                      </div>
                    </div>
                  )
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
