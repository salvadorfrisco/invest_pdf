"use client";

import Image from "next/image";
import DoughnutChart from "./components/DoughnutChart";
import LineChart from "./components/LineChart";
import StackBarChart from "./components/StackBarChart";
import PieChartCategory from "./components/PieChartCategory";
import DoughnutChartStrategy from "./components/DoughnutChartStrategy";
import PieChartEarnings from "./components/PieChartEarnings";
import { useMemo, useState, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import React from "react";
import { getPosicaoData } from "../../useCases/fetchPosicaoUseCase";

// Memoize os componentes de gráficos
const MemoizedDoughnutChart = React.memo(DoughnutChart);
const MemoizedLineChart = React.memo(LineChart);
const MemoizedStackBarChart = React.memo(StackBarChart);
const MemoizedPieChartCategory = React.memo(PieChartCategory);
const MemoizedDoughnutChartStrategy = React.memo(DoughnutChartStrategy);
const MemoizedPieChartEarnings = React.memo(PieChartEarnings);

export function Charts() {
  const [dateValue, setDateValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const calculateDateRange = (days) => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    return { startDate, endDate };
  };

  const memoizedHandlers = useMemo(
    () => ({
      handleLast7Days: () => {
        setDateValue(calculateDateRange(7));
      },
      handleLastMonth: () => {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        setDateValue({ startDate, endDate });
      },
    }),
    []
  );

  const [posicao, setPosicao] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPosicaoData();
        setPosicao(data); // Aqui você pode usar os dados das posicao para seus gráficos
      } catch (error) {
        console.error("Erro ao carregar posicao:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div
      style={{
        // textAlign: "center",
        backgroundColor: "#324355",
        paddingTop: "24px",
        color: "#F7F7F7",
        fontFamily: "Poppins, sans-serif",
        margin: "0 auto",
      }}
      // className="bg-slate-700 min-h-screen relative min-w-min"
    >
      <header className="navbar bg-base-100 p-4 bg-slate-600 text-white flex">
        <Image
          src="/logo-psr-invest-light-transp.png"
          alt="Logo"
          width={180}
          height={47}
          className="mr-2 min-w-32"
        />
        {/* <div className="flex flex-col items-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image src="/avatar.png" alt="Avatar" width={40} height={40} />
            </div>
          </label>
        </div> */}
      </header>

      <div
        style={{
          maxWidth: "100%",
          margin: "0 auto",
          paddingLeft: "1rem",
          paddingRight: "1rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.5rem",
            marginTop: "1.5rem",
          }}
        >
          <MemoizedDoughnutChart posicao={posicao} />
          <MemoizedLineChart dateValue={dateValue} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.5rem",
            marginTop: "1.5rem",
          }}
        >
          <MemoizedPieChartCategory dateValue={dateValue} />
          <MemoizedDoughnutChartStrategy dateValue={dateValue} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.5rem",
            marginTop: "1.5rem",
            paddingBottom: "6rem",
          }}
        >
          <MemoizedStackBarChart dateValue={dateValue} />
          <MemoizedPieChartEarnings dateValue={dateValue} />
        </div>
      </div>
    </div>
  );
}
