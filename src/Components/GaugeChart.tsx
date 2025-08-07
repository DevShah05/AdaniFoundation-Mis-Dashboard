// src/Components/GaugeChart.tsx
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface GaugeChartProps {
  completion: number;
}

const GaugeChart: React.FC<GaugeChartProps> = ({ completion }) => {
  return (
    <div className="flex-1 bg-white rounded-lg shadow p-4 min-w-[300px] max-w-[400px]">
      <h2 className="text-lg font-semibold text-[#6B1E82] mb-4 text-center">
        Completion Gauge
      </h2>
      <div className="w-32 h-32 mx-auto">
        <CircularProgressbar
          value={completion}
          text={`${completion}%`}
          styles={buildStyles({
            pathColor: "#6B1E82",
            textColor: "#6B1E82",
            trailColor: "#eee",
            textSize: "16px",
          })}
        />
      </div>
    </div>
  );
};

export default GaugeChart;

