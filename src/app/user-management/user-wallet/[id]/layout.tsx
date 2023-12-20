'use client';
import * as React from 'react';

import TopNavbar from '@/components/navbar/TopNavbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-[#F7F9FC]'>
      <TopNavbar menu='Add to Wallet' />
      {children}
    </div>
  );
}
