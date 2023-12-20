import React from 'react';

import EmptyBox from '~/svg/emptyBox.svg';

const NoCoursesAdded = ({ text = 'No courses' }: { text?: string }) => {
  return (
    <div className='mx-7 flex flex-col items-center justify-center gap-2 pt-[170px]'>
      <EmptyBox width='160px' />
      <p className='font-outfit text-center text-base font-normal text-[#272728]'>
        {text}
      </p>
    </div>
  );
};

export default NoCoursesAdded;
