'use client';

import Link from 'next/link';
import React, { useState } from 'react';

import { outfit } from '@/components/FontFamily';
import Pagination from '@/components/wpcasOverView/Pagination';
import SearchUser from '@/components/wpcasOverView/SearchUser';

import { UserWalletDataType } from '@/app/user-management/user-wallet/page';

type PropType = {
  userData: UserWalletDataType[];
  filterUserData: UserWalletDataType[];
  setFilterUserData: (arg: UserWalletDataType[]) => void;
};

const UserWalletTable = ({
  userData,
  setFilterUserData,
  filterUserData,
}: PropType) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchInput, setSearchInput] = useState<string>('');

  const totalPages = Math.ceil(filterUserData?.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filterUserData?.slice(startIndex, endIndex);

  const handleSearch = (value: string) => {
    const newData = userData?.filter((item) => {
      const nameMatch = item?.name?.toLowerCase().includes(value.toLowerCase());
      return nameMatch;
    });
    setSearchInput(value);
    setFilterUserData(newData);
    if (currentPage != 1) setCurrentPage(1);
  };

  return (
    <>
      <SearchUser
        value={searchInput}
        onChange={(value) => handleSearch(value)}
        placeholder='Search User Name'
      />
      <div className='relative overflow-x-auto shadow-md sm:rounded-md'>
        <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
          <thead
            className={`bg-[#26292D] text-sm font-normal text-white ${outfit.className}`}
          >
            <tr>
              <th scope='col' className='px-6 py-3 text-sm font-normal'>
                User Id
              </th>
              <th scope='col' className='px-6 py-3 text-sm font-normal'>
                User Name
              </th>
              <th scope='col' className='px-6 py-3 text-sm font-normal'>
                Role
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-center text-sm font-normal'
              >
                Course Purchased
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-center text-sm font-normal'
              >
                Wallet Balance
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-center text-sm font-normal'
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData?.length == 0 && (
              <tr
                className={`border-b bg-white hover:bg-gray-50 ${outfit.className}`}
              >
                <td
                  align='center'
                  colSpan={6}
                  className={` px-6 py-3 text-center text-sm  font-normal text-[#272728]`}
                >
                  No Result Found
                </td>
              </tr>
            )}
            {currentData?.length > 0 &&
              currentData?.map((user: UserWalletDataType) => {
                return (
                  <tr
                    key={user?.consumerId}
                    className={`border-b bg-white hover:bg-gray-50 ${outfit.className}`}
                  >
                    <td className='px-6 py-[7px] text-sm font-normal text-[#272728]'>
                      {user?.consumerId ?? '--'}
                    </td>
                    <td className='px-6 py-[7px] text-sm font-normal text-[#272728]'>
                      {user?.name ?? '--'}
                    </td>
                    <td className='px-6 py-[7px] text-sm font-normal text-[#272728]'>
                      {user?.role ?? '--'}
                    </td>

                    <td className='px-6 py-[7px] text-center text-sm font-normal text-[#272728]'>
                      {user?.numCoursesPurchased ?? '--'}
                    </td>
                    <td className='px-6 py-[7px] text-center text-sm font-normal text-[#272728]'>
                      {user?.credits ?? '--'}
                    </td>
                    <td className='flex justify-center px-6 py-[7px] text-sm font-normal text-[#272728]'>
                      <Link
                        className='box-border block rounded-md border bg-[#385B8B] px-4 py-2 text-base font-semibold text-white hover:opacity-80'
                        href={{
                          pathname: `/user-management/user-wallet/${user?.consumerId}`,
                        }}
                      >
                        Add/view wallet
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <Pagination
          currentDataLength={currentData?.length}
          handlePageSize={(value: number) => setPageSize(value)}
          pageSize={pageSize}
          totalPages={totalPages}
          currentPage={currentPage}
          handlePage={(value: number) => setCurrentPage(value)}
        />
      </div>
    </>
  );
};

export default UserWalletTable;
