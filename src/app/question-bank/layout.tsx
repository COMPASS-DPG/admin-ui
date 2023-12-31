'use client';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import TopNavbar from '@/components/navbar/TopNavbar';

import ContextWrapper from '@/app/context/ContextWrapper';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const createUrl =
    pathname?.includes('/create-question-bank') ||
    pathname?.includes('/edit-question-bank');

  const editUrl = pathname?.includes('/edit-question-bank');

  return (
    <ContextWrapper>
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
    </ContextWrapper>
  );
}
