import axios from 'axios';
import { store } from '../../src/index';
import { addCore } from '../redux/actions/core';
import config from '../config';

// const instance = axios.create({
//   baseURL: 'https://some-domain.com/api/',
//   timeout: 1000,
//   headers: { 'X-Custom-Header': 'foobar' },
// });

const http = axios.create({
  baseURL: config.SERVER_URL,
  // timeout: 1000,
  headers: { 'Content-Type': 'multipart/form-data' },
});
http.interceptors.request.use(
  (config) => {
    store.dispatch(addCore({ loading: true }));
    return config;
  },
  (error) => {
    store.dispatch(addCore({ loading: false }));
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    store.dispatch(addCore({ loading: false }));
    return response;
  },
  (error) => {
    store.dispatch(addCore({ loading: false }));
    return Promise.reject(error);
  }
);

axios.defaults.baseURL = 'http://localhost:3007';
axios.defaults.headers.common['Authorization'] = '';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

export const callHttpRequestWithLoading = async (
  method,
  url,
  requestData,
  addHeader = false
) => {
  const object = {};
  let filterBody = {};
  console.log(requestData, addHeader, '........requestData');
  if (addHeader && requestData) {
    requestData.forEach((value, key) => (object[key] = value));
    filterBody = JSON.stringify(object);
    console.log('enter....', filterBody);
  }

  try {
    const apiResponse = await axios({
      method,
      url,
      data: requestData,
      headers: {
        'content-type': 'application/json',
        filterbody: filterBody,
      },
    });
    return responseMapping(apiResponse);
  } catch (error) {
    console.log('errrr', error);
    console.log(error.response);

    return responseMapping(error.response);
  }
};

export const callHttpRequest = async (
  method,
  url,
  requestData,
  addHeader = false
) => {
  const object = {};
  let filterBody = {};
  console.log(requestData, addHeader, '........requestData');
  if (addHeader && requestData) {
    requestData.forEach((value, key) => (object[key] = value));
    filterBody = JSON.stringify(object);
    console.log('enter....', filterBody);
  }

  try {
    const apiResponse = await http({
      method,
      url,
      data: requestData,
      headers: {
        'content-type': 'application/json',
        filterbody: filterBody,
      },
    });
    return responseMapping(apiResponse);
  } catch (error) {
    console.log('errrr', error);
    console.log(error.response);

    return responseMapping(error.response);
  }
};

const responseMapping = (apiResponse) => {
  if (apiResponse && apiResponse.status === 200) {
    console.log('enter if........');
    const {
      data: { data = [] },
    } = apiResponse;
    return { data, status: true };
  } else if (apiResponse && apiResponse.status === 400) {
    console.log('enter else........');
    const {
      data: { error = {} },
    } = apiResponse;
    return { error, status: false };
  } else {
    const {
      data: { error = {} },
    } = apiResponse;
    return { error, status: false };
  }
};
