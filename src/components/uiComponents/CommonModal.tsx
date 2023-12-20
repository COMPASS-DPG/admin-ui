import React from 'react';
import { RxCross2 } from 'react-icons/rx';

type PropsType = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;

  width?: string;

  isCrossShow?: boolean;
};

const CommonModal = ({
  isOpen,
  onClose,
  children,
  width = 'w-[80%] max-w-3xl',

  isCrossShow = true,
}: PropsType) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none'>
      <div className='modal-backdrop fixed inset-0 bg-black opacity-50'></div>
      <div className={`relative mx-auto my-6 ${width}`}>
        <div className='modal-content rounded bg-white p-4 shadow-lg'>
          {isCrossShow && (
            <button
              className='modal-close absolute right-0 top-0 m-3'
              onClick={onClose}
            >
              <RxCross2 size={24} />
            </button>
          )}

          {children}
        </div>
      </div>
    </div>
  );
};

export default CommonModal;
