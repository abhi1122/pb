import { callHttpRequestWithLoading } from '../helpers/services';
import { addCore } from './core';

export const LOAD_LIST = 'LOAD_LIST';
export const LOAD_EDIT = 'LOAD_EDIT';
export const SAVED_FORM = 'SAVED_FORM';
export const SAVE_ERROR = 'SAVE_ERROR';
export const FORM_CHANGE = 'CATEGORY_FORM_CHANGE';

export function formChange(data) {
  return {
    type: FORM_CHANGE,
    playLoad: data,
  };
}

export function loadList(data, isEdit) {
  const type = isEdit ? LOAD_EDIT : LOAD_LIST;
  return {
    type: type,
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

export function getList(query, isEdit = false) {
  return async (dispatch) => {
    //dispatch(addCore({ loading: true }));
    const {
      data: [data],
    } = await callHttpRequestWithLoading('post', 'categories/list', query);
    console.log(data, '.ppopodata.....poop.');
    //dispatch(addCore({ loading: false }));
    dispatch(loadList(data, isEdit));
  };
}

export function saveForm(fromData) {
  return async (dispatch) => {
    dispatch(addCore({ loading: true }));
    const data = await callHttpRequestWithLoading(
      'post',
      'categories/save',
      fromData,
      true
    );
    console.log(data, '.ppopodata......');
    dispatch(addCore({ loading: false }));
    if (data.status) {
      dispatch(savedForm());
    } else {
      dispatch(loadError(data.error));
    }
  };
}

export function updateForm(fromData) {
  return async (dispatch) => {
    dispatch(addCore({ loading: true }));
    const data = await callHttpRequestWithLoading(
      'post',
      'categories/edit',
      fromData,
      true
    );
    console.log(data, '.ppopodata......');
    dispatch(addCore({ loading: false }));
    if (data.status) {
      dispatch(savedForm());
    } else {
      dispatch(loadError(data.error));
    }
  };
}
