const getLocalRefreshToken = () => {
    return localStorage.getItem("pmt_refeshToken");
  }

const getLocalAccessToken = () => {
    return localStorage.getItem("pmt_token");
  }

const updateLocalAccessToken = (token) => {
    localStorage.setItem("pmt_token", token);
  }

export const TokenService = {
    getLocalRefreshToken: getLocalRefreshToken,
    getLocalAccessToken: getLocalAccessToken,
    updateLocalAccessToken: updateLocalAccessToken,
};