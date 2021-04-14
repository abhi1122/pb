import { callHttpRequest } from '../helpers/services';

export const FONT_LIST = 'FONT_LIST';
export const SAVED_FONTS = 'SAVED_FONTS';
export const FONTS_ERROR = 'FONTS_ERROR';

export function loadFonts(data) {
  return {
    type: FONT_LIST,
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

export function getFonts(creds) {
  return async (dispatch) => {
    const { data } = await callHttpRequest('post', 'fonts/list', creds);
    console.log(data, '.ppopodata.....poop.');
    dispatch(loadFonts(data));
  };
}

export function saveFonts(fromData) {
  return async (dispatch) => {
    const data = await callHttpRequest('post', 'fonts/save', fromData);
    console.log(data, '.ppopodata......');
    if (data.status) {
      dispatch(savedFonts());
    } else {
      dispatch(errorFonts(data.error));
    }
  };
}
