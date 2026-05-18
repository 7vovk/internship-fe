"use client";

import React, { useRef, useEffect } from "react";
import {
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import type { LineChartComponentProps } from "@/components/companies/charts/chart.types";

Chart.register(
  CategoryScale,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
);

export default function LineChartComponent({
  data,
  title = "",
}: LineChartComponentProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = chartRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: "line",
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: title,
          },
        },
      },
    });

    return () => chart.destroy();
  }, [data, title]);

  return (
    <div>
      <canvas id="myChart" ref={chartRef} />
    </div>
  );
}
