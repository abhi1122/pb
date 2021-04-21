import { callHttpRequest } from '../helpers/services';

export const FONT_LIST = 'FONT_LIST';
export const FONT_EDIT = 'FONT_EDIT';
export const SAVED_FONTS = 'SAVED_FONTS';
export const FONTS_ERROR = 'FONTS_ERROR';
export const EDIT_FONTS = 'EDIT_FONTS';

export function editForm(data) {
  return {
    type: EDIT_FONTS,
    playLoad: data,
  };
}

export function loadFonts(data, isEdit) {
  const type = isEdit ? FONT_EDIT : FONT_LIST;
  return {
    type: type,
    playLoad: data,
  };
}

function savedFonts() {
  return {
    type: SAVED_FONTS,
  };
}

function errorFonts(errors) {
  return {
    type: FONTS_ERROR,
    playLoad: errors,
  };
}

export function getFonts(creds, isEdit = false) {
  return async (dispatch) => {
    const { data } = await callHttpRequest('post', 'fonts/list', creds);
    console.log(data, '.ppopodata.....poop.');
    dispatch(loadFonts(data, isEdit));
  };
}

export function saveFonts(fromData) {
  return async (dispatch) => {
    const data = await callHttpRequest('post', 'fonts/save', fromData, true);
    console.log(data, '.ppopodata......');
    if (data.status) {
      dispatch(savedFonts());
    } else {
      dispatch(errorFonts(data.error));
    }
  };
}

export function updateFonts(fromData) {
  return async (dispatch) => {
    const data = await callHttpRequest('post', 'fonts/edit', fromData, true);
    console.log(data, 'edit call.....');
    if (data.status) {
      dispatch(savedFonts());
    } else {
      dispatch(errorFonts(data.error));
    }
  };
}
