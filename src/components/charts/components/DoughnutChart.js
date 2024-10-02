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

export default function DoughnutChart({ faturas = [] }) {
  // Garante que faturas seja um array
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

  // Verifica se faturas está definido e se é um array
  if (!faturas || faturas.length === 0) {
    return <p>Nenhuma fatura disponível para exibir o gráfico.</p>;
  }

  // Agrupa as faturas por "Parcela" e soma os valores
  const parcelas = faturas.reduce((acc, fatura) => {
    const parcela = fatura.Parcela;
    const valor = parseFloat(fatura.Valor.replace("R$", "").replace(",", "."));

    if (acc[parcela]) {
      acc[parcela] += valor;
    } else {
      acc[parcela] = valor;
    }

    return acc;
  }, {});

  const labels = Object.keys(parcelas);
  const dataValues = Object.values(parcelas);

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
        formatter: (value) => value.toFixed(2),
      },
    },
    maintainAspectRatio: false,
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Total por Parcela (R$)",
        data: dataValues,
        backgroundColor: [
          "rgba(54, 162, 235, 0.8)",
          "rgba(225, 86, 96, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 206, 155, 0.8)",
          "rgba(75, 192, 192, 0.8)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(225, 86, 96, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 206, 155, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <TitleCard
      title={"Alocação por Parcela"}
      className="bg-slate-600 text-white"
    >
      <div
        style={{
          height: "340px",
        }}
        className="bg-slate-600"
      >
        <Doughnut options={options} data={data} />
      </div>
    </TitleCard>
  );
}
