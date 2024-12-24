import axios, { AxiosRequestConfig } from "axios";

const queryFetcher = async (payload: AxiosRequestConfig) => {
  return await axios({
    ...payload,
    withCredentials: true,
  }).then((res) => res.data);
};

export default queryFetcher;
