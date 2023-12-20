'use client';
import Image from 'next/image';
import { FaUserEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

import ColoredText from '@/components/3cp/ColoredText';
import Competencies from '@/components/3cp/Competency';
import RejectSummary from '@/components/3cp/RejectSummary';
import { outfit } from '@/components/FontFamily';
import ButtonFill from '@/components/uiComponents/ButtonFill';
import ButtonOutline from '@/components/uiComponents/ButtonOutline';

import { CourseType } from '@/app/3cp/marketplace/page';
import { approveCourse } from '@/services/marketPlaceServices';

const ReviewCourse = ({
  activeSection,
  courseDetails,
  setShowPreviewPopUp,
  setShowReviewReasonPopUp,
  fetchData,
}: {
  activeSection: string;
  courseDetails: CourseType;
  setShowPreviewPopUp: (value: boolean) => void;
  setShowReviewReasonPopUp: (value: boolean) => void;
  fetchData: () => void;
}) => {
  const handleApprovedButton = async () => {
    try {
      await approveCourse(courseDetails?.courseId);
      fetchData();
      toast.success('course approved successfully');
      setShowPreviewPopUp(false);
    } catch (error) {
      toast.error('something went wrong');
    }
  };
  const handleRejectButton = () => {
    setShowReviewReasonPopUp(true);
    setShowPreviewPopUp(false);
  };

  return (
    <div
      className={`${outfit.className} max-h-[560px]	 w-[1000px] overflow-y-auto pr-2`}
    >
      <div className='mb-4 flex items-center gap-2'>
        <Image
          src={courseDetails?.providerLogo}
          alt='course provide image'
          width={40}
          height={40}
          className='rounded-3xl border border-[#E3E7EF]'
        />
        <p className='text-[15px] font-bold text-[#272728]'>
          {courseDetails?.providerName || '===='}
        </p>
      </div>
      <div className='flex gap-4'>
        {/* image */}
        <div className='flex flex-shrink-0 align-bottom '>
          <Image
            src={courseDetails?.imageLink}
            alt='course-image'
            width={170}
            height={170}
            className='rounded-xl'
          />
        </div>
        {/* centerItem */}
        <div className='flex flex-grow flex-col justify-between'>
          <p className='text-[16px] font-bold text-[#272728]'>
            {courseDetails?.title}
          </p>

          <div className='flex items-center gap-2 align-bottom'>
            <FaUserEdit />
            <p className='text-[14px] font-medium uppercase text-[#272728]'>
              {courseDetails?.author}
            </p>
          </div>
          <div className='flex justify-between'>
            <div className=' flex gap-2'>
              {courseDetails?.language?.map((item, index) => (
                <ColoredText
                  key={index}
                  text={item.charAt(0).toUpperCase() + item.slice(1)}
                  classes={`${
                    index % 2 == 0
                      ? 'bg-[#DAFFDA] text-[#4ACB5F]'
                      : 'bg-[#C7DEFF] text-[#385B8B]'
                  }`}
                />
              ))}
            </div>
            <div className='rounded-lg bg-[#FFECAA] px-3 py-0.5'>
              <p className='text-[16px] font-bold text-[#272728]'>
                Cr. {courseDetails?.credits}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* About Course */}
      <div>
        <p className='pt-5 text-[16px] font-semibold leading-6 text-[#272728]'>
          About Course
        </p>
        <p className='py-3 text-[16px] leading-6 text-[#65758C]'>
          {courseDetails?.description}
        </p>
      </div>
      {/* competency */}
      <div>
        <p className='pt-5 text-[16px] font-semibold leading-6 text-[#272728]'>
          Competencies
        </p>

        <Competencies courseDetails={courseDetails} />
      </div>
      {/* button */}

      {activeSection === 'REJECTED' ? (
        <div>
          <RejectSummary summary={courseDetails?.rejectionReason} />
        </div>
      ) : (
        activeSection === 'PENDING' && (
          <div className='flex gap-4'>
            <ButtonOutline
              onClick={handleRejectButton}
              classes='bg-[#FFE4E4] text-[#ED2B2B] w-[170px]'
            >
              Reject
            </ButtonOutline>
            <ButtonFill
              onClick={handleApprovedButton}
              classes='bg-[#7DCC8A] w-[170px]'
            >
              Confirm Approval
            </ButtonFill>
          </div>
        )
      )}
    </div>
  );
};
export default ReviewCourse;
