"use client";

import React, { useRef, useEffect } from "react";
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import type { BarChartComponentProps } from "@/components/companies/charts/chart.types";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
);

export default function BarChartComponent({
  data,
  title = "",
}: BarChartComponentProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = chartRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: "bar",
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
