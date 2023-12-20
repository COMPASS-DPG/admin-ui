'use client';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import SideNavbar from '@/components/navbar/SideNavbar';
import ProfileNavbar from '@/components/wpcasOverView/ProfileNavbar';

import UserWalletContext from '@/app/context/UserWalletContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  const heading = 'User Wallet';
  const pathname = usePathname();
  return (
    <div className='flex'>
      <SideNavbar />
      <div className='w-screen bg-[#F7F9FC]'>
        <UserWalletContext>
          {pathname?.includes('/user-wallet/') ? (
            <>{children}</>
          ) : (
            <>
              <ProfileNavbar heading={heading} />
              {children}
            </>
          )}
        </UserWalletContext>
      </div>
    </div>
  );
}
