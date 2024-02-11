import axios from "axios";

/**
 * api request
 * @param {*} url  - request url
 * @param {import('axios').AxiosRequestConfig} options - request options
 *
 * @returns api response
 */

const request = (url, { method = "GET", headers, ...options } = {}) =>
  axios({
    url,
    method,
    headers: { "Content-Type": "application/json", ...headers },
    ...options,
  }).catch(error => {
    error.data = error.response.data;
    throw error;
  });

export default request;
