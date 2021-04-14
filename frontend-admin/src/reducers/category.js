import { LOAD_LIST, SAVED_FORM, SAVE_ERROR } from '../actions/category';

const defaultState = { list: [], saved: false, errors: {} };
export default function categories(state = defaultState, action = {}) {
  switch (action.type) {
    case LOAD_LIST:
      return { ...state, list: action.playLoad, errors: {}, saved: false };
    case SAVED_FORM:
      return { ...state, saved: true };
    case SAVE_ERROR:
      return { ...state, errors: action.playLoad };
    default:
      return state;
  }
}
