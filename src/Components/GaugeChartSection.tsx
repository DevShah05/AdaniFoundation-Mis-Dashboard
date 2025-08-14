import React from "react";

interface GaugeChartProps {
  percentage: number | string;
  label?: string;
  size?: number;
  trackColor?: string;
  valueColor?: string;
}

const GaugeChart: React.FC<GaugeChartProps> = ({
  percentage,
  label,
  size = 100,
  trackColor = "#E5E7EB",
  valueColor = "#007BBD",
}) => {
  const pctNum = Math.max(0, Math.min(100, Number(percentage) || 0));

  const radius = size / 2;
  const stroke = Math.max(6, Math.round(size * 0.1));
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (pctNum / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow p-4 w-full h-full" role="img" aria-label={`Gauge ${pctNum}%`}>
      <svg height={size} width={size} className="-rotate-90">
        <circle stroke={trackColor} fill="transparent" strokeWidth={stroke} r={normalizedRadius} cx={radius} cy={radius} />
        <circle
          stroke={valueColor}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset, transition: "stroke-dashoffset 0.5s ease" }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <span className="text-2xl font-bold text-[#007BBD] mt-2">{pctNum}%</span>
      {label && <span className="text-sm text-gray-600 mt-1 text-center">{label}</span>}
    </div>
  );
};

export default GaugeChart;

