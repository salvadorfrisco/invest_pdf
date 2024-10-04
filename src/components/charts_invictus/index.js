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
  })}`; // Remove space between dollar sign and number

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

  console.log(posicao);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          width: "100%",
          marginTop: "2rem",
          backgroundColor: "#154399",
          padding: "2rem",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            fontSize: "40px",
            fontWeight: "bold",
          }}
        >
          PERFORMANCE MENSAL
        </span>
        <br />
        <span
          style={{
            backgroundColor: "#154399",
            color: "#fff",
            border: "2px solid #fff",
            borderRadius: "32px",
            padding: "0.5rem 1rem",
            display: "inline-block",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          &nbsp;&nbsp;AGOSTO 2024&nbsp;&nbsp;
        </span>
      </div>
      <div
        style={{
          display: "flex",
          backgroundColor: "#FF0000",
          color: "#F7F7F7",
          fontFamily: "Poppins, sans-serif",
          height: "100vh",
        }}
      >
        <div
          style={{
            alignContent: "center",
            width: "40%",
            backgroundColor: "#159399",
            padding: "2rem",
            overflow: "hidden",
          }}
        >
          {/* Contêiner flex para alinhar o SVG e o texto em linha */}
          <div
            style={{
              display: "flex",
              flexDirection: "row", // Coloca o SVG e o texto em linha
              alignItems: "center", // Centraliza verticalmente
              gap: "10px", // Espaçamento entre o SVG e o texto
            }}
          >
            <Image
              src="/icone_invest.svg" // Caminho para o SVG
              alt="Icone Invest"
              width={120}
              height={120}
            />
            {/* Contêiner em coluna para o texto "CUSTÓDIA TOTAL" e o valor */}
            <div
              style={{
                display: "flex",
                flexDirection: "column", // Coloca o texto e o valor em coluna
                justifyContent: "center", // Centraliza verticalmente
              }}
            >
              <span
                style={{
                  fontSize: "24px",
                }}
              >
                CUSTÓDIA TOTAL
              </span>
              <span
                style={{
                  fontSize: "32px",
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
            width: "60%",
            backgroundColor: "#000",
            alignContent: "center",
            padding: "2rem",
            overflow: "hidden",
          }}
        >
          <MemoizedDoughnutChart posicao={posicao} />
        </div>
      </div>

      <div
        style={{
          width: "100%",
          marginTop: "2rem",
          backgroundColor: "#000",
          padding: "2rem",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center", // Centraliza o conteúdo horizontalmente
            alignItems: "baseline", // Alinha pelo baseline
            marginBottom: "2rem", // Margem inferior para separação
          }}
        >
          {/* Logo à esquerda */}
          <div style={{ marginRight: "auto" }}>
            {" "}
            {/* Empurra o logo à esquerda */}
            <Image
              src="/logo_xp.svg" // Caminho para o SVG
              alt="Logo XP"
              width={120}
              height={120}
            />
          </div>

          {/* Texto centralizado */}
          <span
            style={{
              fontSize: "40px",
              fontWeight: "bold",
              marginLeft: "auto", // Empurra o texto ao centro
            }}
          >
            DEMONSTRATIVO
          </span>
        </div>
        <br />
        <div
          style={{
            backgroundColor: "#154399",
            color: "#fff",
            border: "2px solid #fff",
            borderRadius: "32px",
            padding: "0.5rem 1rem",
            display: "inline-block",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #fff", padding: "8px" }}>
                  Produto
                </th>
                <th style={{ border: "1px solid #fff", padding: "8px" }}>
                  Asset
                </th>
                <th style={{ border: "1px solid #fff", padding: "8px" }}>
                  Quantidade
                </th>
                <th style={{ border: "1px solid #fff", padding: "8px" }}>
                  Valor
                </th>
                <th style={{ border: "1px solid #fff", padding: "8px" }}>
                  Competência
                </th>
                <th style={{ border: "1px solid #fff", padding: "8px" }}>
                  Estratégia
                </th>
              </tr>
            </thead>
            <tbody>
              {posicaoAgrupadaArray.map((item, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid #fff", padding: "8px" }}>
                    {item.produto}
                  </td>
                  <td style={{ border: "1px solid #fff", padding: "8px" }}>
                    {item.asset}
                  </td>
                  <td style={{ border: "1px solid #fff", padding: "8px" }}>
                    {item.closing_quantity}
                  </td>
                  <td style={{ border: "1px solid #fff", padding: "8px" }}>
                    {item.closing_value}
                  </td>
                  <td style={{ border: "1px solid #fff", padding: "8px" }}>
                    {item.competencia}
                  </td>
                  <td style={{ border: "1px solid #fff", padding: "8px" }}>
                    {item.strategy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
