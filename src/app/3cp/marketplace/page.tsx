'use client';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import CourseSection from '@/components/3cp/CourseSection';
import MarketPlaceNavbar from '@/components/navbar/MarketPlaceNavbar';
import Spinner from '@/components/Spinner';
import ProfileNavbar from '@/components/wpcasOverView/ProfileNavbar';

import { getAllCourses } from '@/services/marketPlaceServices';

export type LevelsType = {
  id: string;
  levelNumber: number;
  name: string;
};

type CompetencyType = {
  id: string;
  name: string;
  levels: LevelsType[];
};

export type CourseType = {
  courseId: string;
  title: string;
  providerLogo: string;
  competency: CompetencyType[];
  providerName: string;
  author: string;
  language: string[];
  avgRating: number;
  credits: number;
  verificationStatus: string;
  imageLink: string;
  description: string;
  rejectionReason?: string;
  courseLink: string;
};

const MarketPlace = () => {
  const [activeSection, setActiveSection] = useState<string>('PENDING');
  const [courseList, setCourseList] = useState<CourseType[]>([]);
  const [currentCourseList, setCurrentCourseList] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await getAllCourses();
      setLoading(false);
      setCourseList(response);
    } catch (error) {
      setLoading(false);
      setError(true);
      toast.error('something went wrong');
      // Handle any errors that occur during the API call
      // eslint-disable-next-line no-console
      console.error('API call error:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const filterResult = courseList.filter((course: CourseType) => {
      return course.verificationStatus === activeSection;
    });
    setCurrentCourseList(filterResult);
  }, [activeSection, courseList]);

  return (
    <div className='w-screen bg-[#f7f9fc]'>
      <ProfileNavbar heading='Marketplace/Courses' />

      {loading && (
        <div className='mt-[100px] text-center'>
          <Spinner />
        </div>
      )}

      {!loading && error && (
        <div className='mt-100 text-center text-[16px]'>Error...</div>
      )}

      {!loading && !error && (
        <>
          <MarketPlaceNavbar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
          <div className=''>
            <CourseSection
              activeSection={activeSection}
              courseList={currentCourseList}
              fetchData={fetchData}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default MarketPlace;
