"use client";

import DoughnutChart from "./components/DoughnutChart";
import { useMemo, useState, useEffect } from "react";
import React from "react";
import { getPosicaoData } from "../../useCases/fetchPosicaoUseCase";
import Image from "next/image"; // Import the Image component

const MemoizedDoughnutChart = React.memo(DoughnutChart);

export function ChartsInvictus() {
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
    return posicao.reduce(
      (total, item) => total + (item.closing_value || 0),
      0
    );
  }, [posicao]);

  const formattedTotalCustodia = `$${totalCustodia.toLocaleString("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

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
        height: "3420px",
        flexDirection: "column",
        border: "8px solid white", // Moldura branca
        position: "relative", // Para permitir a posição dos desenhos nos cantos
      }}
    >
      <div
        style={{
          position: "absolute", // Desenho no canto superior direito
          top: 0,
          right: 0,
          width: "100px",
          height: "100px",
        }}
      >
        <Image
          src="/desenho_superior_direito.svg" // Substitua com o caminho do seu SVG
          alt="Desenho Superior Direito"
          width={100}
          height={100}
        />
      </div>

      <div
        style={{
          position: "absolute", // Desenho no canto inferior esquerdo
          bottom: 0,
          left: 0,
          width: "100px",
          height: "100px",
        }}
      >
        <Image
          src="/desenho_inferior_esquerdo.svg" // Substitua com o caminho do seu SVG
          alt="Desenho Inferior Esquerdo"
          width={100}
          height={100}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            width: "2480px",
            height: "100px",
            alignContent: "center",
            fontSize: "80px",
            fontWeight: "bold",
            marginTop: "160px",
          }}
        >
          PERFORMANCE MENSAL
        </div>
        <div
          style={{
            display: "flex",
            width: "2480px",
            height: "160px",
            alignContent: "center",
            justifyContent: "center",
            fontSize: "60px",
            fontWeight: "bold",
          }}
        >
          AGOSTO 2024
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            style={{
              width: "940px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                height: "1000px",
              }}
            >
              <div
                style={{
                  height: "400px",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Image
                  src="/icone_invest.svg" // Caminho para o SVG
                  alt="Icone Invest"
                  width={240}
                  height={200}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  height: "400px",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "40px",
                  }}
                >
                  CUSTÓDIA TOTAL
                </span>
                <span
                  style={{
                    fontSize: "64px",
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
              width: "1620px",
              height: "1100px",
            }}
          >
            <MemoizedDoughnutChart posicao={posicao} />
          </div>
        </div>

        <div
          style={{
            width: "100%",
            height: "1820px",
            marginTop: "2rem",
            padding: "2rem",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between", // Centraliza o conteúdo horizontalmente
              alignItems: "baseline",
              margin: "0 50px 20px 50px",
            }}
          >
            {/* Logo à esquerda */}
            <div style={{ marginLeft: "80px" }}>
              {/* Empurra o logo à esquerda */}
              <Image
                src="/logo_xp.svg" // Caminho para o SVG
                alt="Logo XP"
                width={220}
                height={220}
              />
            </div>

            <span
              style={{
                fontSize: "80px",
                fontWeight: "bold",
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
              height: "1600px",
              fontSize: "40px",
              margin: "0px 60px 4px 120px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "46px",
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
            {posicao.map((item, index) => (
              <div key={index} style={{ display: "flex", textAlign: "left" }}>
                <div style={{ flex: 2, padding: "8px" }}>{item.asset}</div>
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
                <div style={{ flex: 1, padding: "8px" }}>{item.strategy}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
