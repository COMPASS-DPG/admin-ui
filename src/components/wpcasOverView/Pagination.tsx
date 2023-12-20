import React, { useState } from 'react';
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import { toast } from 'react-toastify';

type PropsType = {
  handlePageSize: (value: number) => void;
  pageSize: number;
  totalPages: number;
  currentPage: number;
  handlePage: (value: number) => void;
  currentDataLength: number;
};

const Pagination = ({
  currentDataLength,
  handlePageSize,
  pageSize,
  totalPages,
  currentPage,
  handlePage,
}: PropsType) => {
  const [pageNumber, setPageNumber] = useState('');

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      if (parseInt(pageNumber) <= totalPages) {
        handlePage(parseInt(pageNumber));
        setPageNumber('');
      } else {
        toast.error(`page ${pageNumber} not found`);
      }
    }
  };

  const handleSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handlePageSize(parseInt(e?.target?.value));
    handlePage(1);
  };

  return (
    <div className='flex items-center justify-between bg-white p-2'>
      <div>
        <select
          className='block w-[150px] rounded-lg border border-gray-300 bg-[#EEEEEE] px-2
           py-1 text-sm text-gray-900 focus:border-blue-400 focus:ring-blue-400'
          value={pageSize}
          onChange={handleSize}
        >
          {[5, 10, 15, 20].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div className='flex items-center justify-between gap-4 '>
        <button
          className='cursor-pointer rounded-full bg-[#EEEEEE] p-2 hover:bg-gray-200'
          disabled={currentPage <= 1}
          onClick={() => handlePage(currentPage - 1)}
        >
          <MdOutlineKeyboardArrowLeft className='w-[18px]' />
        </button>
        <div>
          Result {pageSize * currentPage - pageSize + 1}-
          {currentPage === totalPages
            ? pageSize * currentPage - pageSize + currentDataLength
            : pageSize * currentPage}{' '}
          of {totalPages}
        </div>
        <button
          className='cursor-pointer rounded-full bg-[#EEEEEE] p-2  hover:bg-gray-200'
          disabled={currentPage >= totalPages}
          onClick={() => handlePage(currentPage + 1)}
        >
          <MdOutlineKeyboardArrowRight className='w-[18px]' />
        </button>
      </div>
      <div>
        <span>Go to: </span>
        <input
          type='number'
          onWheel={(e) => e?.currentTarget?.blur()}
          className='w-[80px] rounded-lg border border-gray-300 bg-[#EEEEEE] px-2 py-1 text-sm text-gray-900'
          placeholder='EG:14'
          value={pageNumber}
          onChange={(e) => setPageNumber(e?.target?.value)}
          onKeyUp={(e) => handleSearch(e)}
        />
      </div>
    </div>
  );
};

export default Pagination;
