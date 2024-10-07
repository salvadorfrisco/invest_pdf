"use client";

import DoughnutChart from "./components/DoughnutChart";
import { useMemo, useState, useEffect } from "react";
import React from "react";
import { getPosicaoData } from "../../useCases/fetchPosicaoUseCase";
import Image from "next/image";

const MemoizedDoughnutChart = React.memo(DoughnutChart);

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

  const formattedCompetencia = useMemo(() => {
    const [year, month] = competencia.split("-");
    const date = new Date(year, month - 1); // Cria uma data com o mês correto

    const formattedMonth = date.toLocaleString("pt-BR", { month: "long" }); // Nome do mês
    return `${formattedMonth.toUpperCase()} / ${year}`;
  }, [competencia]);

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
        height: "1128px",
        flexDirection: "column",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Logotipo */}
      <div
        style={{
          position: "absolute",
          backgroundColor: "#FFF",
          top: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          backgroundColor: "#000",
        }}
      >
        <Image
          src="/logo_invictus.png"
          alt="Logotipo Invictus"
          width={222}
          height={136}
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
          backgroundColor: "#000",
        }}
      >
        <Image
          src="/borda_superior_direito.jpg"
          alt="Desenho moldura superior"
          width={166}
          height={166}
        />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: -20,
          left: -20,
          zIndex: 9999,
          backgroundColor: "#000",
        }}
      >
        <Image
          src="/borda_inferior_esquerda.jpg"
          alt="Desenho moldura inferior"
          width={154}
          height={154}
        />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          zIndex: 9999,
        }}
      >
        <Image
          src="/logo-psr-tech-light-transp.png"
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
            fontSize: "26px",
            fontWeight: "bold",
            color: "#CACACA",
            marginTop: "54px",
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
            fontSize: "20px",
            fontWeight: "bold",
            marginTop: "4px",
          }}
        >
          {formattedCompetencia}
        </div>
        <div
          style={{
            display: "flex",
            height: "340px",
          }}
        >
          <div
            style={{
              width: "360",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                height: "320px",
                marginLeft: "32px",
              }}
            >
              <div
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Image
                  src="/icone_mao_dinheiro.png"
                  alt="Icone Invest"
                  width={100}
                  height={100}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "16px",
                  }}
                >
                  CUSTÓDIA TOTAL
                </span>
                <span
                  style={{
                    fontSize: "20px",
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
              alignContent: "end",
              overflow: "hidden",
              width: `560px`,
              height: `340px`,
            }}
          >
            <MemoizedDoughnutChart posicao={posicaoFiltrada} />
          </div>
        </div>

        <div
          style={{
            width: "100%",
            padding: "0 2rem",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              margin: "0px 70px 10px 20px",
            }}
          >
            <div style={{ marginLeft: "80px" }}>
              <Image src="/logo_xp.png" alt="Logo XP" width={90} height={90} />
            </div>

            <span
              style={{
                fontSize: "24px",
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
              fontSize: "16px",
              marginLeft: "6rem",
            }}
          >
            <div
              style={{
                display: "flex",
                textAlign: "left",
                fontWeight: "bold",
              }}
            >
              <div style={{ flex: 2, padding: "8px" }}>PRODUTO</div>
              <div style={{ flex: 1, padding: "8px" }}>QUANTIDADE</div>
              <div style={{ flex: 1, padding: "8px" }}>VALOR</div>
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
