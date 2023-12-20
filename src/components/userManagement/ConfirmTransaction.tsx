import React from 'react';
import { toast } from 'react-toastify';

import { outfit } from '@/components/FontFamily';
import ButtonFill from '@/components/uiComponents/ButtonFill';
import ButtonOutline from '@/components/uiComponents/ButtonOutline';

import {
  addCreditToUser,
  removeCreditFromUser,
} from '@/services/userWalletSevices';

const ConfirmTransaction = ({
  onClose,
  credit,
  isAddWallet,
  setFetchData,
  adminId,
  consumerId,
  setFetchTransactionData,
  setCreditsToEmpty,
}: {
  onClose: () => void;
  credit: string;
  isAddWallet: boolean;
  setFetchData: (value: boolean) => void;
  adminId: string;
  consumerId: string;
  setFetchTransactionData: (value: boolean) => void;
  setCreditsToEmpty: () => void;
}) => {
  const handleConfirmSettlement = async () => {
    try {
      const payload = { credits: parseInt(credit), consumerId: consumerId };
      if (isAddWallet) {
        await addCreditToUser(payload, adminId);
        toast.success('credits added successfully');
      } else {
        await removeCreditFromUser(payload, adminId);
        toast.success('credits removed successfully');
      }
      setFetchTransactionData(true);
      setFetchData(true);
      setCreditsToEmpty();
      onClose();
    } catch (error) {
      toast.error('something went wrong');
      // Handle any errors that occur during the API call
      // eslint-disable-next-line no-console
      console.error('API call error:', error);
    }
  };

  return (
    <div className={`${outfit.className}`}>
      <div className='mt-[40px] text-center text-2xl font-semibold text-black'>
        Confirm the Transaction
      </div>
      <div className='mt-[20px] text-center text-base text-[#272728]'>
        Are you sure want to {isAddWallet ? 'add' : 'remove'} {credit} Cr from
        this wallet
      </div>
      <div className='my-[40px] flex justify-center gap-6'>
        <ButtonOutline
          onClick={onClose}
          classes='border-[#000000] text-[#000000] w-[160px]'
        >
          Cancel
        </ButtonOutline>
        <ButtonFill
          onClick={handleConfirmSettlement}
          classes='bg-[#000000] w-[160px]'
        >
          Proceed
        </ButtonFill>
      </div>
    </div>
  );
};

export default ConfirmTransaction;
