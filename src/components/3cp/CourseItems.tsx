import { CourseType } from '@/app/3cp/marketplace/page';

import SingleCourse from './SingleCourse';

const CourseItems = ({
  activeSection,
  courseList,
  fetchData,
}: {
  activeSection: string;
  courseList: CourseType[];
  fetchData: () => void;
}) => {
  return (
    <div className='flex flex-col gap-2.5'>
      {courseList?.map((course) => {
        return (
          <SingleCourse
            key={course?.courseId}
            activeSection={activeSection}
            course={course}
            fetchData={fetchData}
          />
        );
      })}
    </div>
  );
};
export default CourseItems;
