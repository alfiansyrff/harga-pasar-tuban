
'use client';
import React, { useState } from 'react';
import downloadExcelFile from '../../helper/downloadMingguan';


interface UnduhMingguanProps {
  handleDataMingguan: (data: any[]) => void;
}


type DataMingguanItem = {
  tanggal: string;
  items: {
    name: string;
    currentPrice: string;
    yesterdayPrice: string;
    [key: string]: any; 
  }[];
};


const UnduhMingguan: React.FC<UnduhMingguanProps> = ({handleDataMingguan}) => {
  const [tanggalAwal, setTanggalAwal] = useState<string>('');
  const [tanggalAkhir, setTanggalAkhir] = useState<string>('');
  const [kabkota, setKabkota] = useState<string>('tubankab');
  const [pasar, setPasar] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [dataMingguan, setDataMingguan] = useState<DataMingguanItem[]>([]);

  const handlePasarChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPasar(e.target.value);
  };

  const getDateRangeArray = (startDate: string, endDate: string): string[] => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dateArray: string[] = [];

    for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
      dateArray.push(new Date(dt).toISOString().slice(0, 10));
    }
    return dateArray;
  };

  const fetchData = async () => {
    setLoading(true);
    setError(false);
  
    const dateArray = getDateRangeArray(tanggalAwal, tanggalAkhir);
  
    try {
      const results = await Promise.all(dateArray.map(async (tanggal) => {
        const response = await fetch('/api/scrape', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ tanggal, kabkota, pasar }),
        });
  
        if (!response.ok) {
          throw new Error('Gagal');
        }
  
        const data = await response.json();
        return { tanggal, items: data.items };
      }));
  
      const aggregatedData = {};
      results.forEach(result => {
        result.items.forEach(item => {
          if (!aggregatedData[item.name]) {
            aggregatedData[item.name] = { currentPrices: [], yesterdayPrices: [] };
          }
          aggregatedData[item.name].currentPrices.push(parseFloat(item.currentPrice.replace(",", "")));
          aggregatedData[item.name].yesterdayPrices.push(parseFloat(item.yesterdayPrice.replace(",", "")));
        });
      });
  
      const averagedData = Object.keys(aggregatedData).map(name => {
        const currentPrices = aggregatedData[name].currentPrices;
        const yesterdayPrices = aggregatedData[name].yesterdayPrices;
        const currentPriceSum = currentPrices.reduce((sum, price) => sum + price, 0);
        const yesterdayPriceSum = yesterdayPrices.reduce((sum, price) => sum + price, 0);
        const count = currentPrices.length;
  
        return {
          name,
          currentPrice: (currentPriceSum / count).toFixed(3),
          yesterdayPrice: 0,
          satuan: "",
          perubahanRp: "",
          persentasePerubahan: "",
          // harga_rerata: (currentPriceSum / count).toFixed(3),
        };
      });
  
      results.push({ tanggal: 'Rata-rata', items: averagedData });
  
      // return results;
      // downloadExcelFile(results);
  
      setLoading(false);
      setError(false);
  
      return results;
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
      setError(true);
    }
  };

  const donwloadData = async () => {
    const datas = await fetchData();
    if (datas) {
      downloadExcelFile(datas);
    }
  }

  const getDataMingguan = async () => {
    const datas = await fetchData();
    if (datas) {
      setDataMingguan(datas);
      handleDataMingguan(datas);
    }
  };

  
  

  return (
    <div>
      <form
        className='bg-white rounded-2xl shadow-md p-5'
        onSubmit={(e) => {
          e.preventDefault();
          // fetchData();
          donwloadData();
        }}
      >
        <h1 className='mb-4 border-b-2 text-xl border-blue-500'>Unduh Data Langsung</h1>
        <div className='mb-2 grid grid-cols-2 gap-2'>
          <div className='col-span-2 md:col-span-1'>
            <label htmlFor="tanggalAwal" className="block mb-2 text-sm font-medium text-blue-500">Pilih Tanggal Awal</label>
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

          <div className='col-span-2 md:col-span-1'>
            <label htmlFor="tanggalAkhir" className="block mb-2 text-sm font-medium text-blue-500">Pilih Tanggal Akhir</label>
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

        <div className='mb-4'>
          <label htmlFor="pasar" className="block mb-2 text-sm font-medium text-blue-500">Pilih Pasar</label>
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

        <div className='flex items-center gap-1 justify-end'>

        

        {loading ? (
            <button disabled type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
              <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
              </svg>
              Loading...
            </button>
          ) : (
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Unduh
            </button>
          )}

        {loading ? (
            <button disabled type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
              <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
              </svg>
              Loading...
            </button>
          ) : (
            <button type="button" onClick={getDataMingguan} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Tampilkan
            </button>
          )}

          
        </div>

        {error && <p className='text-red-500'>Terjadi Kesalahan. Silakan coba lagi</p>}
      </form>
    </div>
  );
}

export default UnduhMingguan;
