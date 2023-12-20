'use client';
import { useEffect, useState } from 'react';

import Spinner from '@/components/Spinner';
import Feedback from '@/components/wpcasOverView/Feedback';
import ProfileNavbar from '@/components/wpcasOverView/ProfileNavbar';
import UserTable from '@/components/wpcasOverView/UserTable';

import { getUserList } from '@/services/configurationServices';

export type SearchInputType = {
  user: string;
  department: number | string;
};

type UserListType = {
  userId: string;
  userName: string;
  wpcasScore: string;
  surveysFilled: number;
  surveysToBeFilled: number;
  dateOfJoining: Date;
  isNewEmployee: boolean;
  designation: string;
  isAdmin: boolean;
  profilePicture: string;
};

type HomeScreenDataType = {
  users: UserListType[];
  surveyData: {
    totalSurveys: number;
    totalSurveysFilled: number;
    totalSurveysToBeFilled: number;
  };
};

const Wpcas = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState<HomeScreenDataType>();
  const [filterUserData, setFilterUserData] = useState<UserListType[]>([]);

  const userList: UserListType[] = userData?.users ?? [];

  useEffect(() => {
    (async () => {
      try {
        const data = await getUserList();
        setLoading(false);
        setUserData(data);
        setFilterUserData(data?.users);
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
    <div className='w-full bg-[#f7f9fc]'>
      <ProfileNavbar heading='WPCAS' />
      {loading && (
        <div className='mt-[100px] text-center'>
          <Spinner />
        </div>
      )}
      {error && <div className='mt-[100px] text-center'>Error...</div>}
      {!loading && !error && (
        <div className='mb-[110px] px-[40px] pb-[10px] pt-[30px]'>
          <Feedback surveyData={userData?.surveyData} />
          <UserTable
            userData={userList}
            filterUserData={filterUserData}
            setFilterUserData={(value) => setFilterUserData(value)}
          />
        </div>
      )}
    </div>
  );
};

export default Wpcas;
