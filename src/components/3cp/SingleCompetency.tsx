import { useState } from 'react';
import { BiSolidBarChartAlt2 } from 'react-icons/bi';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

import { outfit, poppins } from '@/components/FontFamily';

import { LevelsType } from '@/app/3cp/marketplace/page';

type CompetencyType = {
  name: string;
  levels: LevelsType[];
};
const SingleCompetency = ({ competency }: { competency: CompetencyType }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${outfit.className} mb-3 text-[#272728]`}>
      <div className=' rounded-lg border p-2'>
        <div className='flex justify-between'>
          <p className='text-[16px] font-medium leading-[18px]'>
            {competency?.name}
          </p>
          <div onClick={() => setOpen(!open)} className='cursor-pointer'>
            {open ? (
              <MdKeyboardArrowUp size='20px' />
            ) : (
              <MdKeyboardArrowDown size='20px' />
            )}
          </div>
        </div>
        {open && (
          <div>
            <div className='flex items-center gap-1 py-3'>
              <BiSolidBarChartAlt2 size='18px' />
              <p className={`${poppins.className} text-[14px] font-semibold`}>
                Level
              </p>
            </div>
            <ul className='flex flex-col gap-2 pl-2'>
              {competency?.levels?.length > 0 &&
                competency?.levels?.map((level) => {
                  return (
                    <li key={level?.id} className='flex items-start'>
                      &bull; {level?.name}
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
export default SingleCompetency;
