'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { validateLoginData } from '@/lib/helper';

import { outfit, oxanium } from '@/components/FontFamily';
import ButtonFill from '@/components/uiComponents/ButtonFill';
import InputTag from '@/components/uiComponents/InputTag';
import Label from '@/components/uiComponents/Label';
import PasswordInput from '@/components/uiComponents/PasswordInput';

import { loginAdmin } from '@/services/authService';

import { useAuthContext } from '../context/AuthContext';

const getEmptyData = () => {
  return {
    email: '',
    password: '',
  };
};

export type LoginDataType = {
  email: string;
  password: string;
};

export type LoginErrorType = {
  [key: string]: string;
  email: string;
  password: string;
};

const Login = () => {
  const { setAdminData } = useAuthContext();
  const [loginData, setLoginData] = useState<LoginDataType>(getEmptyData());
  const [error, setError] = useState<LoginErrorType>(getEmptyData());
  const router = useRouter();

  const handleError = (key: string, value: string) => {
    setError((pre) => {
      return {
        ...pre,
        [key]: value,
      };
    });
  };

  // will set email and will set email error to empty string
  const handleChange = (key: string, value: string) => {
    if (error?.[key])
      setError((pre) => {
        return { ...pre, [key]: '' };
      });
    setLoginData((pre) => {
      return {
        ...pre,
        [key]: value,
      };
    });
  };

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (validateLoginData(loginData, handleError)) {
      try {
        const data = await loginAdmin(loginData);
        localStorage.setItem('adminData', JSON.stringify(data));
        setAdminData(data);
        router.push('/3cp/marketplace');
        toast.success('login successful');
      } catch (error) {
        // Handle any errors that occur during the API call
        // eslint-disable-next-line no-console
        console.error('API call error:', error);
        toast.error('please enter valid email or password');
      }
    }
  };

  return (
    <div className={`flex ${outfit.className}`}>
      <form onSubmit={handleLogin}>
        <div className=' h-screen w-full px-[155px] pt-[110px] lg:w-[50vw]'>
          <div
            className={`${oxanium.className} mb-[64px] text-[50px]
         font-bold text-[#26292D]`}
          >
            COMPASS
          </div>
          <div className='mb-2 text-[34px] font-semibold text-[#272728]'>
            Welcome
          </div>
          <div className='mb-[50px] text-[24px] font-normal text-[#5C5C5C] '>
            Lorem Ipsum dolor kindapsium
          </div>
          <div className='mb-[30px] w-[450px]'>
            <Label text='Email' />
            <InputTag
              placeholder='Enter Email ID'
              value={loginData.email}
              onChange={(value) => handleChange('email', value)}
              errorMessage={error.email}
            />
          </div>
          <div className=' w-[450px]'>
            <Label text='Password' />
            <PasswordInput
              value={loginData?.password}
              placeholder='Enter Password'
              onChange={(value) => handleChange('password', value)}
              width='450px'
              errorMessage={error?.password}
            />
            <div className='mb-[30px] pr-[px] text-right text-base text-[#26292D]'>
              <Link href='/sign-up'>Don't have Account?</Link>
            </div>
          </div>
          <ButtonFill type='submit' classes='bg-[#26292D] w-[450px]'>
            Login
          </ButtonFill>
        </div>
      </form>
      <div className='hidden h-screen w-[50vw] bg-[#26292D] lg:block'></div>
    </div>
  );
};

export default Login;
