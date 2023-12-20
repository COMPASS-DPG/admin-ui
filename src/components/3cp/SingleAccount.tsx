import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import RejectedReason from '@/components/3cp/RejectedReason';
import RejectSummary from '@/components/3cp/RejectSummary';
import { outfit } from '@/components/FontFamily';
import ButtonFill from '@/components/uiComponents/ButtonFill';
import ButtonOutline from '@/components/uiComponents/ButtonOutline';
import CommonModal from '@/components/uiComponents/CommonModal';

import { accountType } from '@/app/3cp/account-verification/page';
import { approvedAccount } from '@/services/accountVerficationServices';

// will format date
export const formatDate = (inputDate: string | Date) => {
  const date = typeof inputDate == 'string' ? new Date(inputDate) : inputDate;
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const SingleAccount = ({
  activeSection,
  account,
  fetchData,
}: {
  activeSection: string;
  account: accountType;
  fetchData: () => void;
}) => {
  const [showReviewReasonPopUp, setShowReviewReasonPopUp] = useState(false);

  const handleApprovedButton = async () => {
    try {
      await approvedAccount(account?.id);
      await fetchData();
      toast.success('Provider account approved successfully');
    } catch (error) {
      toast.error('something went wrong');
    }
  };

  return (
    <div
      className={`flex flex-col gap-[18px] rounded-2xl border border-[#EFEFEF] bg-[#fff] p-2.5 ${outfit.className}`}
    >
      <CommonModal
        isOpen={showReviewReasonPopUp}
        onClose={() => setShowReviewReasonPopUp(false)}
      >
        <RejectedReason
          setShowReviewReasonPopUp={setShowReviewReasonPopUp}
          heading='Account Rejection Reason'
          id={account?.id}
          fetchData={fetchData}
        />
      </CommonModal>
      {/* head line */}
      <div className='flex justify-between'>
        <div className='flex items-center gap-3'>
          <Image
            src={account?.orgLogo ?? ''}
            alt='course-provider-image'
            width={44}
            height={44}
            className='rounded-full border border-[#E3E7EF]'
          />
          <p className='text-[18px] font-bold text-[#272728]'>
            {account?.orgName}
          </p>
        </div>
        {activeSection === 'PENDING' ? (
          <div className='flex items-center gap-5'>
            <p className='text-[14px] text-[#272728]'>
              On {account?.updatedAt ? formatDate(account?.updatedAt) : '--'}
            </p>
            <ButtonOutline
              onClick={() => setShowReviewReasonPopUp(true)}
              classes='bg-[#FFE4E4] text-[#ED2B2B] w-[170px]'
            >
              Reject Account
            </ButtonOutline>
            <ButtonFill
              onClick={handleApprovedButton}
              classes='bg-[#7DCC8A] w-[170px]'
            >
              Approve Account
            </ButtonFill>
          </div>
        ) : (
          <div className='flex items-center justify-between'>
            <p
              className={`text-[14px] ${
                activeSection === 'REJECTED'
                  ? 'text-[#FF5674]'
                  : 'text-[#385B8B]'
              } `}
            >
              {activeSection === 'REJECTED' ? 'Rejected' : 'Approved'} On{' '}
              {account?.updatedAt ? formatDate(account?.updatedAt) : '--'}
            </p>
          </div>
        )}
      </div>
      {/* details */}
      <div className='mr-[200px] flex justify-between'>
        <div>
          <SingleDetail subHeading='Name of moderator'>
            {account?.name}
          </SingleDetail>
          <SingleDetail subHeading='Email Id'>{account?.email}</SingleDetail>
          <SingleDetail subHeading='Phone'>
            {account?.phone || '--'}
          </SingleDetail>
        </div>
        <div>
          <SingleDetail subHeading='Bank'>
            {account?.paymentInfo?.bankName || '--'}
          </SingleDetail>
          <SingleDetail subHeading='Branch'>
            {account?.paymentInfo?.branchName || '--'}
          </SingleDetail>
          <SingleDetail subHeading='Account Number'>
            {account?.paymentInfo?.accNo || '--'}
          </SingleDetail>
        </div>
        <div>
          <SingleDetail subHeading='IFSC Code'>
            {account?.paymentInfo?.IFSC || '--'}
          </SingleDetail>
          <SingleDetail subHeading='PAN Number'>
            {account?.paymentInfo?.PANnumber || '--'}
          </SingleDetail>
          <SingleDetail subHeading='GST Number'>
            {account?.paymentInfo?.GSTnumber || '--'}
          </SingleDetail>
        </div>
      </div>

      {activeSection === 'REJECTED' && (
        <div>
          <RejectSummary summary={account?.rejectionReason} />
        </div>
      )}
    </div>
  );
};

const SingleDetail = ({
  children,
  subHeading,
}: {
  children: React.ReactNode;
  subHeading: string;
}) => {
  return (
    <div className=' my-4 flex flex-col gap-1'>
      <p className='text-[14px] font-medium text-[#6F747E]'>{subHeading}</p>
      <p className='text-[16px] '>{children}</p>
    </div>
  );
};
export default SingleAccount;
