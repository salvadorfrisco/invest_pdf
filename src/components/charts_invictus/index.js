"use client";

import DoughnutChart from "./components/DoughnutChart";
import { useMemo, useState, useEffect } from "react";
import React from "react";
import { getPosicaoData } from "../../useCases/fetchPosicaoUseCase";
import Image from "next/image";

const MemoizedDoughnutChart = React.memo(DoughnutChart);

export function ChartsInvictus({
  competencia,
  clientId,
  onTextareaVisibilityChange,
}) {
  const [posicao, setPosicao] = useState([]);
  const [textValue, setTextValue] = useState(
    "Diante do cenário econômico, um rendimento de 115% do CDI reflete...."
  );
  const [isTextareaVisible, setIsTextareaVisible] = useState(true);

  const [inputStyle, setInputStyle] = useState({
    width: "400px",
    backgroundColor: "#3A4E45", // Cor inicial do fundo
    border: "1px solid white", // Cor inicial da borda
    color: "white", // Cor do texto
    resize: "none",
    fontSize: "16px",
    showIcon: true,
  });

  const resetInputStyle = () => {
    setInputStyle((prevStyle) => ({
      ...prevStyle,
      backgroundColor: "#3A4E45", // Novo fundo quando em foco
      border: "1px solid white", // Borda alterada quando em foco
      color: "white", // Cor do texto alterada
      fontSize: "16px",
      showIcon: true,
    }));
    setIsTextareaVisible(true);

    if (onTextareaVisibilityChange) {
      onTextareaVisibilityChange(true);
    }
  };

  const toggleInputStyle = () => {
    setIsTextareaVisible(!isTextareaVisible);

    setInputStyle((prevStyle) => ({
      ...prevStyle,
      backgroundColor: "#111E25",
      border: "none",
      fontSize: "16px",
      showIcon: !prevStyle.showIcon,
    }));

    if (onTextareaVisibilityChange) {
      onTextareaVisibilityChange(false);
    }
  };

  const handleTextChange = (e) => {
    setTextValue(e.target.value); // Atualiza o valor do textarea conforme o usuário digita
  };

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

  const handleInput = (e) => {
    const textarea = e.target;
    const maxLines = 3;
    const maxCharsPerLine = 200;
    const lines = textarea.value.split("\n");

    // Limitar número de caracteres por linha
    const truncatedLines = lines.map((line) => {
      return line.length > maxCharsPerLine
        ? line.slice(0, maxCharsPerLine)
        : line;
    });

    // Limitar o número de linhas para no máximo 3
    if (truncatedLines.length > maxLines) {
      truncatedLines.splice(maxLines);
    }

    const finalValue = truncatedLines.join("\n");
    setTextValue(finalValue);
    textarea.value = finalValue; // Atualiza o valor do textarea
  };

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
          backgroundColor: "#111E25",
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
          backgroundColor: "#111E25",
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
          backgroundColor: "#111E25",
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
          bottom: 30,
          left: 200,
          zIndex: 9999,
          backgroundColor: "#111E25",
          display: "flex",
          alignItems: "center",
        }}
      >
        {isTextareaVisible ? (
          <textarea
            id="textInput"
            className="custom-input"
            placeholder="Digite algo"
            onInput={handleInput}
            onFocus={resetInputStyle}
            rows={3}
            style={inputStyle}
            value={textValue} // Vincula o valor do textarea ao estado
            onChange={handleTextChange} // Atualiza o estado ao digitar
          />
        ) : (
          <div
            style={{
              whiteSpace: "pre-wrap", // Mantém as quebras de linha
              color: "white",
              backgroundColor: "#111E25",
              padding: "10px",
              fontSize: "16px",
              border: "none",
              width: "400px",
            }}
            onClick={resetInputStyle}
          >
            {textValue}
          </div>
        )}

        {inputStyle.showIcon && (
          <span
            style={{
              color: "green",
              marginLeft: "10px",
              cursor: "pointer",
              fontSize: "24px",
            }}
            onClick={toggleInputStyle}
          >
            ✔️
          </span>
        )}
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
                  index < 8 && <div className="page-break" /> && (
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
