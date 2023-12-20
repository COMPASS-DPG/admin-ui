'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { outfit, oxanium } from '../../components/FontFamily';

import ThreeCPIcon from '~/svg/3cpIcon.svg';
import ListIcon from '~/svg/admin.svg';
import UserIcon from '~/svg/userIcon.svg';
import WpcasIcon from '~/svg/wpcasIcon.svg';

const SideNavbar = () => {
  const pathname = usePathname();
  return (
    <div className='sticky top-0 h-screen w-[250px] bg-[#26292D] text-white'>
      <div
        className={`text-white ${oxanium.className} mx-[22px] mt-[30px] text-3xl font-semibold`}
      >
        COMPASS
      </div>
      <nav className='mt-[80px]'>
        <ul className='flex-col gap-y-4 '>
          <li
            className={`flex items-center py-2.5 pl-4
                     text-base font-medium ${outfit.className}`}
          >
            <div className={`flex `}>
              <ThreeCPIcon className='mr-2 w-5' />
              3CP
            </div>
          </li>
          <li className={`text-base font-medium ${outfit.className}`}>
            <ul>
              <Link href='/3cp/marketplace'>
                <li
                  className={`my-2 flex py-2 pl-7 text-sm font-normal
                                  ${
                                    pathname?.includes('/marketplace') &&
                                    'bg-[#67696c]'
                                  }`}
                >
                  <ListIcon className='mr-2 w-3' />
                  Marketplace
                </li>
              </Link>
              <Link href='/3cp/settlements'>
                <li
                  className={`my-2 flex py-2 pl-7 text-sm font-normal
                                  ${
                                    pathname?.includes('/3cp/settlements') &&
                                    'bg-[#67696c]'
                                  }`}
                >
                  <ListIcon className='mr-2 w-3' />
                  Settlements
                </li>
              </Link>
              <Link href='/3cp/account-verification'>
                <li
                  className={`my-2 flex py-2 pl-7 text-sm font-normal
                                  ${
                                    pathname?.includes(
                                      '/account-verification'
                                    ) && 'bg-[#67696c]'
                                  }`}
                >
                  <ListIcon className='mr-2 w-3' />
                  Account Verification
                </li>
              </Link>
            </ul>
          </li>
          <li
            className={`flex cursor-pointer items-center py-2.5 pl-4
                     text-base font-medium ${outfit.className} ${
              pathname?.includes('/wpcas') && 'bg-[#67696c]'
            }`}
          >
            <Link href='/wpcas'>
              <div className={`flex `}>
                <WpcasIcon className='mr-2 w-5' />
                WPCAS Overview
              </div>
            </Link>
          </li>
          <li className={`text-base font-medium ${outfit.className}`}>
            <ul>
              <Link href='/setup-new-configuration'>
                <li
                  className={`my-2 flex py-2 pl-7 text-sm font-normal
                                  ${
                                    pathname?.includes(
                                      '/setup-new-configuration'
                                    ) && 'bg-[#67696c]'
                                  }`}
                >
                  <ListIcon className='mr-2 w-3' />
                  Setup New Survey
                </li>
              </Link>
              <Link href='/question-bank'>
                <li
                  className={`my-2 flex py-2 pl-7 text-sm font-normal
                                 ${
                                   (pathname?.includes('/question-bank') ||
                                     pathname?.includes(
                                       '/create-question-bank'
                                     )) &&
                                   'bg-[#67696c]'
                                 }`}
                >
                  <ListIcon className='mr-2 w-3' />
                  Question Bank
                </li>
              </Link>
            </ul>
          </li>
          <li
            className={`flex items-center py-2.5 pl-4
                     text-base font-medium ${outfit.className}`}
          >
            <div className={`flex `}>
              <UserIcon className='mr-2 w-5' />
              User Management
            </div>
          </li>
          <li className={`text-base font-medium ${outfit.className}`}>
            <ul>
              <Link href='/user-management/user-wallet'>
                <li
                  className={`my-2 flex py-2 pl-7 text-sm font-normal
                                  ${
                                    pathname?.includes('/user-wallet') &&
                                    'bg-[#67696c]'
                                  }`}
                >
                  <ListIcon className='mr-2 w-3' />
                  User Wallet
                </li>
              </Link>
            </ul>
          </li>
          {/* <NavbarLink currentRoute='/'>
            <UserIcon className='mr-2 w-5' /> User Information
          </NavbarLink>
          <NavbarLink currentRoute='/'>
            <WalletIcon className='mr-2 w-5' /> Payment
          </NavbarLink> */}
        </ul>
      </nav>
    </div>
  );
};

export default SideNavbar;
