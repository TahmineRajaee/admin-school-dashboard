import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

export default function LineeChart() {
  return (
    <div className="flex flex-wrap w-full mt-2 py-4 px-2 bg-white rounded-lg">
      <h2>Finance</h2>
      <div className="w-full">
        <LineChart
          xAxis={[
            {
              data: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
              scaleType: "point",
            },
          ]}
          series={[
            {
              data: [
                4000, 3000, 2000, 2780, 1890, 2390, 3490, 3490, 4000, 3850,
                3680, 1400,
              ],
              label: "Income",
            },
            {
              data: [
                2400, 1398, 7800, 3908, 4800, 3800, 4300, 4300, 3300, 2900,
                1800, 3000,
              ],
              label: "Expense",
            },
          ]}
          height={300}
          colors={["#6366f1", "#fb7185"]}
          margin={{ left: 50, right: 20, top: 20, bottom: 50 }}
        />
      </div>
    </div>
  );
}
