'use client'

import React, { useEffect, useState } from 'react'
import HargaForm from './components/form/hargaForm'
import ReactPaginate from 'react-paginate'
import ProductTable from './components/table/product';
import CardMarquee from './components/card/marquee';
import Marquee from "react-marquee-slider";
import styled from "styled-components";
import times from "lodash/times";
import UnduhMingguan from './components/form/unduhMingguan';
import BarChart from './components/chart/barChart';


function HomePage() {
  const [loading, setLoading] = useState(false);  
  const [data, setData] = useState<any[]>([]);
  const [pasar, setPasar] = useState('');
  const [tgl, setTgl] = useState('');

  const [dataMingguan, setDataMinguan] = useState<any[]>([]);
  const [isDataMingguanNewer, setIsDataMingguanNewer] = useState(false); 

  const handleData = (getData: any[]) => {
    
    setLoading(true);
    setData(getData);    
    setIsDataMingguanNewer(false);
    setLoading(false);
  }

  const handlePasar = (getPasar: string) => {
    switch (getPasar) {
      case '98':
        setPasar('Pasar Baru Tuban')
        break;
      case '99': 
        setPasar('Pasar Bangilan')
        break;
      case '100': 
        setPasar('Pasar Jatirogo')
        break;
      case '': 
        setPasar('Kabupaten Tuban')
        break;
      default:
        break;
    }
  }

  const handleTgl = (getTgl: string) => {
    setTgl(getTgl);
  }

  const handleDataMingguan = (getDataMingguan: any[]) => {
    setLoading(true);
    setDataMinguan(getDataMingguan);  
    setIsDataMingguanNewer(true); 
    setLoading(false);
  }


  return (
    <div className="min-h-screen bg-gray-200 p-5">
      <div className="grid grid-cols-3 gap-5 py-5">
        <div className="col-span-3 md:col-span-1 flex flex-col gap-4">
          <HargaForm handleData={handleData} handlePasar={handlePasar} handleTgl={handleTgl} />
          <UnduhMingguan handleDataMingguan={handleDataMingguan} />
        </div>
        <div className="col-span-3 md:col-span-2">
          <div className="bg-white rounded-2xl shadow-md p-5">
            {data.length === 0 && dataMingguan.length === 0 && (
              <div className="p-4 text-sm text-blue-800 rounded-lg bg-blue-50" role="alert">
                <span className="font-medium">Perhatian!</span> Silakan lakukan filter terlebih dahulu untuk menampilkan data
              </div>
            )}
            {loading ? (
              <p>Loading...</p>
            ) : isDataMingguanNewer ? (
              dataMingguan.length > 0 && <BarChart />
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

export default HomePage
