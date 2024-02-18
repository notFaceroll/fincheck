import axios from "axios";
import { localStorageKeys } from "../config/localStorageKeys";
import { sleep } from "../utils/sleep";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// works just as a middleware
// we are doing this to add the token to the header of every request
// so we don't have to do it manually every time
httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(async (data) => {
  await sleep();
  return data;
});
