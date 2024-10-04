import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import TitleCard from "../../../components/TitleCard";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Importa o plugin

// Registra o plugin necessário
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartDataLabels
);

export default function LineChart({ dateValue }) {
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
          color: "white", // Define a cor dos rótulos do eixo Y como branco
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Define a cor da grade do eixo Y
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",
        },
      },
      datalabels: {
        display: false, // Oculta as labels de dados
      },
    },
  };

  // Gerar labels com base no intervalo de datas
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
        fill: false, // A linha CDI não terá preenchimento
        label: "CDI",
        data: labels.map(() => Math.random() * 1.1 + 0.1), // Exemplo de dados aleatórios
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderDash: [3, 5],
      },
      {
        fill: false, // A linha Carteira não terá preenchimento
        label: "Carteira",
        data: labels.map(() => Math.random()), // Exemplo de dados aleatórios
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  console.log("start", dateValue.startDate);
  console.log("end", dateValue.endDate);

  return (
    <TitleCard title={"Comparativo"} className="bg-slate-600 text-white">
      <Line data={data} options={options} />
    </TitleCard>
  );
}
