import { marketBackendUrl } from '@root/config';
import axios from 'axios';

export const getUserWalletDetails = async (adminId: string) => {
  const data = await axios.get(
    `${marketBackendUrl}/api/admin/${adminId}/consumers`
  );
  return data.data.data;
};

type addCreditPayloadType = {
  credits: number;
  consumerId: string;
};

// marketplace
export const addCreditToUser = async (
  payload: addCreditPayloadType,
  adminId: string
) => {
  const data = await axios.post(
    `${marketBackendUrl}/api/admin/${adminId}/addCredits`,
    payload
  );
  return data.data.data;
};

// marketplace
export const removeCreditFromUser = async (
  payload: addCreditPayloadType,
  adminId: string
) => {
  const data = await axios.post(
    `${marketBackendUrl}/api/admin/${adminId}/reduceCredits`,
    payload
  );
  return data.data.data;
};

export const getTransactionHistory = async (
  adminId: string,
  consumerId: string
) => {
  const data = await axios.get(
    `${marketBackendUrl}/api/admin/${adminId}/userWallets/transactions/${consumerId}`
  );
  return data.data.data;
};
