import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  Filler,
  ArcElement,
  // Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import TitleCard from "../../../components/TitleCard";
// import Subtitle from "../../../components/Typography/Subtitle";

ChartJS.register(ArcElement, Tooltip, Legend, Tooltip, Filler, Legend);

export default function PieChartEarnings() {
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

  const labels = ["Rendimentos", "Dividendos", "Cupom", "Amortização"];

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
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(53, 162, 235, 0.8)",
          "rgba(235, 162, 235, 0.8)",
          "rgba(132, 215, 135, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(53, 162, 235, 1)",
          "rgba(235, 162, 235, 1)",
          "rgba(132, 215, 135, 1)",
        ],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <TitleCard
      title={"Proventos por categoria"}
      className="bg-slate-600 text-white"
    >
      <div style={{ height: "360px" }}>
        <Pie options={options} data={data} />
      </div>
    </TitleCard>
  );
}
