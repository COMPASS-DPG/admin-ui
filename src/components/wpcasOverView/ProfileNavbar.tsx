'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

import { outfit } from '@/components/FontFamily';
import { ADMIN_OPTIONS } from '@/components/SelectOptions';
import AdminSelect from '@/components/uiComponents/AdminSelect';

import { useAuthContext } from '@/app/context/AuthContext';

import BellLogo from '~/svg/bellLogo.svg';

const ProfileNavbar = ({ heading }: { heading?: string }) => {
  const { adminData } = useAuthContext();
  const router = useRouter();

  const handleLogout = (value: string) => {
    if (value == 'logout') {
      localStorage.removeItem('adminData');
      router.push('/login');
    }
  };

  return (
    <nav className='flex items-center justify-between bg-white px-[30px] '>
      <div className={`text-2xl font-semibold ${outfit.className}`}>
        {heading ? heading : 'WPCAS'}
      </div>
      <div className='flex gap-x-11'>
        <BellLogo className='w-[24px]' />
        <AdminSelect
          options={ADMIN_OPTIONS}
          onChange={handleLogout}
          placeholder={adminData?.name ? adminData?.name + '(admin)' : 'admin'}
          logo={adminData?.image ?? ''}
          value=''
        />
      </div>
    </nav>
  );
};

export default ProfileNavbar;
