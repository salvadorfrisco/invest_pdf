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
        height: "3380px",
        flexDirection: "column",
        position: "relative", // Para permitir a posição dos desenhos nos cantos
        zIndex: 1, // Garante que a borda tenha menor prioridade que a imagem
      }}
    >
      {/* Logotipo no centro superior */}
      <div
        style={{
          position: "absolute",
          backgroundColor: "#FFF",
          top: "80px", // Posição no topo da página
          left: "50%", // Centraliza horizontalmente
          transform: "translateX(-50%)", // Move o logotipo para o centro exato
          zIndex: 1000, // Alta prioridade para ficar acima de outros elementos
        }}
      >
        <Image
          src="/logo_invictus.png" // Caminho para o logotipo
          alt="Logotipo Invictus"
          width={580}
          height={400}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: -20,
          width: "79.4%", // A borda superior se estende por 60% da largura
          height: "4px", // A altura da borda superior
          backgroundColor: "white", // Cor da borda superior
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -20,
          left: 0,
          width: "4px", // A largura da borda esquerda
          height: "86%", // A borda esquerda se estende por 80% da altura
          backgroundColor: "white", // Cor da borda esquerda
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -20,
          right: 0,
          width: "4px", // A largura da borda esquerda
          height: "86%", // A borda esquerda se estende por 80% da altura
          backgroundColor: "white", // Cor da borda esquerda
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: -20,
          width: "79.4%", // A borda superior se estende por 60% da largura
          height: "4px", // A altura da borda superior
          backgroundColor: "white", // Cor da borda superior
        }}
      />
      {/* Imagem no canto superior direito */}
      <div
        style={{
          position: "absolute",
          top: -60,
          right: -52,
          zIndex: 9999,
          backgroundColor: "#FFF", // Alta prioridade para sobrepor tudo, inclusive a borda
        }}
      >
        <Image
          src="/borda_superior_direito.png" // Substitua com o caminho do seu png
          alt="Desenho moldura superior"
          width={500}
          height={500}
        />
      </div>

      <div
        style={{
          position: "absolute", // Desenho no canto inferior esquerdo
          bottom: -62,
          left: -60,
          zIndex: 9999,
          backgroundColor: "#FFF", // Alta prioridade para sobrepor tudo, inclusive a borda
        }}
      >
        <Image
          src="/borda_inferior_esquerda.png" // Substitua com o caminho do seu png
          alt="Desenho moldura inferior"
          width={500}
          height={500}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            width: "100%",
            height: "500px",
            alignContent: "end",
            fontSize: "96px",
            fontWeight: "bold",
            color: "#CACACA",
            marginTop: "160px",
            lineHeight: "0.96",
          }}
        >
          PERFORMANCE MENSAL
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "160px",
            alignContent: "center",
            justifyContent: "center",
            color: "#CACAFF",
            fontSize: "48px",
            fontWeight: "bold",
            marginTop: "16px",
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
              width: "900px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                height: "1100px",
                // backgroundColor: "#FFF",
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
                  src="/icone_mao_dinheiro.png"
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
              backgroundColor: "#F00",
            }}
          >
            <MemoizedDoughnutChart posicao={posicao} />
          </div>
        </div>

        <div
          style={{
            width: "100%",
            height: "1820px",
            padding: "4rem",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between", // Centraliza o conteúdo horizontalmente
              alignItems: "baseline",
              margin: "0 50px 20px 50px",
              backgroundColor: "#FF0",
            }}
          >
            {/* Logo à esquerda */}
            <div style={{ marginLeft: "80px" }}>
              {/* Empurra o logo à esquerda */}
              <Image
                src="/logo_xp.png"
                alt="Logo XP"
                width={220}
                height={220}
              />
            </div>

            <span
              style={{
                fontSize: "80px",
                fontWeight: "bold",
                color: "#CACACA",
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
