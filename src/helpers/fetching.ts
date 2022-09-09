import axios, { AxiosError } from 'axios';

export const fetchData = async (fetchURL: string) => {
  try {
    const response = await axios.get(fetchURL);

    return response.data;
  } catch (error) {
    const err = error as AxiosError;

    const errorMessage = `${err.message}. Please try again later!`;

    throw new Error(errorMessage);
  }
};
