'use client';
import { createContext, useContext, useEffect, useState } from 'react';

import { UserWalletDataType } from '@/app/user-management/user-wallet/page';
import { getUserWalletDetails } from '@/services/userWalletSevices';

import { useAuthContext } from './AuthContext';

interface UserWalletContextValue {
  setFilterUserData: (value: UserWalletDataType[]) => void;
  filterUserData: UserWalletDataType[];
  userData: UserWalletDataType[];
  loading: boolean;
  error: boolean;
  setFetchData: (value: boolean) => void;
}

const UserWalletProvider = createContext<UserWalletContextValue>({
  setFilterUserData: () => null,
  filterUserData: [],
  userData: [],
  loading: true,
  error: false,
  setFetchData: () => null,
});

const UserWalletContext = ({ children }: { children: React.ReactElement }) => {
  const { adminData } = useAuthContext();
  const [filterUserData, setFilterUserData] = useState<UserWalletDataType[]>(
    []
  );
  const [userData, setUserData] = useState<UserWalletDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fetchData, setFetchData] = useState(true);

  useEffect(() => {
    if (fetchData) {
      (async () => {
        try {
          const data = await getUserWalletDetails(adminData?.admin ?? '');
          setLoading(false);
          setFetchData(false);
          setUserData(data?.consumers);
          setFilterUserData(data?.consumers);
        } catch (error) {
          // Handle any errors that occur during the API call
          // eslint-disable-next-line no-console
          console.error('API call error:', error);
          setLoading(false);
          setError(true);
        }
      })();
    }
  }, [fetchData, adminData?.admin]);
  return (
    <UserWalletProvider.Provider
      value={{
        setFilterUserData,
        filterUserData,
        userData,
        loading,
        error,
        setFetchData,
      }}
    >
      {children}
    </UserWalletProvider.Provider>
  );
};

export const useUserWalletContext = () => useContext(UserWalletProvider);
export default UserWalletContext;
