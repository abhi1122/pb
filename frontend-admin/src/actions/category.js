import { callHttpRequest } from '../helpers/services';

export const LOAD_LIST = 'LOAD_LIST';
export const SAVED_FORM = 'SAVED_FORM';
export const SAVE_ERROR = 'SAVE_ERROR';

export function loadList(data) {
  return {
    type: LOAD_LIST,
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
    const { data } = await callHttpRequest('post', 'categories/list', query);
    console.log(data, '.ppopodata.....poop.');
    dispatch(loadList(data));
  };
}

export function saveForm(fromData) {
  return async (dispatch) => {
    const data = await callHttpRequest('post', 'categories/save', fromData);
    console.log(data, '.ppopodata......');
    if (data.status) {
      dispatch(savedForm());
    } else {
      dispatch(loadError(data.error));
    }
  };
}
