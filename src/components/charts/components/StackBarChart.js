import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import TitleCard from "../../../components/TitleCard";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export default function StackBarChart({ dateValue }) {
  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: "white", // Define a cor dos rótulos do eixo X como branco
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Define a cor da grade do eixo X
        },
      },
      y: {
        stacked: true,
        ticks: {
          color: "white", // Define a cor dos rótulos do eixo X como branco
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Define a cor da grade do eixo X
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "white",
        },
      },
      datalabels: {
        display: false, // Certifique-se de que o datalabels esteja realmente desabilitado
      },
    },
    maintainAspectRatio: false,
  };

  const generateLabels = (startDate, endDate) => {
    const labels = [];
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      labels.push(
        currentDate.toLocaleDateString("pt-BR", {
          month: "long",
          year: "numeric",
        })
      );
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    return labels;
  };

  // Gera dados aleatórios ou busque os dados reais com base nas datas
  const labels = generateLabels(dateValue.startDate, dateValue.endDate);

  const data = {
    labels,
    datasets: [
      {
        label: "Rendimentos",
        data: labels.map(() => {
          return Math.random() * 1000 + 500;
        }),
        backgroundColor: "rgba(255, 99, 132, 1)",
        datalabels: { display: false }, // Certifique-se de desabilitar também dentro de datasets
      },
      {
        label: "Dividendos",
        data: labels.map(() => {
          return Math.random() * 1000 + 500;
        }),
        backgroundColor: "rgba(53, 162, 235, 1)",
        datalabels: { display: false }, // Desabilitar labels aqui
      },
      {
        label: "Cupom",
        data: labels.map(() => {
          return Math.random() * 1000 + 500;
        }),
        backgroundColor: "rgba(235, 162, 235, 1)",
        datalabels: { display: false }, // Desabilitar labels aqui
      },
      {
        label: "Amortização",
        data: labels.map(() => {
          return Math.random() * 1000 + 500;
        }),
        backgroundColor: "rgba(132, 215, 135, 1)",
        datalabels: { display: false }, // Desabilitar labels aqui
      },
    ],
  };

  return (
    <TitleCard title={"Proventos mensais"} className="bg-slate-600 text-white">
      <div
        style={{
          height: "380px",
        }}
        className="bg-slate-600"
      >
        <Bar options={options} data={data} />
      </div>
    </TitleCard>
  );
}
