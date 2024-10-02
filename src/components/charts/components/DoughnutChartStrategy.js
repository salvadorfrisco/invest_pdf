import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  Filler,
  ArcElement,
  // Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import TitleCard from "../../../components/TitleCard";
// import Subtitle from "../../../components/Typography/Subtitle";

ChartJS.register(ArcElement, Tooltip, Legend, Tooltip, Filler, Legend);

export default function DoughnutChartStrategy() {
  const [legendPosition, setLegendPosition] = useState("right");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setLegendPosition("bottom");
      } else {
        setLegendPosition("right");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Chama no carregamento inicial

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: legendPosition,
        labels: {
          color: "white",
        },
      },
      datalabels: {
        color: "white",
        font: {
          size: 14,
        },
        formatter: (value) => {
          return value.toFixed(2); // Exibir os valores com 2 casas decimais
        },
      },
    },
    maintainAspectRatio: false,
  };

  const labels = [
    "Pós fixado",
    "Pré fixado",
    "Inflação",
    "Fundos de Investimento",
    "Multimercados",
    "Renda Variável Brasil",
    "Internacional",
    "Renda Variável Global",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "(mi R$)",
        data: [
          Math.random() * 12,
          Math.random() * 12,
          Math.random() * 12,
          Math.random() * 12,
          Math.random() * 12,
          Math.random() * 12,
          Math.random() * 12,
          Math.random() * 12,
        ],
        backgroundColor: [
          "rgba(54, 162, 255, 0.8)",
          "rgba(255, 206, 155, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 99, 255, 0.8)",
          "rgba(154, 262, 255, 0.8)",
          "rgba(255, 106, 155, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(255, 199, 255, 0.8)",
        ],
        borderColor: [
          "rgba(54, 162, 255, 1)",
          "rgba(255, 206, 155, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 99, 255, 1)",
          "rgba(154, 262, 255, 1)",
          "rgba(255, 106, 155, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 199, 255, 1)",
        ],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <TitleCard
      title={"Alocação por estratégia"}
      className="bg-slate-600 text-white"
    >
      <div style={{ height: "360px" }}>
        <Doughnut options={options} data={data} />
      </div>
    </TitleCard>
  );
}
