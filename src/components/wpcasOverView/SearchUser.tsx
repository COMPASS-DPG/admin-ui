'use client';
import React from 'react';

import SearchInput from '@/components/uiComponents/SearchInput';

type PropType = {
  value: string;
  onChange: (arg: string) => void;
  placeholder: string;
};

const SearchUser = ({ value, onChange, placeholder }: PropType) => {
  return (
    <div className='my-7 flex flex-wrap gap-2.5'>
      <SearchInput
        value={value}
        onChange={(updatedValue) => onChange(updatedValue)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchUser;
