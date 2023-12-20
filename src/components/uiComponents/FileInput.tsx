import React, { MutableRefObject, useRef } from 'react';

type PropType = {
  value: string | File;
  accept: string;
  onChange: (arg: File) => void;
  errorMessage?: string;
};

const FileInput = ({
  value,
  onChange,
  errorMessage = '',
  accept,
}: PropType) => {
  const fileInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

  const handleLabelClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        onChange(selectedFile);
      }
    }
  };

  return (
    <div>
      <input
        type='file'
        accept={accept}
        ref={fileInputRef}
        onChange={handleFileChange}
        className='hidden'
      />
      <div
        className={`border border-solid ${
          errorMessage ? 'border-red-500' : 'border-gray-300'
        } flex
         cursor-pointer items-center justify-between rounded-md`}
        onClick={handleLabelClick}
      >
        <span className='cursor-pointer pl-2 text-base font-normal text-gray-500'>
          {value && typeof value !== 'string'
            ? value?.name
            : 'choose file to upload'}
        </span>
        <span
          className={`text-left ${
            errorMessage && 'text-red-500'
          } cursor-pointer rounded-r-md bg-[#C3D0E3] p-2`}
        >
          Browse Files
        </span>
      </div>
      {errorMessage && (
        <p className='mt-2 text-sm text-red-600 dark:text-red-500'>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default FileInput;
