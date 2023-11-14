'use client';

import React, { useEffect, useState } from 'react';

import { outfit } from '@/components/FontFamily';
import Pagination from '@/components/wpcasOverView/Pagination';
import SearchUser from '@/components/wpcasOverView/SearchUser';

import { SearchInputType } from '@/app/wpcas/page';
import { getUserList } from '@/services/configurationServices';

type UserType = {
  userId: string;
  userName: string;
  department: string;
  wpcas: string;
  surveysFilled: number;
  surveyYetToFilled: number;
  dateOfJoining: Date;
  isNewEmployee: boolean;
  designation: string;
  departmentId: string;
  isAdmin: boolean;
};

const getEmptyValue = () => {
  return {
    user: '',
    department: '',
  };
};

const UserTable = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [originalUserData, setOriginalUserData] = useState<UserType[]>([]);
  const [filterUserData, setFilterUserData] = useState<UserType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const totalPages = Math.ceil(filterUserData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filterUserData.slice(startIndex, endIndex);

  // this is new section
  const [searchInput, setSearchInput] = useState<SearchInputType>(
    getEmptyValue()
  );

  const handleSearch = () => {
    const newData = originalUserData.filter((item) => {
      const nameMatch = item?.userName
        ?.toLowerCase()
        .includes(searchInput.user.toLowerCase());
      const departmentMatch =
        searchInput.department === '' ||
        item.departmentId === searchInput?.department;
      return nameMatch && departmentMatch;
    });
    setFilterUserData(newData);
    setCurrentPage(1);
    setSearchInput(getEmptyValue());
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getUserList();
        setLoading(false);
        setOriginalUserData(data);
        setFilterUserData(data);
      } catch (error) {
        // Handle any errors that occur during the API call
        // eslint-disable-next-line no-console
        console.error('API call error:', error);
        setLoading(false);
        setError(true);
      }
    })();
  }, []);

  return (
    <>
      <SearchUser
        value={searchInput}
        onChange={(value) => setSearchInput(value)}
        handleSearch={handleSearch}
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
                Department
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-center text-sm font-normal'
              >
                WPCAS
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-center text-sm font-normal'
              >
                Surveys Filled
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-center text-sm font-normal'
              >
                Survey yet to Filled
              </th>
              <th scope='col' className='px-6 py-3 text-sm font-normal'>
                Onboarding On
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr
                className={`border-b bg-white hover:bg-gray-50 ${outfit.className}`}
              >
                <td
                  align='center'
                  colSpan={7}
                  className={` px-6 py-[14px] text-center 
             text-sm  font-normal text-[#272728]`}
                >
                  Loading...
                </td>
              </tr>
            )}

            {error && (
              <tr
                className={`border-b bg-white hover:bg-gray-50 ${outfit.className}`}
              >
                <td
                  align='center'
                  colSpan={7}
                  className={` px-6 py-[14px] text-center 
             text-sm  font-normal text-[#272728]`}
                >
                  Loading...
                </td>
              </tr>
            )}

            {!loading &&
              !error &&
              currentData?.map((user: UserType) => {
                return (
                  <tr
                    key={user?.userId}
                    className={`border-b bg-white hover:bg-gray-50 ${outfit.className}`}
                  >
                    <td className='px-6 py-[14px] text-sm font-normal text-[#272728]'>
                      {user?.userId}
                    </td>
                    <td className='px-6 py-[14px] text-sm font-normal text-[#272728]'>
                      {user?.userName}
                    </td>
                    <td className='px-6 py-[14px] text-sm font-normal text-[#272728]'>
                      {user?.departmentId}
                    </td>
                    <td className='px-6 py-[14px] text-sm font-normal text-[#272728]'>
                      {user?.wpcas}
                    </td>

                    <td className='px-6 py-[14px] text-center text-sm font-normal text-[#272728]'>
                      {user?.surveysFilled}
                    </td>
                    <td className='px-6 py-[14px] text-center text-sm font-normal text-[#272728]'>
                      {user?.surveyYetToFilled}
                    </td>
                    <td className='px-6 py-[14px] text-center text-sm font-normal text-[#272728]'>
                      {new Date(user?.dateOfJoining).toLocaleDateString(
                        'en-GB'
                      )}
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

export default UserTable;
