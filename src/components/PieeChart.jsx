import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function PieeChart() {
  return (
    <div className="flex flex-wrap w-full lg:w-[40%] py-4 bg-white rounded-lg">
      <h2 className="w-full px-2 font-bold text-base lg:text-lg">Students</h2>
      <div className="w-full flex justify-center">
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 180, label: "Girls" },
                { id: 1, value: 150, label: "Boys" },
              ],
            },
          ]}
          width={300}
          height={200}
          colors={["#fb7185", "#6366f1"]}
          slotProps={{
            legend: {
              direction: "row",
              position: { vertical: "bottom", horizontal: "middle" },
              padding: { top: 10, bottom: 0 },
            },
          }}
        />
      </div>
    </div>
  );
}
