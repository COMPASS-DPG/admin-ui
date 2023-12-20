'use client';

import Head from 'next/head';
import * as React from 'react';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <main>
      <Head>
        <title>Hi</title>
      </Head>
      <section className='flex h-screen w-screen flex-col  items-center justify-center bg-white'>
        <div>
          {/* <div className='h-16 w-16 animate-spin rounded-full border-4 border-t-4 border-blue-500'></div> */}
          <div className='flex items-center justify-center'>
            <div className='relative'>
              <div className='h-20 w-20 rounded-full border-b-8 border-t-8 border-gray-200'></div>
              <div className='absolute left-0 top-0 h-20 w-20 animate-spin rounded-full border-b-8 border-t-8 border-[#26292D]'></div>
            </div>
          </div>
          <p className='mt-4 text-lg font-semibold text-gray-600'>
            Loading Your Admin Portal...
          </p>
        </div>
      </section>
    </main>
  );
}
