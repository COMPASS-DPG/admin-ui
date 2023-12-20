import Image from 'next/image';
import { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { FaUserEdit } from 'react-icons/fa';

import ColoredText from '@/components/3cp/ColoredText';
import RejectedReason from '@/components/3cp/RejectedReason';
import ReviewCourse from '@/components/3cp/ReviewCourse';
import ButtonFill from '@/components/uiComponents/ButtonFill';
import CommonModal from '@/components/uiComponents/CommonModal';

import { CourseType } from '@/app/3cp/marketplace/page';

const SingleCourse = ({
  activeSection,
  course,
  fetchData,
}: {
  activeSection: string;
  course: CourseType;
  fetchData: () => void;
}) => {
  const [showReviewPopUp, setShowPreviewPopUp] = useState(false);
  const [showReviewReasonPopUp, setShowReviewReasonPopUp] = useState(false);

  return (
    <div className='mb-4 rounded-2xl bg-white p-2.5'>
      {/* Review Courses PopUp */}

      <CommonModal
        width='1000px'
        isOpen={showReviewPopUp}
        onClose={() => setShowPreviewPopUp(false)}
      >
        <ReviewCourse
          courseDetails={course}
          setShowPreviewPopUp={setShowPreviewPopUp}
          activeSection={activeSection}
          setShowReviewReasonPopUp={setShowReviewReasonPopUp}
          fetchData={fetchData}
        />
      </CommonModal>
      {/* <RejectedReason popup /> */}
      <CommonModal
        isOpen={showReviewReasonPopUp}
        onClose={() => setShowReviewReasonPopUp(false)}
      >
        <RejectedReason
          setShowReviewReasonPopUp={setShowReviewReasonPopUp}
          id={course?.courseId}
          fetchData={fetchData}
          isCourse={true}
        />
      </CommonModal>

      <div className='flex gap-4'>
        {/* image */}
        <div className='flex flex-shrink-0 align-bottom '>
          <Image
            src={course?.imageLink}
            alt='course-image'
            width={100}
            height={150}
            className='rounded-xl'
          />
        </div>
        <div className='flex flex-grow flex-col justify-between'>
          <div>
            <p className='pb-2 text-[16px] font-bold text-[#272728]'>
              {course?.title}
            </p>
            <div className='pl-6 '>
              <ol className='grid  list-decimal grid-cols-2 text-[14px] text-[#787878] '>
                {course?.competency?.length > 0 &&
                  course?.competency?.map((competency) => {
                    return (
                      <li key={competency?.id}>
                        {competency?.name}{' '}
                        {competency?.levels?.map((level) => {
                          return `L${level?.levelNumber},`;
                        })}
                      </li>
                    );
                  })}
              </ol>
            </div>
          </div>
          <div>
            <div className='mt-2 flex items-end gap-3 align-bottom'>
              <div className='flex items-end gap-1'>
                <Image
                  src={course?.providerLogo}
                  alt='course provide image'
                  width={35}
                  height={30}
                  className='rounded-3xl border border-[#E3E7EF]'
                />
                <p className='text-[15px] font-bold text-[#272728]'>
                  {course?.providerName}
                </p>
              </div>
              <div className='flex items-center gap-1'>
                <FaUserEdit />
                <p className='text-[14px] font-medium uppercase text-[#272728]'>
                  {course?.author}
                </p>
              </div>
              <div className='flex gap-1'>
                {course?.language?.map((item, index) => (
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
            </div>
          </div>
        </div>
        {/* three dot */}
        <div className='relative flex flex-col items-end justify-between'>
          <div className='flex w-full justify-end gap-4'>
            {activeSection === 'ACCEPTED' && (
              <p className='flex items-center gap-1 text-[14px] font-bold leading-4 text-[#787878]'>
                {course?.avgRating && (
                  <>
                    {course?.avgRating}{' '}
                    <AiFillStar fill='#FFD029' width='12px' />
                  </>
                )}
              </p>
            )}
            <div className='rounded-lg bg-[#FFECAA] px-3 py-0.5'>
              <p className='text-[16px] font-bold text-[#272728]'>
                Cr.{course?.credits}
              </p>
            </div>
          </div>
          <div>
            <ButtonFill
              onClick={() => setShowPreviewPopUp(true)}
              classes='bg-[#26292D]'
            >
              Review the course
            </ButtonFill>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleCourse;
