import axios from "axios";
import router from "@/router";
import { contentTypes } from "@/constants/contentTypes";

const { JSON } = contentTypes;

const api = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": JSON,
  },
});

// export function setBearerToken(accessToken) {
//   if (accessToken === undefined) {
//     delete api.defaults.headers["Authorization"]
//   }
//   api.defaults.headers = {
//     ...api.defaults.headers,
//     "Authorization": `Bearer ${accessToken}`
//   }
// }

// interceptor to catch errors
const errorInterceptor = error => {
  const { status, statusText, data } = error.response;

  window.$notify("error", `${status} - ${statusText}`, data.message, {
    permanent: false,
    duration: 10000
  });

  return Promise.reject(error);
}

// Interceptor for responses
const responseInterceptor = response => {
  const { status, statusText, data } = response;

  window.$notify("success", `${status} - ${statusText}`, data.message, {
    permanent: false,
    duration: 2000
  });

  return response;
}

api.interceptors.response.use(responseInterceptor, errorInterceptor);

export default api;
