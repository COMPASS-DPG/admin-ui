'use client';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import SideNavbar from '@/components/navbar/SideNavbar';
import TopNavbar from '@/components/navbar/TopNavbar';

import QuestionBankContextWrapper from '@/app/context/QuestionBankContextWrapper';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const createUrl =
    pathname?.includes('/create-question-bank') ||
    pathname?.includes('/edit-question-bank');

  const editUrl = pathname?.includes('/edit-question-bank');

  return (
    <QuestionBankContextWrapper>
      <div className='flex'>
        <SideNavbar />
        <div className='w-screen bg-[#F7F9FC]'>
          <TopNavbar
            menu={`${
              createUrl
                ? editUrl
                  ? 'Edit Question Bank'
                  : 'Create Question Bank'
                : 'WPCAS'
            }`}
          />
          {children}
        </div>
      </div>
    </QuestionBankContextWrapper>
  );
}
