'use client';
import * as React from 'react';

import SideNavbar from '@/components/navbar/SideNavbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex'>
      <SideNavbar />
      {children}
    </div>
  );
}
