import { courseManagerBackendUrl } from '@root/config';
import axios from 'axios';

import { LoginDataType } from '@/app/login/page';

// course manager
export const loginAdmin = async (userData: LoginDataType) => {
  const data = await axios.post(
    `${courseManagerBackendUrl}/api/admin/login`,
    userData
  );
  return data.data.data;
};

export const signupAdmin = async (userData: FormData) => {
  const data = await axios.post(
    `${courseManagerBackendUrl}/api/admin/signup`,
    userData
  );
  return data.data.data;
};
