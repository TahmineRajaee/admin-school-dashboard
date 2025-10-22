import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function BaarChart() {
  return (
    <div className="flex flex-wrap w-full mt-2 lg:mt-0 lg:w-[58%] py-4 px-2 bg-white rounded-lg">
      <h2 className="w-full px-2 font-bold text-base lg:text-lg">Attendance</h2>
      <div className="w-full h-[300px]">
        <BarChart
          xAxis={[
            {
              data: ["Mon", "Tue", "Wed", "Thu", "Fri"],
              scaleType: "band",
            },
          ]}
          series={[
            { data: [297, 250, 230, 273, 305], label: "present" },
            { data: [33, 80, 100, 57, 25], label: "absent" },
          ]}
          margin={{
            left: 40,
            right: 20,
            top: 30,
            bottom: 30,
          }}
          yAxis={[{ width: 40 }]}
          colors={["#6366f1", "#fb7185"]}
          slotProps={{
            legend: {
              direction: "row",
              position: { vertical: "top", horizontal: "middle" },
              padding: { top: 10, bottom: 10 },
            },
          }}
        />
      </div>
    </div>
  );
}
