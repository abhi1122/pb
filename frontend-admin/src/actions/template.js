import { callHttpRequest } from '../helpers/services';

export const LOAD_LIST = 'TEMPLATE_LOAD_LIST';
export const SAVED_FORM = 'SAVED_FORM';
export const SAVE_ERROR = 'SAVE_ERROR';
export const SET_AXIS = 'SET_AXIS';
export const FORM_CHANGE = 'FORM_CHANGE';
export const DOWNLOAD_URL = 'DOWNLOAD_URL';
export const SAVED_AXIS = 'SAVED_AXIS';

export function formChange(data) {
  return {
    type: FORM_CHANGE,
    playLoad: data,
  };
}

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
    type: SAVED_AXIS,
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
    dispatch(savedAxis({ setAxis: true }));
    const { data } = await callHttpRequest(
      'post',
      'templates/update',
      formData
    );
    dispatch(savedAxis({ setAxis: false }));
  };
}
function savedAxis(data) {
  return {
    type: SAVED_AXIS,
    playLoad: data,
  };
}

export function downloadTemplate(id) {
  console.log('calll.....');
  return async (dispatch) => {
    const { data } = await callHttpRequest(
      'get',
      `templates/demo-download/${id}`
    );
    dispatch(downloadUrl(data[0]));
  };
}

export function downloadUrl(data) {
  return {
    type: DOWNLOAD_URL,
    playLoad: data,
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

export function update(fromData) {
  return async (dispatch) => {
    const data = await callHttpRequest('post', 'fonts/edit', fromData, true);
    console.log(data, 'edit call.....');
    if (data.status) {
      dispatch(savedForm());
    } else {
      dispatch(loadError(data.error));
    }
  };
}

export function saveForm(fromData) {
  return async (dispatch) => {
    const data = await callHttpRequest(
      'post',
      'templates/save',
      fromData,
      true
    );
    console.log(data, '.ppopodata......');
    if (data.status) {
      dispatch(savedForm());
    } else {
      dispatch(loadError(data.error));
    }
  };
}
