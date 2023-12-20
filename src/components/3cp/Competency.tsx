import SingleCompetency from '@/components/3cp/SingleCompetency';

import { CourseType } from '@/app/3cp/marketplace/page';

const Competencies = ({ courseDetails }: { courseDetails: CourseType }) => {
  return (
    <div className='py-4 '>
      {courseDetails?.competency?.length > 0 &&
        courseDetails?.competency?.map((competency) => {
          return (
            <SingleCompetency
              key={competency?.id}
              competency={{
                name: competency?.name,
                levels: competency?.levels,
              }}
            />
          );
        })}
    </div>
  );
};
export default Competencies;
