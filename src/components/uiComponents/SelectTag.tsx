'use client';
import React from 'react';
import Select, { SingleValue } from 'react-select';

import { OptionType } from '@/app/propTypes';

export type PropsType = {
  onChange: (value: string | number) => void;
  value: string | number | null;
  width?: string;
  options: OptionType[];
  placeholder: string;
  errorMessage?: string;
  paddingY?: string;
  isDisabled?: boolean;
};

const SelectTag = ({
  options,
  onChange,
  width = '100%',
  value,
  placeholder,
  errorMessage = '',
  paddingY = '',
  isDisabled = false,
}: PropsType) => {
  return (
    <div>
      <Select
        isDisabled={isDisabled}
        options={options}
        value={value ? { label: value, value: value } : null}
        placeholder={placeholder}
        onChange={(e: SingleValue<OptionType>) => {
          if (e) {
            onChange(e?.value);
          }
        }}
        styles={{
          input: (base) => ({
            ...base,
            'input:focus': {
              boxShadow: 'none',
            },
            width,
          }),
          control: (baseStyles) => ({
            ...baseStyles,
            borderColor: errorMessage ? 'red' : '#E3E7EF',
            paddingTop: paddingY,
            paddingBottom: paddingY,
            borderRadius: '8px',
            backgroundColor: isDisabled ? '#fff' : '#fff',
          }),
        }}
      />
      {errorMessage && (
        <p className='mt-2 text-sm text-red-600 dark:text-red-500'>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default SelectTag;
