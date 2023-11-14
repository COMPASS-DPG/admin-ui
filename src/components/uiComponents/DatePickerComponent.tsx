'use client';

import React, { useRef } from 'react';
import DatePicker, { ReactDatePicker } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import DatePickerIcon from '~/svg/datePickerIcon.svg';

type PropType = {
  data: Date | null;
  isSelectStart?: boolean;
  isSelectEnd?: boolean;
  minDate?: Date | null;
  onChange: (arg: Date) => void;
  startDate?: Date | null;
  endDate?: Date | null;
  errorMessage?: string;
};

const DatePickerComponent = ({
  data,
  isSelectStart = false,
  isSelectEnd = false,
  minDate = null,
  onChange,
  startDate = null,
  errorMessage = '',
  endDate = null,
}: PropType) => {
  const datePickerRef = useRef<ReactDatePicker | null>(null);

  const handleIconClick = () => {
    datePickerRef?.current?.setOpen(true);
  };
  return (
    <div>
      <div
        className={`flex border border-solid ${
          errorMessage ? 'border-red-600' : 'border-gray-300'
        } rounded-md border-gray-300 px-[10px] focus-within:border-2 focus-within:border-blue-500`}
      >
        <DatePicker
          selected={data}
          onChange={(date: Date) => onChange(date)}
          dateFormat='dd/MM/yyyy'
          className='border-0 focus:ring-0'
          ref={datePickerRef}
          selectsEnd={isSelectEnd}
          selectsStart={isSelectStart}
          startDate={startDate}
          endDate={endDate}
          placeholderText='--Select--'
          minDate={minDate}
        />
        <DatePickerIcon
          className='w-[24px] cursor-pointer'
          onClick={handleIconClick}
        />
      </div>
      {errorMessage && (
        <p className='mt-2 text-sm text-red-600 dark:text-red-500'>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default DatePickerComponent;
