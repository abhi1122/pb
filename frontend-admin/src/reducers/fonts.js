import {
  FONT_LIST,
  SAVED_FONTS,
  FONTS_ERROR,
  EDIT_FONTS,
  FONT_EDIT,
} from '../actions/fonts';

const defaultState = {
  list: [],
  saved: false,
  errors: {},
  formData: { status: true, name: '' },
};
export default function fonts(state = defaultState, action = {}) {
  // const [formData = {}] = action.playLoad;
  switch (action.type) {
    case FONT_LIST:
      return {
        ...state,
        list: action.playLoad,
        errors: {},
        saved: false,
        formData: defaultState.formData,
      };
    case FONT_EDIT:
      return {
        ...state,
        list: [],
        errors: {},
        saved: false,
        formData: action.playLoad.length
          ? action.playLoad[0]
          : defaultState.formData,
      };
    case SAVED_FONTS:
      return { ...state, saved: true };
    case EDIT_FONTS:
      return {
        ...state,
        list: [],
        formData: { ...state.formData, ...action.playLoad },
        errors: {},
      };
    case FONTS_ERROR:
      return { ...state, errors: action.playLoad, list: [] };
    default:
      return state;
  }
}
