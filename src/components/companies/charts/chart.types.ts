import type { ChartData } from "chart.js";

export type BarChartData = ChartData<"bar", number[], string>;
export type LineChartData = ChartData<"line", number[], string>;

export type BarChartComponentProps = {
  data: BarChartData;
  title?: string;
};

export type LineChartComponentProps = {
  data: LineChartData;
  title?: string;
};
