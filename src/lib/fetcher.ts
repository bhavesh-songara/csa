import axios, { AxiosRequestConfig } from "axios";

const fetcher = async (payload: AxiosRequestConfig) => {
  try {
    const response = await axios({
      ...payload,
      withCredentials: true,
    });
    return {
      data: response.data,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.response?.data,
    };
  }
};

export default fetcher;
