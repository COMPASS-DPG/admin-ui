import { useState } from 'react';
import { toast } from 'react-toastify';

import { outfit } from '@/components/FontFamily';
import ButtonFill from '@/components/uiComponents/ButtonFill';
import ButtonOutline from '@/components/uiComponents/ButtonOutline';

import { rejectAccount } from '@/services/accountVerficationServices';
import { rejectCourse } from '@/services/marketPlaceServices';

const RejectedReason = ({
  setShowReviewReasonPopUp,
  heading,
  id,
  fetchData,
  isCourse = false,
}: {
  setShowReviewReasonPopUp: (value: boolean) => void;
  heading?: string;
  id: string;
  fetchData: () => void;
  isCourse?: boolean;
}) => {
  const [text, setText] = useState('');
  const [error, setError] = useState<boolean>(false);

  const handleProceedButton = async () => {
    //call api to handle the proceed button
    if (!text) {
      setError(true);
      return;
    }
    try {
      if (id) {
        if (isCourse) {
          await rejectCourse(id, text);
          toast.success('course reject successfully');
        } else {
          await rejectAccount(id, text);
          toast.success('Provider account rejected successfully');
        }

        await fetchData();
        setShowReviewReasonPopUp(false);
      }
    } catch (error) {
      toast.error('somethings went wrong');
    }
  };
  return (
    <div className={`${outfit} mx-3 mt-2`}>
      <p className='mb-8 text-[20px] font-semibold leading-6 text-[#272728]'>
        {heading ? 'Account Rejection Reason' : 'Describe Rejection Reason'}
      </p>
      <div className='flex flex-col'>
        <label
          htmlFor=''
          className='mb-2 text-[14px] font-medium text-[#6F747E]'
        >
          Rejection Reason
        </label>
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setError(false);
          }}
          cols={30}
          rows={10}
          placeholder='Enter...'
          className={`rounded-lg border ${
            error ? 'border-[red]' : 'border-[#E3E7EF]'
          } border-[#E3E7EF] bg-[#fff] text-[16px] leading-5`}
        ></textarea>
        {error && (
          <div className='text-[14px] font-medium text-[red]'>
            Rejection Reason should not be Empty
          </div>
        )}
        <div className='mb-4 mt-6 flex gap-9'>
          <ButtonOutline
            classes='border-[#000] w-[150px]'
            onClick={() => setShowReviewReasonPopUp(false)}
          >
            Cancel
          </ButtonOutline>
          <ButtonFill
            classes='bg-[#000] text-[#fff] w-[150px]'
            onClick={handleProceedButton}
          >
            Proceed
          </ButtonFill>
        </div>
      </div>
    </div>
  );
};
export default RejectedReason;
