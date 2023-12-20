'use client';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import AccountSection from '@/components/3cp/AccountSection';
import MarketPlaceNavbar from '@/components/navbar/MarketPlaceNavbar';
import Spinner from '@/components/Spinner';
import ProfileNavbar from '@/components/wpcasOverView/ProfileNavbar';

import { getAllProviders } from '@/services/accountVerficationServices';

export type accountType = {
  id: string;
  name: string;
  email: string;
  orgName: string;
  phone: string;
  paymentInfo: {
    IFSC: string;
    accNo: string;
    bankName: string;
    branchName: string;
    PANnumber: string;
    GSTnumber: string;
  };
  status: string;
  orgLogo?: string;
  rejectionReason: string;
  updatedAt: Date | undefined | string;
};

const AccountVerification = () => {
  const [activeSection, setActiveSection] = useState<string>('PENDING');
  const [currentAccountList, setCurrentAccountList] = useState<accountType[]>(
    []
  );
  const [AccountList, setAccountList] = useState<accountType[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await getAllProviders();
      setLoading(false);
      setAccountList(response);
    } catch (error) {
      setError(true);
      setLoading(false);
      toast.error('something went wrong');
      // Handle any errors that occur during the API call
      // eslint-disable-next-line no-console
      console.error('API call error:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const filterResult = AccountList.filter((account: accountType) => {
      return account.status === activeSection;
    });
    setCurrentAccountList(filterResult);
  }, [activeSection, AccountList]);

  return (
    <div className='w-full bg-[#f7f9fc]'>
      <ProfileNavbar heading='3CP-Account Verification' />
      {loading && (
        <div className='mt-[100px] text-center'>
          <Spinner />
        </div>
      )}

      {!loading && error && (
        <div className='mt-100 text-center text-[16px]'>Error...</div>
      )}
      {!loading && !error && (
        <>
          <MarketPlaceNavbar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
          <AccountSection
            activeSection={activeSection}
            accountList={currentAccountList}
            fetchData={fetchData}
          />
        </>
      )}
    </div>
  );
};
export default AccountVerification;
