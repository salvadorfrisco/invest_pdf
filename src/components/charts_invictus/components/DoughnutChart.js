import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  Filler,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import TitleCard from "../../../components/TitleCard";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, Filler, ChartDataLabels);

export default function DoughnutChart({ posicao = [] }) {
  // Verifica se posicao está definido e se é um array
  if (!posicao || posicao.length === 0) {
    return <p>Nenhuma posição disponível para exibir o gráfico.</p>;
  }

  // Agrupa as posicao por "strategy" e soma os valores de closing_value
  const strategies = posicao.reduce((acc, posicao) => {
    const strategy = posicao.strategy;
    const valor = posicao.closing_value;

    if (acc[strategy]) {
      acc[strategy] += valor;
    } else {
      acc[strategy] = valor;
    }

    return acc;
  }, {});

  const labels = Object.keys(strategies);
  const dataValues = Object.values(strategies);

  // Calcula o total para determinar as porcentagens
  const totalValue = dataValues.reduce((acc, value) => acc + value, 0);

  // Cria labels com estratégia e valor percentual
  const percentageLabels = labels.map((label, index) => {
    const percentage = (dataValues[index] / totalValue) * 100;
    return `${percentage.toFixed(1)}%`; // Adiciona a quebra de linha
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "white",
          font: {
            size: 12, // Define o tamanho da fonte das legendas
          },
        },
        fullSize: false,
      },
      datalabels: {
        color: "white",
        font: {
          size: 11,
        },
        formatter: (value, context) => {
          const index = context.dataIndex; // Obtém o índice do item
          const label = percentageLabels[index]; // Pega o label percentual correspondente
          return value > 0 ? label : ""; // Retorna o label formatado
        },
        anchor: "center", // Posiciona o anchor fora do gráfico
        align: "end", // Alinha os labels ao centro
        offset: 0, // Ajuste maior para garantir que o label fique distante do gráfico
        clip: false, // Evita o corte dos labels
      },
    },
    maintainAspectRatio: false, // Permite ajustar a altura e largura livremente
    layout: {
      padding: {
        top: 0, // Aumenta o espaçamento superior para evitar o corte
        bottom: 20, // Aumenta o espaçamento inferior
        left: 10,
        right: 0,
      },
    },
    aspectRatio: 2, // Define uma proporção de aspecto (pode ajustar conforme o necessário)
    cutout: "65%", // Define a espessura do donut (aumente o valor para deixar o donut mais fino)
  };

  const data = {
    labels: labels, // Usa os labels com percentual
    datasets: [
      {
        label: "$",
        data: dataValues,
        backgroundColor: [
          "rgba(188, 172, 25, 0.8)",
          "rgba(195, 192, 192, 0.8)",
          "rgba(74, 92, 195, 0.8)",
          "rgba(95, 186, 5, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(175, 12, 12, 0.8)",
          "rgba(175, 12, 192, 0.8)",
          "rgba(195, 162, 255, 0.8)",
          "rgba(112, 112, 92, 0.8)",
        ],
        borderColor: [
          "rgba(188, 172, 25, 1)",
          "rgba(195, 192, 192, 1)",
          "rgba(74, 92, 195, 1)",
          "rgba(95, 186, 5, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(175, 12, 12, 1)",
          "rgba(175, 12, 192, 1)",
          "rgba(195, 162, 255, 1)",
          "rgba(112, 112, 92, 1)",
          ,
        ],
        borderWidth: 1,
        hoverOffset: 2,
      },
    ],
  };

  return (
    <div
      style={{
        height: "290px", // Aumente a altura para dar mais espaço ao gráfico
        width: "480px",
        position: "relative",
        alignContent: "start", // Certifique-se de que o gráfico se ajuste ao container
      }}
    >
      <Doughnut options={options} data={data} />
    </div>
  );
}
