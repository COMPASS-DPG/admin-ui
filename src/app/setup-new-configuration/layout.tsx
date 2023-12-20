'use client';
import * as React from 'react';

import SideNavbar from '@/components/navbar/SideNavbar';
import TopNavbar from '@/components/navbar/TopNavbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex'>
      <SideNavbar />
      <div className='w-screen bg-[#F7F9FC]'>
        <TopNavbar menu='WPCAS' />
        {children}
      </div>
    </div>
  );
}
