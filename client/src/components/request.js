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

// /NOTE we can send that too👇,but the above is easier👆.
// useEffect(() => {
//   axios({
//     url: "http://localhost:3000/api/collections",
//     method: "GET",
//     headers: { "Content-Type": "application/json" },
//   }).then(res => console.log(res));
// }, []);
