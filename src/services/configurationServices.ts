import { wpcasBackendUrl } from '@root/config';
import axios from 'axios';

export const getConfigurationList = async () => {
  const data = await axios.get(`${wpcasBackendUrl}/api/survey-config`);
  return data.data.data;
};

export const downloadUserList = async () => {
  const data = await axios.get(`${wpcasBackendUrl}/api/user-metadata`);
  return data.data.data;
};

export const downloadAssessesList = async () => {
  const data = await axios.get(
    `${wpcasBackendUrl}/api/survey-config/user-mapping-sample`
  );
  return data.data.data;
};

export const createSurveyConfig = async (payload: FormData) => {
  await axios.post(`${wpcasBackendUrl}/api/survey-config`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
    },
  });
};

export const updateSurveyConfig = async (id: string, payload: FormData) => {
  await axios.patch(
    `${wpcasBackendUrl}/api/survey-config/update/${id}`,
    payload,
    {
      headers: {
        'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
      },
    }
  );
};

export const getUserList = async () => {
  const data = await axios.get(`${wpcasBackendUrl}/api/survey/home-screen`);
  return data.data.data;
};
