import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { Card, CardContent } from "@/components/ui/card";

Chart.register(...registerables);

const CGPAGraph = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Sem 1", "Sem 2", "Sem 3", "Sem 4"],
        datasets: [
          {
            label: "CGPA Progress",
            data: [3.2, 3.5, 3.7, 3.8],
            borderColor: "blue",
            backgroundColor: "rgba(0, 0, 255, 0.2)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Allows  to control height manually
        scales: {
          x: { type: "category" },
          y: { beginAtZero: true },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <Card>
      <CardContent>
        <h3 className="text-lg font-semibold">CGPA Progress</h3>
        {/* fixed height for the chart container */}
        <div style={{ width: "100%", height: "300px" }}>
          <canvas ref={chartRef} style={{ width: "100%", height: "100%" }}></canvas>
        </div>
      </CardContent>
    </Card>
  );
};

export default CGPAGraph;