import {
  FONT_LIST,
  SAVED_FONTS,
  FONTS_ERROR,
  EDIT_FONTS,
} from '../actions/fonts';

const defaultState = { list: [], saved: false, errors: {}, formData: {} };
export default function fonts(state = defaultState, action = {}) {
  // const [formData = {}] = action.playLoad;
  switch (action.type) {
    case FONT_LIST:
      return {
        ...state,
        list: action.playLoad,
        errors: {},
        saved: false,
        formData: action.playLoad.length ? action.playLoad[0] : {},
      };
    case SAVED_FONTS:
      return { ...state, saved: true };
    case EDIT_FONTS:
      return { ...state, formData: { ...state.formData, ...action.playLoad } };
    case FONTS_ERROR:
      return { ...state, errors: action.playLoad };
    default:
      return state;
  }
}
