import { SurveyDataType } from '@/components/wpcasOverView/SetupConfigurationForm';

import { LoginDataType } from '@/app/login/page';
import { SignupDataType } from '@/app/sign-up/page';

export function getFromLocalStorage(key: string): string | null {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key);
  }
  return null;
}

export function getFromSessionStorage(key: string): string | null {
  if (typeof sessionStorage !== 'undefined') {
    return sessionStorage.getItem(key);
  }
  return null;
}

// will check for all data and set error
export const isValidConfigFormData = (
  data: SurveyDataType,
  handleError: (key: string, value: string) => void,
  isEdit = false
): boolean => {
  let flag = true;
  if (!data.surveyName) {
    handleError('surveyName', 'survey name is required!');
    flag = false;
  }
  if (!data.startTime) {
    handleError('startTime', 'start Date is required!');
    flag = false;
  }
  if (!data.endTime) {
    handleError('endTime', 'end Date is required!');
    flag = false;
  }
  if (!data?.file && !isEdit) {
    handleError('file', 'assesses file is required!');
    flag = false;
  }
  return flag;
};

export const isValidPassword = (password: string) => {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password) &&
    /[!@#$%^&*]/.test(password)
  );
};

const isEmailValid = (email: string) => {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return regex.test(email);
};

// will check for valid email
export const validateLoginData = (
  data: LoginDataType,
  handleError: (key: string, value: string) => void
) => {
  let flag = true;
  if (!data.email || !isEmailValid(data.email)) {
    const ErrorMessage = data?.email
      ? 'email is not valid'
      : 'please enter email!';
    handleError('email', ErrorMessage);
    flag = false;
  }
  if (!data.password || !isValidPassword(data?.password)) {
    const ErrorMessage = data?.password
      ? 'Password must be 8 characters or longer with at least one uppercase, one lowercase,one number, and one special character'
      : 'please enter password';
    handleError('password', ErrorMessage);
    flag = false;
  }
  return flag;
};

export const isValidSignupData = (
  data: SignupDataType,
  handleError: (key: string, value: string) => void
) => {
  let flag = true;
  if (!data.name) {
    handleError('name', 'name is required!');
    flag = false;
  }
  if (!data.email || !isEmailValid(data.email)) {
    const ErrorMessage = data?.email
      ? 'email is not valid'
      : 'please enter email!';
    handleError('email', ErrorMessage);
    flag = false;
  }
  if (!data.profile) {
    handleError('profile', 'Profile is required!');
    flag = false;
  }
  if (!data?.password || !isValidPassword(data?.password)) {
    const errorMessage = !data?.password
      ? 'password is required!'
      : 'Password must be 8 characters or longer with at least one uppercase, one lowercase,one number, and one special character';
    handleError('password', errorMessage);
    flag = false;
  }
  if (!data?.confirmPassword || data.password !== data.confirmPassword) {
    const errorMessage = !data?.confirmPassword
      ? 'confirm password is required!'
      : 'password and confirm password must be same';
    handleError('confirmPassword', errorMessage);
    flag = false;
  }
  return flag;
};

export const capitalizeName = (inputString: string) => {
  // Replace numbers with empty strings
  const stringWithoutNumbers = inputString.replace(/\d/g, '');

  // Split the modified string into words using space as a separator
  const words = stringWithoutNumbers.split(' ');

  // Capitalize the first letter of each word
  const transformedWords = words.map((word) => {
    if (word.match(/[a-zA-Z]/)) {
      // If the word contains alphabetic characters, capitalize the first letter
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return word; // Keep the word as is if it contains non-alphabetic characters
  });

  // Join the transformed words with spaces to form the final string
  const result = transformedWords.join(' ');
  // Trim spaces from the left and right
  return result.trimStart();
};
