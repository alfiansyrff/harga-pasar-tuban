// 'use client'

// import React, { useEffect, useState } from 'react'
// import HargaForm from './components/form/hargaForm'
// import ReactPaginate from 'react-paginate'
// import ProductTable from './components/table/product';
// import CardMarquee from './components/card/marquee';
// import Marquee from "react-marquee-slider";
// import styled from "styled-components";
// import times from "lodash/times";
// import UnduhMingguan from './components/form/unduhMingguan';
// import BarChart from './components/chart/barChart';
// import LineChart from './components/chart/lineChart';


// function HomePage() {
//   const [loading, setLoading] = useState(false);  
//   const [data, setData] = useState<any[]>([]);
//   const [pasar, setPasar] = useState('');
//   const [tgl, setTgl] = useState('');

//   const [dataMingguan, setDataMinguan] = useState<any[]>([]);
//   const [isDataMingguanNewer, setIsDataMingguanNewer] = useState(false); 

//   const handleData = (getData: any[]) => {
    
//     setLoading(true);
//     setData(getData);    
//     setIsDataMingguanNewer(false);
//     setLoading(false);
//   }

//   const handlePasar = (getPasar: string) => {
//     switch (getPasar) {
//       case '98':
//         setPasar('Pasar Baru Tuban')
//         break;
//       case '99': 
//         setPasar('Pasar Bangilan')
//         break;
//       case '100': 
//         setPasar('Pasar Jatirogo')
//         break;
//       case '': 
//         setPasar('Kabupaten Tuban')
//         break;
//       default:
//         break;
//     }
//   }

//   const handleTgl = (getTgl: string) => {
//     setTgl(getTgl);
//   }

//   const handleDataMingguan = (getDataMingguan: any[]) => {
//     setLoading(true);
//     setDataMinguan(getDataMingguan);  
//     setIsDataMingguanNewer(true); 
//     setLoading(false);
//   }


//   return (
//     <div className="min-h-screen bg-gray-200 p-5">
//       <div className="grid grid-cols-3 gap-5 py-5">
//         <div className="col-span-3 md:col-span-1 flex flex-col gap-4">
//           <HargaForm handleData={handleData} handlePasar={handlePasar} handleTgl={handleTgl} />
//           <UnduhMingguan handleDataMingguan={handleDataMingguan} />
//         </div>
//         <div className="col-span-3 md:col-span-2">
//           <div className="bg-white rounded-2xl shadow-md p-5">
//             {data.length === 0 && dataMingguan.length === 0 && (
//               <div className="p-4 text-sm text-blue-800 rounded-lg bg-blue-50" role="alert">
//                 <span className="font-medium">Perhatian!</span> Silakan lakukan filter terlebih dahulu untuk menampilkan data
//               </div>
//             )}
//             {loading ? (
//               <p>Loading...</p>
//             ) : isDataMingguanNewer ? (
//               dataMingguan.length > 0 && <LineChart />
//             ) : (
//               data.length > 0 && (
//                 <>
//                   <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
//                     <span className="font-medium">Berhasil!</span> Berikut data harga <span>{pasar}</span> pada tanggal <span>{tgl}</span>
//                   </div>
//                   <ProductTable data={data} />
//                 </>
//               )
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HomePage

// "use client"

// import React, { useEffect, useState } from 'react';
// import HargaForm from './components/form/hargaForm';
// import ProductTable from './components/table/product';
// import UnduhMingguan from './components/form/unduhMingguan';
// import LineChart from './components/chart/lineChart';

// function HomePage() {
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState<any[]>([]);
//   const [pasar, setPasar] = useState('');
//   const [tgl, setTgl] = useState('');
//   const [dataMingguan, setDataMingguan] = useState<any[]>([]);
//   const [isDataMingguanNewer, setIsDataMingguanNewer] = useState(false);
//   const [chartData, setChartData] = useState<{ labels: string[], values: number[], variant: string }>({ labels: [], values: [], variant: '' });

//   const handleData = (getData: any[]) => {
//     setLoading(true);
//     setData(getData);
//     setIsDataMingguanNewer(false);
//     setLoading(false);
//   };

//   const handlePasar = (getPasar: string) => {
//     setPasar(getPasar);
//   };

//   const handleTgl = (getTgl: string) => {
//     setTgl(getTgl);
//   };

//   const handleDataMingguan = (getDataMingguan: any[]) => {
//     setLoading(true);
//     setDataMingguan(getDataMingguan);
//     setIsDataMingguanNewer(true);
  
//     // Process data for chart
//     const labels = getDataMingguan[0].map(item => item.tanggal);
//     const values = getDataMingguan[0].map(item => item.harga);
//     const variant = getDataMingguan.variant;

  
//     setChartData({ labels, values, variant});
//     setLoading(false);
//   };
  

//   return (
//     <div className="min-h-screen bg-gray-200 p-5">
//       <div className="grid grid-cols-3 gap-5 py-5">
//         <div className="col-span-3 md:col-span-1 flex flex-col gap-4">
//           <HargaForm handleData={handleData} handlePasar={handlePasar} handleTgl={handleTgl} />
//           <UnduhMingguan handleDataMingguan={handleDataMingguan} />
//         </div>
//         <div className="col-span-3 md:col-span-2">
//           <div className="bg-white rounded-2xl shadow-md p-5">
//             {data.length === 0 && dataMingguan.length === 0 && (
//               <div className="p-4 text-sm text-blue-800 rounded-lg bg-blue-50" role="alert">
//                 <span className="font-medium">Perhatian!</span> Silakan lakukan filter terlebih dahulu untuk menampilkan data
//               </div>
//             )}
//             {loading ? (
//               <p>Loading...</p>
//             ) : isDataMingguanNewer ? (
//               chartData.labels.length > 0 && chartData.values.length > 0 ? (
//                 <LineChart data={chartData} />
//               ) : (
//                 <p>No data available for the chart</p>
//               )
//             ) : (
//               data.length > 0 && (
//                 <>
//                   <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
//                     <span className="font-medium">Berhasil!</span> Berikut data harga <span>{pasar}</span> pada tanggal <span>{tgl}</span>
//                   </div>
//                   <ProductTable data={data} />
//                 </>
//               )
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HomePage;


// "use client";

// import React, { useState } from 'react';
// import HargaForm from './components/form/hargaForm';
// import ProductTable from './components/table/product';
// import UnduhMingguan from './components/form/unduhMingguan';
// import LineChart from './components/chart/lineChart';

// interface Dataset {
//   label: string;
//   data: number[];
//   borderColor: string;
//   backgroundColor: string;
//   borderWidth: number;
//   fill: boolean;
//   tension: number;
//   pointRadius: number;
//   pointHoverRadius: number;
// }

// interface ChartData {
//   labels: string[];
//   datasets: Dataset[];
//   variant: string;
// }

// function HomePage() {
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState<any[]>([]);
//   const [pasar, setPasar] = useState('');
//   const [tgl, setTgl] = useState('');
//   const [dataMingguan, setDataMingguan] = useState<any[]>([]);
//   const [isDataMingguanNewer, setIsDataMingguanNewer] = useState(false);
//   const [chartData, setChartData] = useState<ChartData>({ labels: [], datasets: [] });

//   const handleData = (getData: any[]) => {
//     setLoading(true);
//     setData(getData);
//     setIsDataMingguanNewer(false);
//     setLoading(false);
//   };

//   const handlePasar = (getPasar: string) => {
//     setPasar(getPasar);
//   };

//   const handleTgl = (getTgl: string) => {
//     setTgl(getTgl);
//   };

//   const handleDataMingguan = (getDataMingguan: any[]) => {
//     setLoading(true);

//     // Process data for chart
//     const labels = getDataMingguan[0].map(item => item.tanggal);
//     const variant = getDataMingguan[0].variant;

//     const datasets = getDataMingguan.map((dataset, index) => ({
//       label: index === 0 ? 'SP2KP' : 'Siskaperbapo', // You can customize this label
//       data: dataset.map(item => item.harga),
//       borderColor: index === 0 ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)',
//       backgroundColor: index === 0 ? 'rgba(75, 192, 192, 0.2)' : 'rgba(255, 99, 132, 0.2)',
//       borderWidth: 2,
//       fill: false,
//       tension: 0.4,
//       pointRadius: 0,
//       pointHoverRadius: 0,
//     }));


//     setChartData({ labels, datasets, variant });
//     console.log(getDataMingguan);
    
//     console.log("chart data:", chartData);
    
//     setIsDataMingguanNewer(true);
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-200 p-5">
//       <div className="grid grid-cols-3 gap-5 py-5">
//         <div className="col-span-3 md:col-span-1 flex flex-col gap-4">
//           <HargaForm handleData={handleData} handlePasar={handlePasar} handleTgl={handleTgl} />
//           <UnduhMingguan handleDataMingguan={handleDataMingguan} />
//         </div>
//         <div className="col-span-3 md:col-span-2">
//           <div className="bg-white rounded-2xl shadow-md p-5">
//             {data.length === 0 && dataMingguan.length === 0 && (
//               <div className="p-4 text-sm text-blue-800 rounded-lg bg-blue-50" role="alert">
//                 <span className="font-medium">Perhatian!</span> Silakan lakukan filter terlebih dahulu untuk menampilkan data
//               </div>
//             )}
//             {loading ? (
//               <p>Loading...</p>
//             ) : isDataMingguanNewer ? (
//               chartData.labels.length > 0 && chartData.datasets.length > 0 ? (
//                 <LineChart data={chartData} />
//               ) : (
//                 <p>No data available for the chart</p>
//               )
//             ) : (
//               data.length > 0 && (
//                 <>
//                   <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
//                     <span className="font-medium">Berhasil!</span> Berikut data harga <span>{pasar}</span> pada tanggal <span>{tgl}</span>
//                   </div>
//                   <ProductTable data={data} />
//                 </>
//               )
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HomePage;

"use client";

import React, { useState } from 'react';
import HargaForm from './components/form/hargaForm';
import ProductTable from './components/table/product';
import UnduhMingguan from './components/form/unduhMingguan';
import LineChart from './components/chart/lineChart';
import ExportButton from './components/button/exportButton';

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

interface ChartData {
  labels: string[];
  datasets: Dataset[];
  variant: string;
}

function HomePage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [pasar, setPasar] = useState('');
  const [tgl, setTgl] = useState('');
  const [dataMingguan, setDataMingguan] = useState<any[]>([]);
  const [isDataMingguanNewer, setIsDataMingguanNewer] = useState(false);
  const [chartData, setChartData] = useState<ChartData>({ labels: [], datasets: [], variant: '' });

  const handleData = (getData: any[]) => {
    setLoading(true);
    setData(getData);
    setIsDataMingguanNewer(false);
    setLoading(false);
  };

  const handlePasar = (getPasar: string) => {
    setPasar(getPasar);
  };

  const handleTgl = (getTgl: string) => {
    setTgl(getTgl);
  };

  const handleDataMingguan = (getDataMingguan: any[]) => {
    setLoading(true);

    // Process data for chart
    const labels = getDataMingguan[0].map(item => item.tanggal);
    const variant = getDataMingguan[0].variant;

    const datasets = getDataMingguan.map((dataset, index) => ({
      label: index === 0 ? 'SP2KP' : 'Siskaperbapo', // Set labels based on index
      data: dataset.map(item => item.harga),
      borderColor: index === 0 ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)', // Different color for each dataset
      backgroundColor: index === 0 ? 'rgba(75, 192, 192, 0.2)' : 'rgba(255, 99, 132, 0.2)', // Different color for each dataset
      borderWidth: 2,
      fill: false,
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 0,
    }));

    setChartData({ labels, datasets, variant });
    setIsDataMingguanNewer(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-200 p-5">
      <div className="grid grid-cols-3 gap-5 py-5">
        <div className="col-span-3 md:col-span-1 flex flex-col gap-4">
          <HargaForm handleData={handleData} handlePasar={handlePasar} handleTgl={handleTgl} />
          <UnduhMingguan handleDataMingguan={handleDataMingguan} />
        </div>
        <div className="col-span-3 md:col-span-2">
          <div className="bg-white rounded-2xl shadow-md p-5">
            {data.length === 0 && !isDataMingguanNewer && (
              <div className="p-4 text-sm text-blue-800 rounded-lg bg-blue-50" role="alert">
                <span className="font-medium">Perhatian!</span> Silakan lakukan filter terlebih dahulu untuk menampilkan data
              </div>
            )}
            {loading ? (
              <p>Loading...</p>
            ) : isDataMingguanNewer ? (
              chartData.labels.length > 0 && chartData.datasets.length > 0 ? (
                <>
                  <LineChart data={chartData} />
                  <ExportButton />
                </>
              ) : (
                <p>No data available for the chart</p>
              )
            ) : (
              data.length > 0 && (
                <>
                  <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
                    <span className="font-medium">Berhasil!</span> Berikut data harga <span>{pasar}</span> pada tanggal <span>{tgl}</span>
                  </div>
                  <ProductTable data={data} />
                </>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
