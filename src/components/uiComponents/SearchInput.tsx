'use client';
import React from 'react';

type PropsType = {
  onChange: (value: string) => void;
  value: string;
  placeholder: string;
  required?: boolean;
};

const SearchInput = ({
  value,
  placeholder,
  required = false,
  onChange,
}: PropsType) => {
  return (
    <div className='relative'>
      <div className='pointer-events-none absolute inset-y-0 left-0 top-0 flex items-center pl-3'>
        <svg
          className='h-4 w-4 text-gray-500 dark:text-gray-400'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 20 20'
        >
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
          />
        </svg>
      </div>
      <input
        type='search'
        className='block w-[320px] rounded-lg 
        border border-[#E3E7EF] bg-white py-2.5 pl-10 text-sm  text-gray-900 placeholder:text-[16px] placeholder:font-normal placeholder:text-[#787777]
         focus:ring-blue-400 md:w-[450px]'
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(e) => onChange(e?.target?.value)}
      />
    </div>
  );
};

export default SearchInput;
