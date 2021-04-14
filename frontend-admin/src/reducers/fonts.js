import { FONT_LIST, SAVED_FONTS, FONTS_ERROR } from '../actions/fonts';

const defaultState = { list: [], saved: false, errors: {} };
export default function fonts(state = defaultState, action = {}) {
  switch (action.type) {
    case FONT_LIST:
      return { ...state, list: action.playLoad, errors: {} };
    case SAVED_FONTS:
      return { ...state, saved: true };
    case FONTS_ERROR:
      return { ...state, errors: action.playLoad };
    default:
      return state;
  }
}
