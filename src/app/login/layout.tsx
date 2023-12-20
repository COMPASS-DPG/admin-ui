'use client';
import * as React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className='w-screen bg-[#F7F9FC]'>{children}</div>;
}
