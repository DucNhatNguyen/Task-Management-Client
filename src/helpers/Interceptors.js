import axios from "axios";
import { TokenService } from "services/tokenService";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const instance = axios.create({
  baseURL: process.env.REACT_APP_ROOT_API_PATH,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = token;  // for Spring Boot back-end
      //config.headers["x-access-token"] = token; // for Node.js Express back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    
    const originalConfig = err.config;

    if (originalConfig.url !== "/user/login" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          toast.error('Hết phiên đăng nhập. Vui lòng đăng nhập lại!', {
              position: toast.POSITION.TOP_RIGHT
          });

          setTimeout(() => {
            localStorage.removeItem("pmt_userid");
            localStorage.removeItem("pmt_token");
            window.location.href = '/login';
          }, 3000);

          //   const rs = await instance.post("/user/refreshtoken", {
          //     refreshToken: TokenService.getLocalRefreshToken(),
          //   });
          //window.location = window.location.protocol + "//" + window.location.host + "/login"
          //   const { accessToken } = rs.data;
          //   TokenService.updateLocalAccessToken(accessToken);

          //return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }

      if (err.response.status === 500 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          toast.error('Đã có lỗi xảy ra!', {
              position: toast.POSITION.TOP_RIGHT
          });
          return Promise.reject(err)

          //return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;