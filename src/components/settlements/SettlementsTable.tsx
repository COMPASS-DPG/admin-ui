'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import { outfit } from '@/components/FontFamily';
import ConfirmSettlement from '@/components/settlements/ConfirmSettlement';
import ButtonFill from '@/components/uiComponents/ButtonFill';
import CommonModal from '@/components/uiComponents/CommonModal';
import Pagination from '@/components/wpcasOverView/Pagination';
import SearchUser from '@/components/wpcasOverView/SearchUser';

import { SettlementDataType } from '@/app/3cp/settlements/page';

import NoCoursesAdded from '../uiComponents/NoCoursesAdded';

type PropType = {
  userData: SettlementDataType[];
  filterUserData: SettlementDataType[];
  setFilterUserData: (arg: SettlementDataType[]) => void;
  adminId: string;
  setFetchData: (arg: boolean) => void;
};

const SettlementsTable = ({
  userData,
  setFilterUserData,
  filterUserData,
  adminId,
  setFetchData,
}: PropType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState<string>('');

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

  const handleSettlement = (id: string) => {
    setUserId(id);
    setIsOpen(true);
  };

  return (
    <>
      {userData?.length > 0 ? (
        <>
          <CommonModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            isCrossShow={false}
          >
            <ConfirmSettlement
              onClose={() => setIsOpen(false)}
              id={userId}
              adminId={adminId}
              setFetchData={setFetchData}
            />
          </CommonModal>
          <SearchUser
            value={searchInput}
            onChange={(value) => handleSearch(value)}
            placeholder='Search Course Provider'
          />
          <div className='relative overflow-x-auto shadow-md sm:rounded-md'>
            <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
              <thead
                className={`bg-[#26292D] text-sm font-normal text-white ${outfit.className}`}
              >
                <tr>
                  <th scope='col' className='px-6 py-3 text-sm font-normal'>
                    Sr No
                  </th>
                  <th scope='col' className='px-6 py-3 text-sm font-normal'>
                    Third Party Course Providers
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-center text-sm font-normal'
                  >
                    Total Courses
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-center text-sm font-normal'
                  >
                    Active Users
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-center text-sm font-normal'
                  >
                    Total Credits
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-sm font-normal'
                  ></th>
                </tr>
              </thead>
              <tbody>
                {currentData?.length > 0 ? (
                  currentData?.map(
                    (user: SettlementDataType, index: number) => {
                      return (
                        <tr
                          key={user?.id}
                          className={`border-b bg-white hover:bg-gray-50 ${outfit.className}`}
                        >
                          <td className='px-6 py-[7px] text-sm font-normal text-[#272728]'>
                            {index + 1}
                          </td>
                          <td className='px-6 py-[7px] text-sm font-normal text-[#272728]'>
                            <div className='flex items-center gap-2'>
                              <Image
                                src={user?.imageLink}
                                alt='img'
                                className='rounded-full'
                                width={25}
                                height={25}
                              />
                              {user?.name}
                            </div>
                          </td>
                          <td className='px-6 py-[7px] text-center text-sm font-normal text-[#272728]'>
                            {user?.totalCourses}
                          </td>

                          <td className='px-6 py-[7px] text-center text-sm font-normal text-[#272728]'>
                            {user?.activeUsers}
                          </td>
                          <td className='px-6 py-[7px] text-center text-sm font-normal text-[#272728]'>
                            {user?.totalCredits}
                          </td>
                          <td className='flex justify-end px-6 py-[7px] text-sm font-normal text-[#272728]'>
                            <ButtonFill
                              onClick={() => handleSettlement(user?.id)}
                              classes='bg-[#26292D]'
                            >
                              Settle
                            </ButtonFill>
                          </td>
                        </tr>
                      );
                    }
                  )
                ) : (
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
      ) : (
        <NoCoursesAdded text='No Settlements' />
      )}
    </>
  );
};

export default SettlementsTable;
