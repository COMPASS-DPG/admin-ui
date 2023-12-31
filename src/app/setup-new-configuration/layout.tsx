'use client';
import * as React from 'react';

import TopNavbar from '@/components/navbar/TopNavbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-screen bg-[#F7F9FC]'>
      <TopNavbar menu='WPCAS' />
      {children}
    </div>
  );
}
