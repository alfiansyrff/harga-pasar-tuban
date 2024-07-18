import React from 'react';

function CardMarquee({nama, satuan, harga}) {
  return (
    <div className='w-[20em] h-[4em] bg-white rounded-2xl shadow-md border-l-4 border-blue-500 p-2'>
      <div className='flex flex-col pl-5'>
        <p className='overflow-hidden text-ellipsis whitespace-normal break-words text-gray-700'>
          {nama}<span>/{satuan}</span>
        </p>
        <p className='font-bold'>{harga}</p>
      </div>
    </div>
  );
}

export default CardMarquee;


