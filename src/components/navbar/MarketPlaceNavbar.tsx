'use client';

import { usePathname } from 'next/navigation';

import { outfit } from '@/components/FontFamily';

const MarketPlaceNavbar = ({
  activeSection,
  setActiveSection,
}: {
  activeSection: string;
  setActiveSection: (value: string) => void;
}) => {
  const pathname = usePathname();
  const isAccountVerificationPage = pathname?.includes('/account-verification');

  const handleClick = (type: string) => {
    if (isAccountVerificationPage && type === 'ACCEPTED') {
      setActiveSection('VERIFIED');
    } else {
      setActiveSection(type);
    }
  };
  return (
    <div
      className={`border-[#ECECEC]' mx-[30px] mt-5 flex justify-between border-b-2 ${outfit.className}`}
    >
      <div className='flex  gap-5'>
        <div
          className={`flex justify-center px-2.5 pb-4 pt-2.5 align-middle ${
            activeSection === 'PENDING' ? 'border-b-[3px] border-black' : ''
          } `}
        >
          <nav
            className={`cursor-pointer text-[20px] font-semibold  ${
              activeSection == 'PENDING' ? 'text-[#272728]' : 'text-[#65758C]'
            }`}
            onClick={() => handleClick('PENDING')}
          >
            Approval Pending
          </nav>
        </div>
        <div
          className={`flex justify-center px-2.5 pb-4 pt-2.5 align-middle ${
            activeSection == 'ACCEPTED' || activeSection == 'VERIFIED'
              ? 'border-b-[3px] border-black'
              : ''
          } `}
        >
          {' '}
          <nav
            className={`cursor-pointer text-[20px] font-semibold  ${
              activeSection == 'ACCEPTED' || activeSection == 'VERIFIED'
                ? 'text-[#272728]'
                : 'text-[#65758C]'
            }`}
            onClick={() => handleClick('ACCEPTED')}
          >
            Approved {isAccountVerificationPage ? '3CP' : 'Courses'}
          </nav>
        </div>
        <div
          className={`flex justify-center px-2.5 pb-4 pt-2.5 align-middle ${
            activeSection == 'REJECTED' && 'border-b-[3px] border-black'
          } `}
        >
          {' '}
          <nav
            className={`cursor-pointer text-[20px] font-semibold  ${
              activeSection == 'REJECTED' ? 'text-[#272728]' : 'text-[#65758C]'
            }`}
            onClick={() => handleClick('REJECTED')}
          >
            Rejected {isAccountVerificationPage ? '3CP' : 'Courses'}
          </nav>
        </div>
      </div>
    </div>
  );
};
export default MarketPlaceNavbar;
