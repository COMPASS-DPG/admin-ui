import SingleAccount from '@/components/3cp/SingleAccount';

import { accountType } from '@/app/3cp/account-verification/page';

const AccountItems = ({
  activeSection,
  accountList,
  fetchData,
}: {
  activeSection: string;
  accountList: accountType[];
  fetchData: () => void;
}) => {
  return (
    <div className='mb-2 flex flex-col gap-2.5'>
      {accountList?.map((account) => {
        return (
          <SingleAccount
            key={account?.id}
            activeSection={activeSection}
            account={account}
            fetchData={fetchData}
          />
        );
      })}
    </div>
  );
};
export default AccountItems;
