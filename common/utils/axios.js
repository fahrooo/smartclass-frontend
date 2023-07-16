import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

axios.defaults.withCredentials = true;

const axiosBasic = axios.create({
  // baseURL: "https://qa-smartclass.pindad.co.id/be/",
  baseURL: "http://103.155.246.50:5000/",
});

const axiosInstance = axios.create({
  // baseURL: "https://qa-smartclass.pindad.co.id/be/",
  baseURL: "http://103.155.246.50:5000/",
});

//CRUD WITHOUT TOKEN
export const getFetchcerWT = (resource, init) =>
  axiosBasic.get(resource, init).then((res) => res.data);

export const postFetcherWT = (resource, init) =>
  axiosBasic.post(resource, init).then((res) => res.data);

export const putFetcherWT = (resource, init) =>
  axiosBasic.put(resource, init).then((res) => res.data);

export const deleteFetcherWT = (resource, init) =>
  axiosBasic.delete(resource, init).then((res) => res.data);

axiosInstance.interceptors.request.use(async (response) => {
  if (response) {
    const createToken = await getFetchcerWT("/token");

    if (createToken?.status === 200) {
      response.headers = {
        Authorization: `Bearer ${createToken.accessToken}`,
      };
    } else {
      const router = useRouter();
      Cookies.remove("isLogin");
      Cookies.remove("_id");
      router.push("/");
    }
  }
  return response;
});

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     if (error?.response?.status === 401 || error?.response?.status === 403) {
//       const createToken = await axios
//         .get(response.baseURL + `token`)
//         .then((res) => res.data);
//       axiosInstance.defaults.headers.common[
//         "Authorization"
//       ] = `bearer ${createToken.accessToken}`;
//       return axios(error.config);
//     } else {
//       return Promise.reject(error);
//     }
//   }
// );

//CRUD WITH TOKEN
export const getFetchcer = (resource, init) =>
  axiosInstance.get(resource, init).then((res) => res.data);

export const postFetcher = (resource, init) =>
  axiosInstance.post(resource, init).then((res) => res.data);

export const putFetcher = (resource, init) =>
  axiosInstance.put(resource, init).then((res) => res.data);

export const deleteFetcher = (resource, init) =>
  axiosInstance.delete(resource, init).then((res) => res.data);

export default axiosInstance;
