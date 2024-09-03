
// 'use client';
// import React, { useEffect, useState } from 'react';
// import downloadExcelFile from '../../helper/downloadMingguan';
// import { komoditasList } from '../../utils/data';


// interface UnduhMingguanProps {
//   handleDataMingguan: (data: any[]) => void;
// }


// type DataMingguanItem = {
//   tanggal: string;
//   items: {
//     name: string;
//     currentPrice: string;
//     yesterdayPrice: string;
//     [key: string]: any; 
//   }[];
// };


// const UnduhMingguan: React.FC<UnduhMingguanProps> = ({handleDataMingguan}) => {
//   const [tanggalAwal, setTanggalAwal] = useState<string>('');
//   const [tanggalAkhir, setTanggalAkhir] = useState<string>('');
//   const [kabkota, setKabkota] = useState<string>('tubankab');
//   const [pasar, setPasar] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<boolean>(false);
//   const [dataMingguan, setDataMingguan] = useState<DataMingguanItem[]>([]);
//   const [menu, setMenu] = useState<string>('unduh');
//   const [komoditas, setKomoditas] = useState<string>('');
//   const komoditasData = komoditasList();

//   const handlePasarChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setPasar(e.target.value);
//   };

//   // useEffect(() => {
//   //   if(dataMingguan) {
//   //     console.log("Updated beras:", dataMingguan[0].items[0]);
//   //   }
//   // }, [dataMingguan]);

//   const getDateRangeArray = (startDate: string, endDate: string): string[] => {
//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     const dateArray: string[] = [];

//     for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
//       dateArray.push(new Date(dt).toISOString().slice(0, 10));
//     }
//     return dateArray;
//   };

//   const fetchData = async () => {
//     setLoading(true);
//     setError(false);
  
//     const dateArray = getDateRangeArray(tanggalAwal, tanggalAkhir);
  
//     try {
//       const results = await Promise.all(dateArray.map(async (tanggal) => {
//         const response = await fetch('/api/scrape', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ tanggal, kabkota, pasar }),
//         });
  
//         if (!response.ok) {
//           throw new Error('Gagal');
//         }
  
//         const data = await response.json();
//         return { tanggal, items: data.items };
//       }));
  
//       const aggregatedData = {};
//       results.forEach(result => {
//         result.items.forEach(item => {
//           if (!aggregatedData[item.name]) {
//             aggregatedData[item.name] = { currentPrices: [], yesterdayPrices: [] };
//           }
//           aggregatedData[item.name].currentPrices.push(parseFloat(item.currentPrice.replace(",", "")));
//           aggregatedData[item.name].yesterdayPrices.push(parseFloat(item.yesterdayPrice.replace(",", "")));
//         });
//       });
  
//       const averagedData = Object.keys(aggregatedData).map(name => {
//         const currentPrices = aggregatedData[name].currentPrices;
//         const yesterdayPrices = aggregatedData[name].yesterdayPrices;
//         const currentPriceSum = currentPrices.reduce((sum, price) => sum + price, 0);
//         const yesterdayPriceSum = yesterdayPrices.reduce((sum, price) => sum + price, 0);
//         const count = currentPrices.length;
  
//         return {
//           name,
//           currentPrice: (currentPriceSum / count).toFixed(3),
//           yesterdayPrice: 0,
//           satuan: "",
//           perubahanRp: "",
//           persentasePerubahan: "",
//           // harga_rerata: (currentPriceSum / count).toFixed(3),
//         };
//       });
  
//       results.push({ tanggal: 'Rata-rata', items: averagedData });
  
//       // return results;
//       // downloadExcelFile(results);
  
//       setLoading(false);
//       setError(false);
  
//       return results;
//     } catch (error) {
//       console.error('Error:', error);
//       setLoading(false);
//       setError(true);
//     }
//   };

//   const donwloadData = async () => {
//     const datas = await fetchData();
//     if (datas) {
//       downloadExcelFile(datas);
//     }
//   }
    
//   };


//   return (
//     <div>
//       <form
//         className='bg-white rounded-2xl shadow-md p-5'
//         onSubmit={(e) => {
//           e.preventDefault();
//           // fetchData();
//           donwloadData();
//         }}
//       >
//         <h1 className='mb-4 border-b-2 text-xl border-blue-500'>Unduh Data & Lihat Tren</h1>
//         <div className='col-span-2 md:col-span-1'>
//             <div className='mb-2'>
//               <label htmlFor="tindakan" className="block mb-0.5 text-sm font-medium text-blue-500">Tindakan</label>
//               <select
//                 id="tindakan"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//                 value={menu}
//                 onChange={(e) => setMenu(e.target.value)}
//               >
//                 <option value="unduh">Unduh Data</option>
//                 <option value="tren">Lihat Tren</option>
//               </select>
//             </div>
//           </div>
//         <div className='mb-2 grid grid-cols-2 gap-2'>
          
//           <div className='col-span-2 md:col-span-1'>
//             <label htmlFor="tanggalAwal" className="block mb-0.5 text-sm font-medium text-blue-500">Pilih Tanggal Awal</label>
//             <div className="relative">
//               <input
//                 type="date"
//                 id="tanggalAwal"
//                 className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//                 value={tanggalAwal}
//                 onChange={(e) => setTanggalAwal(e.target.value)}
//                 required
//               />
//             </div>
//           </div>

//           <div className='col-span-2 md:col-span-1'>
//             <label htmlFor="tanggalAkhir" className="block mb-0.5 text-sm font-medium text-blue-500">Pilih Tanggal Akhir</label>
//             <div className="relative">
//               <input
//                 type="date"
//                 id="tanggalAkhir"
//                 className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//                 value={tanggalAkhir}
//                 onChange={(e) => setTanggalAkhir(e.target.value)}
//                 required
//               />
//             </div>
//           </div>
//         </div>

//         <div className={`mb-2 grid gap-2 ${menu === 'unduh' ? 'grid-cols-1' : 'grid-cols-2'}`}>
//           <div className='col-span-2 md:col-span-1'>
//             <label htmlFor="pasar" className="block mb-0.5 text-sm font-medium text-blue-500">Pilih Pasar</label>
//             <select
//               id="pasar"
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//               value={pasar}
//               onChange={handlePasarChange}
//               >
//               <option value="">Semua Pasar</option>
//               <option value="98">Pasar Baru Tuban</option>
//               <option value="99">Pasar Bangilan</option>
//               <option value="100">Pasar Jatirogo</option>
//             </select>
//           </div>
//           {menu === 'tren' && (

//             <div className='col-span-2 md:col-span-1'>
//             <label htmlFor="komoditi" className="block mb-0.5 text-sm font-medium text-blue-500">Pilih Komoditas</label>
//             <select
//               id="komoditi"
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//               value={komoditas}
//               onChange={(e) => setKomoditas(e.target.value)}
//               >
//                 {komoditasData.map((item, index) => (
//                   <option 
//                     key={index} 
//                     value={item.value} 
//                     disabled={item.value === '00'}
//                   >
//                     {item.label}
//                   </option>
//                 ))}

//               {/*  */}
//               {/* <option value="beras">BERAS</option>
//               <option value="gula">GULA</option>
//               <option value="99">Pasar Bangilan</option>
//               <option value="100">Pasar Jatirogo</option> */}
//             </select>
//           </div>
//           )}
//         </div>

//         <div className='flex items-center gap-1 justify-end mt-4'>

        
//         {menu === 'unduh' && (
//           loading ? (
//             <button disabled type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
//               <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
//                 <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
//               </svg>
//               Loading...
//             </button>
//           ) : (
//             <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
//               Unduh
//             </button>
//           )
//         )}

//         {menu === 'tren' && (

//           loading ? (
//             <button disabled type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
//               <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
//                 <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
//               </svg>
//               Loading...
//             </button>
//           ) : (
//             <button type="button" onClick={getDataMingguan} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
//             Tampilkan
//             </button>
//           )
//         )}

          
//         </div>

//         {error && <p className='text-red-500'>Terjadi Kesalahan. Silakan coba lagi</p>}
//       </form>
//     </div>
//   );
// }

// export default UnduhMingguan;

// 'use client';
// import React, { useState } from 'react';
// import downloadExcelFile from '../../helper/downloadMingguan';
// import { komoditasList } from '../../utils/data';
// import { start } from 'repl';

// interface UnduhMingguanProps {
//   handleDataMingguan: (data: any[]) => void;
// }

// type DataMingguanItem = {
//   tanggal: string;
//   items: {
//     name: string;
//     currentPrice: string;
//     yesterdayPrice: string;
//     [key: string]: any;
//   }[];
// };

// type AggregatedData = {
//   [key: string]: {
//     currentPrices: number[];
//     yesterdayPrices: number[];
//   };
// };

// const UnduhMingguan: React.FC<UnduhMingguanProps> = ({ handleDataMingguan }) => {
//   const [tanggalAwal, setTanggalAwal] = useState<string>('');
//   const [tanggalAkhir, setTanggalAkhir] = useState<string>('');
//   const [kabkota, setKabkota] = useState<string>('tubankab');
//   const [pasar, setPasar] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<boolean>(false);
//   const [menu, setMenu] = useState<string>('unduh');
//   const [komoditas, setKomoditas] = useState<string>('');
//   const komoditasData = komoditasList();

//   const handlePasarChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setPasar(e.target.value);
//   };

//   const getDateRangeArray = (startDate: string, endDate: string): string[] => {
//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     const dateArray: string[] = [];

//     for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
//       dateArray.push(new Date(dt).toISOString().slice(0, 10));
//     }
//     return dateArray;
//   };

//   const fetchData = async (): Promise<DataMingguanItem[] | void> => {
//     setLoading(true);
//     setError(false);

//     const dateArray = getDateRangeArray(tanggalAwal, tanggalAkhir);

//     try {
//       const results = await Promise.all(
//         dateArray.map(async (tanggal) => {
//           const response = await fetch('/api/scrape', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ tanggal, kabkota, pasar }),
//           });

//           if (!response.ok) {
//             throw new Error('Gagal');
//           }

//           const data = await response.json();
//           return { tanggal, items: data.items };
//         })

//       );
//       const aggregatedData: AggregatedData = {};
//       results.forEach((result) => {
//         result.items.forEach((item) => {
//           if (!aggregatedData[item.name]) {
//             aggregatedData[item.name] = { currentPrices: [], yesterdayPrices: [] };
//           }
//           aggregatedData[item.name].currentPrices.push(
//             parseFloat(item.currentPrice.replace(',', ''))
//           );
//           aggregatedData[item.name].yesterdayPrices.push(
//             parseFloat(item.yesterdayPrice.replace(',', ''))
//           );
//         });
//       });

//       const averagedData = Object.keys(aggregatedData).map((name) => {
//         const currentPrices = aggregatedData[name].currentPrices;
//         const yesterdayPrices = aggregatedData[name].yesterdayPrices;
//         const currentPriceSum = currentPrices.reduce((sum, price) => sum + price, 0);
//         const yesterdayPriceSum = yesterdayPrices.reduce((sum, price) => sum + price, 0);
//         const count = currentPrices.length;

//         return {
//           name,
//           currentPrice: (currentPriceSum / count).toFixed(3),
//           yesterdayPrice: 0,
//           satuan: "",
//           perubahanRp: "",
//           persentasePerubahan: "",
//         };
//       });

//       results.push({ tanggal: 'Rata-rata', items: averagedData });

//       const sp2kpResults = await fetch('/api/kemendag', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'applicaiton/json',
//         },
//         body: {
//           "start_date": start,
//           "end_date": end
//         }
//       })

//       setLoading(false);
//       return results;
//     } catch (error) {
//       console.error('Error:', error);
//       setLoading(false);
//       setError(true);
//     }
//   };

//   const downloadData = async () => {
//     const datas = await fetchData();
//     if (datas) {
//       downloadExcelFile(datas);
//     }
//   };

//   return (
//     <div>
//       <form
//         className="bg-white rounded-2xl shadow-md p-5"
//         onSubmit={(e) => {
//           e.preventDefault();
//           downloadData();
//         }}
//       >
//         <h1 className="mb-4 border-b-2 text-xl border-blue-500">Unduh Data & Lihat Tren</h1>
//         <div className="col-span-2 md:col-span-1">
//           <div className="mb-2">
//             <label htmlFor="tindakan" className="block mb-0.5 text-sm font-medium text-blue-500">
//               Tindakan
//             </label>
//             <select
//               id="tindakan"
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//               value={menu}
//               onChange={(e) => setMenu(e.target.value)}
//             >
//               <option value="unduh">Unduh Data</option>
//               <option value="tren">Lihat Tren</option>
//             </select>
//           </div>
//         </div>
//         <div className="mb-2 grid grid-cols-2 gap-2">
//           <div className="col-span-2 md:col-span-1">
//             <label htmlFor="tanggalAwal" className="block mb-0.5 text-sm font-medium text-blue-500">
//               Pilih Tanggal Awal
//             </label>
//             <div className="relative">
//               <input
//                 type="date"
//                 id="tanggalAwal"
//                 className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//                 value={tanggalAwal}
//                 onChange={(e) => setTanggalAwal(e.target.value)}
//                 required
//               />
//             </div>
//           </div>

//           <div className="col-span-2 md:col-span-1">
//             <label htmlFor="tanggalAkhir" className="block mb-0.5 text-sm font-medium text-blue-500">
//               Pilih Tanggal Akhir
//             </label>
//             <div className="relative">
//               <input
//                 type="date"
//                 id="tanggalAkhir"
//                 className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//                 value={tanggalAkhir}
//                 onChange={(e) => setTanggalAkhir(e.target.value)}
//                 required
//               />
//             </div>
//           </div>
//         </div>

//         <div className={`mb-2 grid gap-2 ${menu === 'unduh' ? 'grid-cols-1' : 'grid-cols-2'}`}>
//           <div className="col-span-2 md:col-span-1">
//             <label htmlFor="pasar" className="block mb-0.5 text-sm font-medium text-blue-500">
//               Pilih Pasar
//             </label>
//             <select
//               id="pasar"
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//               value={pasar}
//               onChange={handlePasarChange}
//             >
//               <option value="">Semua Pasar</option>
//               <option value="98">Pasar Baru Tuban</option>
//               <option value="99">Pasar Bangilan</option>
//               <option value="100">Pasar Jatirogo</option>
//             </select>
//           </div>
//           {menu === 'tren' && (
//             <div className="col-span-2 md:col-span-1">
//               <label htmlFor="komoditi" className="block mb-0.5 text-sm font-medium text-blue-500">
//                 Pilih Komoditas
//               </label>
//               <select
//                 id="komoditi"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//                 value={komoditas}
//                 onChange={(e) => setKomoditas(e.target.value)}
//               >
//                 <option value="">Semua Komoditas</option>
//                 {komoditasData.map((komoditasItem) => (
//                   <option value={komoditasItem.value} key={komoditasItem.value}>
//                     {komoditasItem.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}
//         </div>
//         <button
//           className="mt-4 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
//           type="submit"
//           disabled={loading}
//         >
//           {loading ? 'Loading...' : 'Unduh Data'}
//         </button>
//       </form>
//       {error && <p className="text-red-500 mt-2">Terjadi kesalahan saat mengambil data.</p>}
//     </div>
//   );
// };

// export default UnduhMingguan;


// 'use client';
// import React, { useState } from 'react';
// import downloadExcelFile from '../../helper/downloadMingguan';
// import { komoditasList } from '../../utils/data';

// interface UnduhMingguanProps {
// handleDataMingguan: (data: any[]) => void;
// }

// type DataMingguanItem = {
// tanggal: string;
// items: {
//   name: string;
//   currentPrice: string;
//   yesterdayPrice: string;
//   [key: string]: any;
// }[];
// };

// type AggregatedData = {
// [key: string]: {
//   currentPrices: number[];
//   yesterdayPrices: number[];
// };
// };

// const UnduhMingguan: React.FC<UnduhMingguanProps> = ({ handleDataMingguan }) => {
// const [tanggalAwal, setTanggalAwal] = useState<string>('');
// const [tanggalAkhir, setTanggalAkhir] = useState<string>('');
// const [kabkota, setKabkota] = useState<string>('tubankab');
// const [pasar, setPasar] = useState<string>('');
// const [loading, setLoading] = useState<boolean>(false);
// const [error, setError] = useState<boolean>(false);
// const [menu, setMenu] = useState<string>('unduh');
// const [komoditas, setKomoditas] = useState<string>('');
// const komoditasData = komoditasList();

// const handlePasarChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//   setPasar(e.target.value);
// };

// const getDateRangeArray = (startDate: string, endDate: string): string[] => {
//   const start = new Date(startDate);
//   const end = new Date(endDate);
//   const dateArray: string[] = [];

//   for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
//     dateArray.push(new Date(dt).toISOString().slice(0, 10));
//   }
//   return dateArray;
// };

// const fetchData = async (): Promise<DataMingguanItem[] | void> => {
//   setLoading(true);
//   setError(false);

//   const dateArray = getDateRangeArray(tanggalAwal, tanggalAkhir);

//   try {
//     const results = await Promise.all(
//       dateArray.map(async (tanggal) => {
//         const response = await fetch('/api/scrape', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ tanggal, kabkota, pasar }),
//         });

//         if (!response.ok) {
//           throw new Error('Gagal');
//         }

//         const data = await response.json();
//         return { tanggal, items: data.items };
//       })
//     );

//     const aggregatedData: AggregatedData = {};
//     results.forEach((result) => {
//       result.items.forEach((item) => {
//         if (!aggregatedData[item.name]) {
//           aggregatedData[item.name] = { currentPrices: [], yesterdayPrices: [] };
//         }
//         aggregatedData[item.name].currentPrices.push(
//           parseFloat(item.currentPrice.replace(',', ''))
//         );
//         aggregatedData[item.name].yesterdayPrices.push(
//           parseFloat(item.yesterdayPrice.replace(',', ''))
//         );
//       });
//     });

//     const averagedData = Object.keys(aggregatedData).map((name) => {
//       const currentPrices = aggregatedData[name].currentPrices;
//       const yesterdayPrices = aggregatedData[name].yesterdayPrices;
//       const currentPriceSum = currentPrices.reduce((sum, price) => sum + price, 0);
//       const yesterdayPriceSum = yesterdayPrices.reduce((sum, price) => sum + price, 0);
//       const count = currentPrices.length;

//       return {
//         name,
//         currentPrice: (currentPriceSum / count).toFixed(3),
//         yesterdayPrice: 0,
//         satuan: "",
//         perubahanRp: "",
//         persentasePerubahan: "",
//       };
//     });

//     results.push({ tanggal: 'Rata-rata', items: averagedData });

//   } catch (error) {
//     console.error('Error:', error);
//     setLoading(false);
//     setError(true);
//   }
// };

// const fetchSp2kData = async () => {
//   const sp2kpResponse = await fetch('/api/kemendag', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//     },
//     body: JSON.stringify({
//       start_date: tanggalAwal,
//       end_date: tanggalAkhir,
//       variant_id: '52',
//     }),
//   });

//   if (!sp2kpResponse.ok) {
//     throw new Error('Failed to fetch SP2KP data');
//   }

//   const sp2kpData = await sp2kpResponse.json();
//   console.log('SP2KP Data:', sp2kpData);

//   // setLoading(false);
//   // return results;
// }

// const downloadData = async () => {
//   const datas = await fetchSp2kData();
//   // if (datas) {
//   //   downloadExcelFile(datas);
//   // }
// };

// return (
//   <div>
//     <form
//       className="bg-white rounded-2xl shadow-md p-5"
//       onSubmit={(e) => {
//         e.preventDefault();
//         downloadData();
//       }}
//     >
//       <h1 className="mb-4 border-b-2 text-xl border-blue-500">Unduh Data & Lihat Tren</h1>
//       <div className="col-span-2 md:col-span-1">
//         <div className="mb-2">
//           <label htmlFor="tindakan" className="block mb-0.5 text-sm font-medium text-blue-500">
//             Tindakan
//           </label>
//           <select
//             id="tindakan"
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//             value={menu}
//             onChange={(e) => setMenu(e.target.value)}
//           >
//             <option value="unduh">Unduh Data</option>
//             <option value="tren">Lihat Tren</option>
//           </select>
//         </div>
//       </div>
//       <div className="mb-2 grid grid-cols-2 gap-2">
//         <div className="col-span-2 md:col-span-1">
//           <label htmlFor="tanggalAwal" className="block mb-0.5 text-sm font-medium text-blue-500">
//             Pilih Tanggal Awal
//           </label>
//           <div className="relative">
//             <input
//               type="date"
//               id="tanggalAwal"
//               className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//               value={tanggalAwal}
//               onChange={(e) => setTanggalAwal(e.target.value)}
//               required
//             />
//           </div>
//         </div>

//         <div className="col-span-2 md:col-span-1">
//           <label htmlFor="tanggalAkhir" className="block mb-0.5 text-sm font-medium text-blue-500">
//             Pilih Tanggal Akhir
//           </label>
//           <div className="relative">
//             <input
//               type="date"
//               id="tanggalAkhir"
//               className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//               value={tanggalAkhir}
//               onChange={(e) => setTanggalAkhir(e.target.value)}
//               required
//             />
//           </div>
//         </div>
//       </div>

//       <div className={`mb-2 grid gap-2 ${menu === 'unduh' ? 'grid-cols-1' : 'grid-cols-2'}`}>
//         <div className="col-span-2 md:col-span-1">
//           <label htmlFor="pasar" className="block mb-0.5 text-sm font-medium text-blue-500">
//             Pilih Pasar
//           </label>
//           <select
//             id="pasar"
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//             value={pasar}
//             onChange={handlePasarChange}
//           >
//             <option value="">Semua Pasar</option>
//             <option value="98">Pasar Baru Tuban</option>
//             <option value="99">Pasar Bangilan</option>
//             <option value="100">Pasar Jatirogo</option>
//           </select>
//         </div>
//         {menu === 'tren' && (
//           <div className="col-span-2 md:col-span-1">
//             <label htmlFor="komoditi" className="block mb-0.5 text-sm font-medium text-blue-500">
//               Pilih Komoditas
//             </label>
//             <select
//               id="komoditi"
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//               value={komoditas}
//               onChange={(e) => setKomoditas(e.target.value)}
//             >
//               <option value="">Semua Komoditas</option>
//               {komoditasData.map((item, idx) => (
//                 <option key={idx} value={item.value}>
//                   {item.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}
//       </div>
//       <button
//         className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//         type="submit"
//         disabled={loading}
//       >
//         {loading ? 'Mengunduh...' : 'Unduh Data'}
//       </button>
//       {error && <p className="text-red-500 mt-2">Terjadi kesalahan saat mengunduh data.</p>}
//     </form>
//   </div>
// );
// };

// export default UnduhMingguan;

'use client';
import React, { useState } from 'react';
import downloadExcelFile from '../../helper/downloadMingguan';
import { komoditasList } from '../../utils/data';

interface UnduhMingguanProps {
  handleDataMingguan: (data: any[]) => void;
}

type Sp2kpItem = {
  tanggal: string;
  harga: number;
};

const UnduhMingguan: React.FC<UnduhMingguanProps> = ({ handleDataMingguan }) => {
  const [tanggalAwal, setTanggalAwal] = useState<string>('');
  const [tanggalAkhir, setTanggalAkhir] = useState<string>('');
  const [pasar, setPasar] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [menu, setMenu] = useState<string>('unduh');
  const [komoditas, setKomoditas] = useState<string>('');

  const komoditasData = komoditasList();

  const handlePasarChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPasar(e.target.value);
  };

  const fetchSp2kData = async () => {
    try {
      const response = await fetch('/api/kemendag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          start_date: tanggalAwal,
          end_date: tanggalAkhir,
          variant_id: '52',
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch SP2KP data');
      }
  
      const sp2kpData = await response.json();
      // console.log('SP2KP Data:', sp2kpData.data[0].daftarHarga); 
      // Log the data to check its format

      const dataArray = sp2kpData.data[0].daftarHarga;
      const variant_name = sp2kpData.data[0].variant;
      
      if (Array.isArray(dataArray)) {
        const transformedData = dataArray.map((item: any) => ({
          tanggal: item.date,
          harga: item.harga,
        }));

        transformedData["variant"] = variant_name;
        // console.log(transformedData);
        
        handleDataMingguan(transformedData); 
        
      } else {
        // Handle cases where the response is not an array
        console.error('Unexpected data format:', sp2kpData);
        setError(true);
      }
  
    } catch (error) {
      console.error('Error:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  

  const downloadData = async () => {
    setLoading(true);
    await fetchSp2kData();
  };

  return (
    <div>
      <form
        className="bg-white rounded-2xl shadow-md p-5"
        onSubmit={(e) => {
          e.preventDefault();
          downloadData();
        }}
      >
        <h1 className="mb-4 border-b-2 text-xl border-blue-500">Unduh Data & Lihat Tren</h1>
        <div className="col-span-2 md:col-span-1">
          <div className="mb-2">
            <label htmlFor="tindakan" className="block mb-0.5 text-sm font-medium text-blue-500">
              Tindakan
            </label>
            <select
              id="tindakan"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={menu}
              onChange={(e) => setMenu(e.target.value)}
            >
              <option value="unduh">Unduh Data</option>
              <option value="tren">Lihat Tren</option>
            </select>
          </div>
        </div>
        <div className="mb-2 grid grid-cols-2 gap-2">
          <div className="col-span-2 md:col-span-1">
            <label htmlFor="tanggalAwal" className="block mb-0.5 text-sm font-medium text-blue-500">
              Pilih Tanggal Awal
            </label>
            <div className="relative">
              <input
                type="date"
                id="tanggalAwal"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={tanggalAwal}
                onChange={(e) => setTanggalAwal(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="col-span-2 md:col-span-1">
            <label htmlFor="tanggalAkhir" className="block mb-0.5 text-sm font-medium text-blue-500">
              Pilih Tanggal Akhir
            </label>
            <div className="relative">
              <input
                type="date"
                id="tanggalAkhir"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={tanggalAkhir}
                onChange={(e) => setTanggalAkhir(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className={`mb-2 grid gap-2 ${menu === 'unduh' ? 'grid-cols-1' : 'grid-cols-2'}`}>
          <div className="col-span-2 md:col-span-1">
            <label htmlFor="pasar" className="block mb-0.5 text-sm font-medium text-blue-500">
              Pilih Pasar
            </label>
            <select
              id="pasar"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={pasar}
              onChange={handlePasarChange}
            >
              <option value="">Semua Pasar</option>
              <option value="98">Pasar Baru Tuban</option>
              <option value="99">Pasar Bangilan</option>
              <option value="100">Pasar Jatirogo</option>
            </select>
          </div>
          {menu === 'tren' && (
            <div className="col-span-2 md:col-span-1">
              <label htmlFor="komoditi" className="block mb-0.5 text-sm font-medium text-blue-500">
                Pilih Komoditas
              </label>
              <select
                id="komoditi"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={komoditas}
                onChange={(e) => setKomoditas(e.target.value)}
              >
                <option value="">Semua Komoditas</option>
                {komoditasData.map((item, idx) => (
                  <option key={idx} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Mengunduh...' : 'Unduh Data'}
        </button>
        {error && <p className="text-red-500 mt-2">Terjadi kesalahan saat mengunduh data.</p>}
      </form>
    </div>
  );
};

export default UnduhMingguan;
