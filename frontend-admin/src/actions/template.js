import { callHttpRequest } from '../helpers/services';

export const LOAD_LIST = 'LOAD_LIST';
export const SAVED_FORM = 'SAVED_FORM';
export const SAVE_ERROR = 'SAVE_ERROR';
export const SET_AXIS = 'SET_AXIS';

export function loadList(data) {
  return {
    type: LOAD_LIST,
    playLoad: data,
  };
}

export function setAxis(data) {
  console.log(data, '......data');
  return {
    type: SET_AXIS,
    playLoad: data,
  };
}

function savedForm() {
  return {
    type: SAVED_FORM,
  };
}

function loadError(errors) {
  return {
    type: SAVE_ERROR,
    playLoad: errors,
  };
}

export function getList(query) {
  return async (dispatch) => {
    const { data } = await callHttpRequest('post', 'templates/list', query);
    console.log(data, '.ppopodata.....poop.');
    dispatch(loadList(data));
  };
}

export function setAxisCall(data) {
  return async (dispatch) => {
    dispatch(setAxis(data));
  };
}

export function updateTemplate(formData) {
  return async (dispatch) => {
    const { data } = await callHttpRequest(
      'post',
      'templates/update',
      formData
    );
    // dispatch(loadList(data));
  };
}

export function downloadTemplate(id) {
  console.log('calll.....');
  return async (dispatch) => {
    const { data } = await callHttpRequest(
      'get',
      `templates/demo-download/${id}`
    );
    // dispatch(loadList(data));
  };
}

export function loadEditTemplate(_id) {
  console.log('load tempate call..............');
  return async (dispatch) => {
    const { data } = await callHttpRequest('post', 'templates/list', {
      searchQuery: { _id },
    });

    const withIndex = data[0].texts.map((obj, index) => ({
      ...obj,
      index: index + 1,
      name: `Label ${index + 1}`,
    }));
    console.log('load tempate call..............', data[0].texts, withIndex);
    dispatch(setAxisCall(withIndex));
  };
}
