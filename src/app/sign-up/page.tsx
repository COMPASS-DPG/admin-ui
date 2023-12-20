'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { capitalizeName, isValidSignupData } from '@/lib/helper';

import { outfit, oxanium } from '@/components/FontFamily';
import ButtonFill from '@/components/uiComponents/ButtonFill';
import FileInput from '@/components/uiComponents/FileInput';
import InputTag from '@/components/uiComponents/InputTag';
import Label from '@/components/uiComponents/Label';
import PasswordInput from '@/components/uiComponents/PasswordInput';

import { signupAdmin } from '@/services/authService';

import { useAuthContext } from '../context/AuthContext';
// import ArrowNavbar from '@/components/navbar/ArrowNavbar';

export type SignupDataType = {
  name: string;
  email: string;
  profile: string | File;
  password: string;
  confirmPassword: string;
};

export type ErrorType = {
  [key: string]: string;
  name: string;
  email: string;
  profile: string;
  password: string;
  confirmPassword: string;
};

const initialData = () => {
  return {
    name: '',
    email: '',
    profile: '',
    password: '',
    confirmPassword: '',
  };
};

const SignUp = () => {
  const router = useRouter();
  const { setAdminData } = useAuthContext();
  const [signupData, setSignupData] = useState<SignupDataType>(initialData());
  const [error, setError] = useState<ErrorType>(initialData());

  // will set error for bank details
  const handleError = (key: string, value: string) => {
    setError((pre) => {
      return {
        ...pre,
        [key]: value,
      };
    });
  };

  // will set bank details and set error
  const handleChange = (key: string, value: string | File) => {
    if (error?.[key]) {
      setError((pre) => {
        return {
          ...pre,
          [key]: '',
        };
      });
    }
    setSignupData((pre) => {
      return {
        ...pre,
        [key]: value,
      };
    });
  };

  const handleSignup = async () => {
    if (isValidSignupData(signupData, handleError)) {
      const formData = new FormData();
      formData.append('name', signupData?.name);
      formData.append('image', signupData?.profile);
      formData.append('email', signupData?.email);
      formData.append('password', signupData?.password);
      try {
        const data = await signupAdmin(formData);
        localStorage.setItem('adminData', JSON.stringify(data));
        setAdminData(data);
        toast.success('sign up successful');
        router.push('/3cp/marketplace');
      } catch (error) {
        // Handle any errors that occur during the API call
        // eslint-disable-next-line no-console
        console.error('API call error:', error);
        toast.error('something went wrong try again');
      }
    }
  };

  return (
    <div className={`flex ${outfit.className}`}>
      <div className='h-screen w-full px-[80px] pt-[40px] lg:w-[80vw]'>
        {/* <ArrowNavbar /> */}
        <div className='  pl-[75px]'>
          <div
            className={`${oxanium.className} mb-[64px] mt-[26px] text-[50px]
         font-bold text-[#26292D]`}
          >
            COMPASS
          </div>
          <div className='mb-2 text-[34px] font-semibold text-[#272728]'>
            Welcome
          </div>
          <div className='text-lg font-normal text-[#5C5C5C] '>
            Hi, looks like you are new here! Let's Sign-Up to Compass.{' '}
            <Link href='/login' className='text-[#26292D]'>
              Already have an account
            </Link>
          </div>
          <div className='mb-2 text-lg font-semibold text-[#272728]'>
            User Details
          </div>
          <div className='mb-5 max-w-[912px] border border-b border-[#B3B3B3]'></div>
          <div className='grid w-[912px] grid-cols-1 gap-4 lg:grid-cols-2'>
            <div>
              <Label text='Name' />
              <InputTag
                value={signupData?.name}
                onChange={(value) =>
                  handleChange('name', capitalizeName(value))
                }
                placeholder='Enter Name'
                errorMessage={error?.name}
              />
            </div>
            <div>
              <Label text='Email' />
              <InputTag
                value={signupData.email}
                onChange={(value) => handleChange('email', value)}
                placeholder='Enter Email'
                errorMessage={error?.email}
              />
            </div>
            <div>
              <Label text='Upload Profile' />
              <FileInput
                value={signupData?.profile}
                accept='image/*'
                onChange={(value) => handleChange('profile', value)}
                errorMessage={error?.profile}
              />
            </div>
            <div>
              <Label text='Set Password' />
              <PasswordInput
                value={signupData?.password}
                width='450px'
                onChange={(value) => handleChange('password', value)}
                placeholder='Set Password'
                errorMessage={error?.password}
              />
            </div>
            <div>
              <Label text='Confirm Password' />
              <PasswordInput
                value={signupData?.confirmPassword}
                width='450px'
                onChange={(value) => handleChange('confirmPassword', value)}
                placeholder='Confirm Password'
                isConfirmPassword={true}
                errorMessage={error?.confirmPassword}
              />
            </div>
          </div>
          <div>
            <ButtonFill
              onClick={handleSignup}
              classes='bg-[#26292D] w-[450px] mt-8'
            >
              Sign up
            </ButtonFill>
          </div>
        </div>
      </div>
      <div className='hidden h-screen w-[20vw]  bg-[#26292D] lg:block'></div>
    </div>
  );
};

export default SignUp;
