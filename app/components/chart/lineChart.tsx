
  
  
  // "use client";

  // import React, { useRef, useEffect } from 'react';
  // import { Chart, LineController, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

  // Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

  // const LineChart: React.FC = () => {
  //   const chartRef = useRef<HTMLCanvasElement>(null);
  //   const chartInstanceRef = useRef<Chart | null>(null);

  //   useEffect(() => {
  //     if (chartRef.current) {
  //       const ctx = chartRef.current.getContext('2d');
  //       if (ctx) {
  //         if (chartInstanceRef.current) {
  //           chartInstanceRef.current.destroy();
  //         }

  //         chartInstanceRef.current = new Chart(ctx, {
  //           type: 'line',
  //           data: {
  //             labels: ['05/08/2024', '06/08/2024', '07/08/2024', '08/08/2024', '09/08/2024', '10/08/2024'],
  //             datasets: [
  //               {
  //                 label: 'Harga BERAS',
  //                 data: [65, 59, 80, 81, 56, 55, 40],
  //                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
  //                 borderColor: 'rgba(75, 192, 192, 1)',
  //                 borderWidth: 2,
  //                 fill: true,
  //                 tension: 0.4,
  //                 // pointRadius: 0,
  //                 // pointHoverRadius: 0  
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             plugins: {
  //               legend: {
  //                 position: 'top',
  //               },
  //               title: {
  //                 display: true,
  //                 text: 'Tren Harga BERAS',
  //               },
  //             },
  //             scales: {
  //               x: {
  //                 beginAtZero: true,
  //               },
  //               y: {
  //                 beginAtZero: true,
  //               },
  //             },
  //           },
  //         });
  //       }
  //     }

  //     // Cleanup function to destroy the chart on component unmount
  //     return () => {
  //       if (chartInstanceRef.current) {
  //         chartInstanceRef.current.destroy();
  //       }
  //     };
  //   }, []);

  //   return (
  //     <div>
  //       <canvas ref={chartRef} />
  //     </div>
  //   );
  // };

  // export default LineChart;

// 'use client';

// import React, { useRef, useEffect } from 'react';
// import { Chart, LineController, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, Filler } from 'chart.js';

// // Register necessary components and the Filler plugin
// Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, Filler);

// interface LineChartProps {
//   data: {
//     labels: string[];
//     values: number[];
//   };
// }

// const LineChart: React.FC<LineChartProps> = ({ data }) => {
//   const chartRef = useRef<HTMLCanvasElement>(null);
//   const chartInstanceRef = useRef<Chart | null>(null);

//   useEffect(() => {
//     if (chartRef.current) {
//       // console.log("data chart", data);
      
//       const ctx = chartRef.current.getContext('2d');
//       if (ctx) {
//         if (chartInstanceRef.current) {
//           chartInstanceRef.current.destroy();
//         }

//         chartInstanceRef.current = new Chart(ctx, {
//           type: 'line',
//           data: {
//             labels: data.labels,
//             datasets: [
//               {
//                 label: 'Harga BERAS',
//                 data: data.values,
//                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                 borderColor: 'rgba(75, 192, 192, 1)',
//                 borderWidth: 2,
//                 // fill: true,
//                 tension: 0.4,
//                 // pointRadius: 0,
//                 // pointHoverRadius: 0  
//               },
//             ],
//           },
//           options: {
//             responsive: true,
//             plugins: {
//               legend: {
//                 position: 'top',
//               },
//               title: {
//                 display: true,
//                 text: 'Tren Harga BERAS',
//               },
//             },
//             scales: {
//               x: {
//                 beginAtZero: true,
//               },
//               y: {
//                 beginAtZero: true,
//               },
//             },
//           },
//         });
//       }
//     }

//     return () => {
//       if (chartInstanceRef.current) {
//         chartInstanceRef.current.destroy();
//       }
//     };
//   }, [data]);

//   return (
//     <div>
//       <canvas ref={chartRef} />
//     </div>
//   );
// };

// export default LineChart;


'use client';

import React, { useRef, useEffect } from 'react';
import { Chart, LineController, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, Filler } from 'chart.js';

// Register necessary components and the Filler plugin
Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, Filler);

interface Dataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  borderWidth: number;
  fill: boolean;
  tension: number;
  pointRadius: number;
  pointHoverRadius: number;
}

interface LineChartProps {
  data: {
    labels: string[];
    datasets: Dataset[];
  };
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart<'line'> | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: data.labels,
            datasets: data.datasets,
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: `Tren Harga ${data.variant}`,
              },
            },
            scales: {
              x: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Tanggal',
                },
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Harga (Rp.)',
                },
              },
            },
          },
        });
      }
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default LineChart;
