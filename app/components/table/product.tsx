
import React, { useState } from 'react';
import { Item } from '../../types';
import ReactPaginate from 'react-paginate';
import IconChevronLeft from '../icons/chevron-left';
import IconChevronRight from '../icons/chevron-right';
import IconDownload from '../icons/download';
import generateExcelData from '../../helper/ExcelDataGenerator';
import downloadExcelFile from '../../helper/downloadExcel';

interface ProductTableProps {
  data: Item[];
}

const ProductTable: React.FC<ProductTableProps> = ({ data }) => {

  const [currentPage, setCurrentPage] = useState(0);
  const maxPerPage = 10;

  const offset = maxPerPage * currentPage;
  const pageData = data.slice(offset, offset + maxPerPage);
  const pageCount = Math.ceil(data.length / maxPerPage);

  const handleClick = ({selected} : {selected: number}) => {
    setCurrentPage(selected);
  }
  
  return (
    <div className="relative overflow-x-auto">

      {pageData.length > 0 && (
        <div>
          <button type="button" onClick={() => downloadExcelFile(data)} className="py-2.5 px-5 me-2 mb-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 flex items-center gap-2">
            <IconDownload />  
            Unduh
          </button>
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nama Bahan Pokok
                </th>
                <th scope="col" className="px-6 py-3">
                  Satuan
                </th>
                <th scope="col" className="px-6 py-3">
                  Harga Kemarin
                </th>
                <th scope="col" className="px-6 py-3">
                  Harga Sekarang
                </th>
                <th scope="col" className="px-6 py-3">
                  Perubahan (Rp)
                </th>
                <th scope="col" className="px-6 py-3">
                  Perubahan (%)
                </th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {item.name}
                  </th>
                  <td className="px-6 py-4">{!item.satuan? '-' : item.satuan}</td>
                  <td className="px-6 py-4">{!item.yesterdayPrice  ? '-' : item.yesterdayPrice}</td>
                  <td className="px-6 py-4">{!item.currentPrice ? '-' : item.currentPrice}</td>
                  <td className="px-6 py-4">{!item.perubahanRp ? '-' : item.perubahanRp}</td>
                  <td className="px-6 py-4 text-center">
                    {!item.persentasePerubahan ? '-' : (
                      (item.persentasePerubahan == '0,00%' || (item.persentasePerubahan == '-')) ? (
                        <div className="text-gray-700 bg-gray-700 bg-opacity-10 rounded-full p-1">{item.persentasePerubahan}</div>
                      ) : (
                        item.persentasePerubahan[0] === '-' ? (
                          <div className="text-green-500 bg-green-500 bg-opacity-10 rounded-full p-1">{item.persentasePerubahan}</div>
                        ) : (
                          <div className="text-red-500 bg-red-500 bg-opacity-10 rounded-full p-1">{item.persentasePerubahan}</div>
                        )
                      )
                    )}
                  </td>

                </tr>   
              ))}
            </tbody>
          </table>

          <ReactPaginate
            previousLabel={<IconChevronLeft />}
            nextLabel={<IconChevronRight />}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handleClick}
            containerClassName={'flex items-center justify-end mt-4 mb-2'}
            pageClassName={'mx-1'}
            previousClassName={''}
            nextClassName={''}
            breakClassName={''}
            activeClassName={'text-blue-500'}
            previousLinkClassName={'flex items-center rounded-full bg-gray-200 p-1.5'}
            nextLinkClassName={'flex items-center rounded-full bg-gray-200 p-1.5'}
            pageLinkClassName={'px-2 py-1 border border-gray-300 rounded'}
            breakLinkClassName={'px-2 py-1 border border-gray-300 rounded'}
            activeLinkClassName={'bg-blue-500 bg-opacity-20'}
          />
        </div>
      )}
      
    </div>
  
  );
};

export default ProductTable;
