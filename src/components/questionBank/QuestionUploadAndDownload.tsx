'use client';

import { wpcasBackendUrl } from '@root/config';
import axios from 'axios';
import React, { MutableRefObject, useRef, useState } from 'react';

import ButtonFill from '@/components/uiComponents/ButtonFill';
import ButtonOutline from '@/components/uiComponents/ButtonOutline';
import SingleButtonPopUp from '@/components/wpcasOverView/SingleButtonPopUp';

import { downloadTemplate } from '@/services/bultTemplate';

import Warning from '~/svg/warning.svg';

const QuestionUploadAndDownload = () => {
  const fileInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

  const [showSuccessPopUp, setShowSuccessPopUp] = useState(false);
  const [showErrorPopUp, setShowErrorPopUp] = useState(false);

  const handleLabelClick = () => {
    fileInputRef?.current?.click();
  };
  async function uploadFile(file: File) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      // Make a POST request to backend
      await axios.post(`${wpcasBackendUrl}/api/question-bank/upload`, formData);

      setShowSuccessPopUp(true);
    } catch (error) {
      setShowErrorPopUp(true);
    }
  }

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      if (selectedFile.name.endsWith('.csv')) {
        uploadFile(selectedFile);
      } else {
        setShowErrorPopUp(true);
      }
    }
  }

  return (
    <div className='mb-5 flex justify-end gap-3'>
      {showSuccessPopUp && (
        <SingleButtonPopUp
          handleClick={setShowSuccessPopUp}
          visible={showSuccessPopUp}
          topHeading='Question bank created successfully'
          subHeading='ingestion of question bank has been uploaded successfully'
          buttonText='Ok'
          buttondestination='/question-bank'
        />
      )}
      {showErrorPopUp && (
        <SingleButtonPopUp
          icon={<Warning width='60px' />}
          handleClick={setShowErrorPopUp}
          visible={showErrorPopUp}
          topHeading='Question bank upload failed'
          subHeading='ingestion of question bank upload is failed'
          buttonText='Try again'
          buttondestination='/question-bank'
        />
      )}
      <ButtonOutline
        onClick={() => downloadTemplate()}
        classes='bg-[#fff] border-[#26292D] w-[330px]'
      >
        Download Question Bank Template
      </ButtonOutline>
      <ButtonFill onClick={handleLabelClick} classes='bg-[#26292D] w-[203px]'>
        Upload Bulk Question
        <input
          className='hidden'
          onChange={handleFile}
          ref={fileInputRef}
          type='file'
        />
      </ButtonFill>
    </div>
  );
};
export default QuestionUploadAndDownload;
