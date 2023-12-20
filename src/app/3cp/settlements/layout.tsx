'use client';
import * as React from 'react';

import ProfileNavbar from '@/components/wpcasOverView/ProfileNavbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const heading = '3CP-Settlements';
  return (
    <div className='w-screen bg-[#F7F9FC]'>
      <ProfileNavbar heading={heading} />
      {children}
    </div>
  );
}
