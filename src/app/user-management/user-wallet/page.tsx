'use client';
import React from 'react';

import Spinner from '@/components/Spinner';
import UserWalletTable from '@/components/userManagement/UserWalletTable';

import { useUserWalletContext } from '@/app/context/UserWalletContext';

export type UserWalletDataType = {
  consumerId: string;
  name: string;
  role: string;
  numCoursesPurchased: number;
  credits: string;
  profilePicture: string;
};

const Wallet = () => {
  const { userData, filterUserData, setFilterUserData, loading, error } =
    useUserWalletContext();

  return (
    <>
      {loading && (
        <div className='mt-[100px] text-center'>
          <Spinner />
        </div>
      )}
      {error && <div className='mt-[100px] text-center'>Error...</div>}
      {!loading && !error && (
        <div className='mb-[110px] px-[30px] py-[10px] '>
          <UserWalletTable
            userData={userData}
            filterUserData={filterUserData}
            setFilterUserData={(value) => setFilterUserData(value)}
          />
        </div>
      )}
    </>
  );
};

export default Wallet;
