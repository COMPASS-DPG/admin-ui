import React, { useEffect, useState } from 'react';
import { MdModeEdit } from 'react-icons/md';

import { outfit } from '@/components/FontFamily';
import Spinner from '@/components/Spinner';
import CommonModal from '@/components/uiComponents/CommonModal';
import SetupConfigurationForm, {
  getEmptySurveyData,
  SurveyDataType,
} from '@/components/wpcasOverView/SetupConfigurationForm';

import { getConfigurationList } from '@/services/configurationServices';

type PropType = {
  setIsSuccessPopUpOpen: (value: boolean) => void;
  handleEditMessage: () => void;
  setFetchData: (arg: boolean) => void;
  fetchData: boolean;
};

const SurveyTable = ({
  setIsSuccessPopUpOpen,
  handleEditMessage,
  setFetchData,
  fetchData,
}: PropType) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [userSurveyData, setUserSurveyData] = useState<SurveyDataType[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // will sort  start date by descending order
  const sortedSurveyData: SurveyDataType[] = [...userSurveyData]?.sort(
    (a: SurveyDataType, b: SurveyDataType) =>
      new Date(b?.startTime).valueOf() - new Date(a?.startTime).valueOf()
  );

  const [editValue, setEditValue] = useState<SurveyDataType>(
    getEmptySurveyData()
  );

  const handleEdit = (data: SurveyDataType) => {
    setIsOpen(true);
    const formattedStartDate = new Date(data?.startTime);
    const formattedEndDate = data?.endTime && new Date(data?.endTime);
    const formattedData = {
      ...data,
      startTime: formattedStartDate,
      endTime: formattedEndDate,
    };
    handleEditMessage();
    setEditValue(formattedData);
  };

  useEffect(() => {
    if (fetchData) {
      (async () => {
        try {
          const data = await getConfigurationList();
          setLoading(false);
          setUserSurveyData(data);
          setFetchData(false);
        } catch (error) {
          // Handle any errors that occur during the API call
          // eslint-disable-next-line no-console
          console.log('Api call error', error);
          setLoading(false);
          setError(true);
        }
      })();
    }
  }, [fetchData, setFetchData]);

  return (
    <div className='relative h-[52vh] overflow-x-auto overflow-y-auto shadow-md sm:rounded-md  '>
      <CommonModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <SetupConfigurationForm
          handleFetchConfigData={() => setFetchData(true)}
          onClose={() => setIsOpen(false)}
          isEdit={true}
          data={editValue}
          setIsSuccessPopUpOpen={setIsSuccessPopUpOpen}
        />
      </CommonModal>
      <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
        <thead
          className={`bg-[#26292D] text-sm font-normal text-white ${outfit.className} sticky top-0`}
        >
          <tr>
            <th scope='col' className=' w-[60%] px-6 py-3 text-sm font-normal'>
              Survey Name
            </th>
            <th
              scope='col'
              className='w-[15%] px-6 py-3 text-left text-sm font-normal'
            >
              Start Date
            </th>
            <th
              scope='col'
              className=' w-[15%] px-6 py-3 text-left text-sm font-normal'
            >
              End Date
            </th>
            <th
              scope='col'
              className='w-[10%] px-6 py-3 text-center text-sm font-normal'
            ></th>
          </tr>
        </thead>

        <tbody>
          {loading && (
            <tr className={`bg-white hover:bg-gray-50 ${outfit.className}`}>
              <td
                align='center'
                colSpan={4}
                className={` px-6 py-[30px] text-center 
             text-sm  font-normal text-[#272728]`}
              >
                <Spinner classes='h-10 w-10' />
              </td>
            </tr>
          )}
          {error && (
            <tr
              className={`border-b bg-white hover:bg-gray-50 ${outfit.className}`}
            >
              <td
                align='center'
                colSpan={4}
                className={` px-6 py-[14px] text-center 
             text-sm  font-normal text-[#272728]`}
              >
                Error...
              </td>
            </tr>
          )}

          {!loading && !error && userSurveyData.length == 0 && (
            <tr
              className={`border-b bg-white hover:bg-gray-50 ${outfit.className}`}
            >
              <td
                align='center'
                colSpan={4}
                className={` px-6 py-[14px] text-center 
             text-sm  font-normal text-[#272728]`}
              >
                No Survey Configuration
              </td>
            </tr>
          )}

          {!loading &&
            !error &&
            sortedSurveyData.length > 0 &&
            sortedSurveyData?.map((user) => {
              const { endTime, startTime, surveyName, id } = user;
              return (
                <>
                  {endTime && new Date() <= new Date(endTime) && (
                    <tr
                      key={id}
                      className={`border-b bg-white hover:bg-gray-50 ${outfit.className}`}
                    >
                      <td className='px-6 py-[14px]  text-sm  font-normal text-[#272728]'>
                        {surveyName}
                      </td>
                      <td className='px-6 py-[14px] text-sm font-normal text-[#272728]'>
                        {new Date(startTime).toLocaleDateString('en-GB')}
                      </td>
                      <td className='px-6 py-[14px]  text-sm font-normal text-[#272728]'>
                        {endTime &&
                          new Date(endTime).toLocaleDateString('en-GB')}
                      </td>
                      <td className='px-6 py-[14px]  text-sm font-normal text-[#272728]'>
                        {startTime && new Date() < new Date(startTime) && (
                          <MdModeEdit
                            className='cursor-pointer'
                            fontSizeAdjust={16}
                            onClick={() => handleEdit(user)}
                          />
                        )}
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default SurveyTable;
