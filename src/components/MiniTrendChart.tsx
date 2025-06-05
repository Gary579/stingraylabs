import React from 'react';
import { motion } from 'framer-motion';

interface MiniTrendChartProps {
  data: number[];
  width?: number;
  height?: number;
  strokeWidth?: number;
}

const MiniTrendChart: React.FC<MiniTrendChartProps> = ({
  data,
  width = 60,
  height = 24,
  strokeWidth = 1.5,
}) => {
  if (!data || data.length < 2) {
    return <div style={{ width, height }} className="flex items-center justify-center text-xs text-gray-500">N/A</div>;
  }

  const yMin = Math.min(...data);
  const yMax = Math.max(...data);

  // Normalize data points to fit within the SVG viewbox
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const yRange = yMax - yMin;
    // Ensure y is not NaN if yRange is 0 (all data points are the same)
    const y = yRange === 0 ? height / 2 : height - ((value - yMin) / yRange) * height;
    // Clamp y to be within [strokeWidth / 2, height - strokeWidth / 2] to prevent clipping
    return `${x},${Math.max(strokeWidth / 2, Math.min(y, height - strokeWidth / 2))}`;
  }).join(' '); 

  const pathD = `M${points}`;

  // Determine color based on overall trend (start vs end)
  const startValue = data[0];
  const endValue = data[data.length - 1];
  let strokeColor = 'currentColor'; // Default color (can be inherited or set from Tailwind)

  if (endValue > startValue) {
    strokeColor = 'rgba(16, 185, 129, 0.8)'; // Tailwind green-500 with opacity
  } else if (endValue < startValue) {
    strokeColor = 'rgba(239, 68, 68, 0.8)'; // Tailwind red-500 with opacity
  } else {
    strokeColor = 'rgba(107, 114, 128, 0.8)'; // Tailwind gray-500 with opacity
  }

  return (
    <svg 
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block"
    >
      <motion.path
        d={pathD}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      />
    </svg>
  );
};

export default MiniTrendChart; 