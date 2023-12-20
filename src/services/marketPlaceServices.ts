import { courseManagerBackendUrl } from '@root/config';
import axios from 'axios';
// course manager api
export const getAllCourses = async () => {
  const data = await axios.get(`${courseManagerBackendUrl}/api/admin/courses`);
  return data.data.data;
};

// course manager api
export const approveCourse = async (courseId: string) => {
  const data = await axios.patch(
    `${courseManagerBackendUrl}/api/admin/courses/${courseId}/accept`
  );
  return data.data.data;
};

// course manager api
export const rejectCourse = async (courseId: string, reason: string) => {
  const data = await axios.patch(
    `${courseManagerBackendUrl}/api/admin/courses/${courseId}/reject`,
    { rejectionReason: reason }
  );
  return data.data.data;
};
