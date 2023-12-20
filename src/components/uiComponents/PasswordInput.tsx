import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { TiLockClosed } from 'react-icons/ti';

type PropType = {
  width: string;
  placeholder: string;
  required?: boolean;
  onChange: (arg: string) => void;
  value: string;
  isConfirmPassword?: boolean;
  errorMessage?: string;
};

const PasswordInput = ({
  width,
  placeholder,
  required = false,
  onChange,
  value,
  isConfirmPassword = false,
  errorMessage = '',
}: PropType) => {
  const [isPassword, setIsPassword] = useState(true);

  return (
    <>
      <div
        className={`flex border border-solid p-[2px] ${
          errorMessage ? 'border-red-500' : 'border-gray-300'
        }  items-center justify-between rounded-md focus:outline-blue-400 focus:ring-blue-400`}
      >
        <input
          style={{ width: width }}
          type={isPassword ? 'password' : 'text'}
          className={`block border-0 bg-white py-2.5 pr-[70px] text-sm text-gray-900 placeholder:font-medium placeholder:text-[#909090] focus:outline-none focus:ring-0 active:right-0
        `}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={(e) => onChange(e?.target?.value)}
        />
        <div
          className='items-right cursor-pointer pr-3'
          onClick={() => !isConfirmPassword && setIsPassword((pre) => !pre)}
        >
          {isConfirmPassword ? (
            <TiLockClosed
              size={24}
              className={`${errorMessage && 'text-red-500'}`}
            />
          ) : isPassword ? (
            <div className='cursor-pointer p-1'>
              <AiOutlineEye
                size={24}
                className={`${errorMessage && 'text-red-500'}`}
              />
            </div>
          ) : (
            <div className='cursor-pointer p-1 '>
              <AiOutlineEyeInvisible
                size={24}
                className={`${errorMessage && 'text-red-500'}`}
              />
            </div>
          )}
        </div>
      </div>
      {errorMessage && (
        <p className='mt-2 text-sm text-red-600 dark:text-red-500'>
          {errorMessage}
        </p>
      )}
    </>
  );
};

export default PasswordInput;
