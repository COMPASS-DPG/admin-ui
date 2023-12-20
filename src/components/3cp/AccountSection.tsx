import { useEffect, useState } from 'react';

import AccountItems from '@/components/3cp/AccountItems';
import { outfit } from '@/components/FontFamily';
import NoCoursesAdded from '@/components/uiComponents/NoCoursesAdded';
import SearchInput from '@/components/uiComponents/SearchInput';

import { accountType } from '@/app/3cp/account-verification/page';

const AccountSection = ({
  activeSection,
  accountList,
  fetchData,
}: {
  activeSection: string;
  accountList: accountType[];
  fetchData: () => void;
}) => {
  const [input, setInput] = useState<string>('');

  const [filterAccounts, setfilterAccounts] = useState<accountType[]>([]);

  const handleSearch = (value: string) => {
    const newData = accountList.filter((item) => {
      const nameMatch = item?.name?.toLowerCase().includes(value.toLowerCase());
      return nameMatch;
    });
    setInput(value);
    setfilterAccounts(newData);
  };

  useEffect(() => {
    setfilterAccounts(accountList);
  }, [accountList]);
  return (
    <div className={`mx-[30px] ${outfit.className}`}>
      {accountList.length !== 0 ? (
        <div className='mt-4'>
          {activeSection !== 'PENDING' && (
            <SearchInput
              value={input}
              onChange={(value: string) => handleSearch(value)}
              placeholder='Search Course Provider'
            />
          )}

          <p className='my-4 text-[18px] font-medium leading-5 text-[#65758C]'>
            {filterAccounts.length}{' '}
            {activeSection === 'PENDING'
              ? 'Onboard request'
              : 'Third Party Course Providers'}
          </p>
          <AccountItems
            activeSection={activeSection}
            accountList={filterAccounts}
            fetchData={fetchData}
          />
        </div>
      ) : (
        <NoCoursesAdded text='No Accounts' />
      )}
    </div>
  );
};
export default AccountSection;
