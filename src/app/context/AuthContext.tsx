'use client';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

export type AdminDataType = {
  admin: string;
  name: string;
  image: string;
};

interface AuthContextValue {
  adminData: AdminDataType | null;
  setAdminData: (arg: AdminDataType) => void;
}

const AuthProvider = createContext<AuthContextValue>({
  adminData: null,
  setAdminData: () => null,
});

const AuthContextContext = ({ children }: { children: React.ReactElement }) => {
  const [adminData, setAdminData] = useState<AdminDataType | null>(null);
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem('adminData') || '';
    let parseData = null;
    if (data !== '') {
      parseData = JSON.parse(data);
    }
    if (!parseData?.admin) {
      router.push('/login');
    } else {
      router.push('/3cp/marketplace');
      setAdminData(parseData);
    }
  }, [router]);

  return (
    <AuthProvider.Provider
      value={{
        adminData,
        setAdminData,
      }}
    >
      {children}
    </AuthProvider.Provider>
  );
};

export const useAuthContext = () => useContext(AuthProvider);
export default AuthContextContext;
