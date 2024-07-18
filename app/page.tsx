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


function HomePage() {
  const [loading, setLoading] = useState(false);  
  const [data, setData] = useState<any[]>([]);
  const [pasar, setPasar] = useState('');
  const [tgl, setTgl] = useState('');

  const handleData = (getData) => {

    setLoading(true);
    setData(getData);    
    setLoading(false);
  }

  const handlePasar = (getPasar) => {
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

  const handleTgl = (getTgl) => {
    setTgl(getTgl);
  }


  return (
    <div className='min-h-screen bg-gray-200 p-5'>
      

      {/* <CardMarquee /> */}
      {/* <Marquee key={key} velocity={25}>
        {times(7, Number).map(id => (
          <CardMarquee key={`marquee-example-people-${id}`} />
        ))}
      </Marquee> */}
      <div className='grid grid-cols-3 gap-5 py-5'>

        <div className='col-span-3 md:col-span-1 flex flex-col gap-4'>
          <HargaForm handleData={handleData} handlePasar={handlePasar} handleTgl = {handleTgl}/>
          <UnduhMingguan />
        </div>

        <div className='col-span-3 md:col-span-2'>
          <div className='bg-white rounded-2xl shadow-md p-5'>
            {data.length == 0 && (

              <div className="p-4 text-sm text-blue-800 rounded-lg bg-blue-50" role="alert">
                <span className="font-medium">Perhatian!</span> Silakan lakukan filter terlebih dahulu untuk menampilkan data
              </div>
            )}

            {data.length > 0 && (
              <>
               {loading ? <p>Loading...</p> : <>
              <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
                <span className="font-medium">Berhasil!</span> Berikut data harga <span>{pasar}</span> pada tanggal <span>{tgl}</span>
              </div>
              <ProductTable data={data} />
              </>}
              </>
            )}
            

          </div>
        </div>

       
      </div>
      
    </div>
  )
}

export default HomePage
