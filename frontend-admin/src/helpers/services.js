import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'https://some-domain.com/api/',
//   timeout: 1000,
//   headers: { 'X-Custom-Header': 'foobar' },
// });

axios.defaults.baseURL = 'http://localhost:3007';
axios.defaults.headers.common['Authorization'] = '';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
//'Content-Type': 'multipart/form-data'

export const callHttpRequest = async (method, url, requestData) => {
  try {
    const apiResponse = await axios({ method, url, data: requestData });
    // if (apiResponse && apiResponse.status === 200) {
    //   console.log('enter if........');
    //   const {
    //     data: { data = [] },
    //   } = apiResponse;
    //   return { data, status: true };
    // } else if (apiResponse && apiResponse.status === 400) {
    //   console.log('enter else........');
    //   const {
    //     data: { error = {} },
    //   } = apiResponse;
    //   return { error, status: true };
    // }
    return responseMapping(apiResponse);
  } catch (error) {
    console.log('errrr');
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
