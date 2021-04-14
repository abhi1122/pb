import {
  LOAD_LIST,
  SAVED_FORM,
  SAVE_ERROR,
  SET_AXIS,
} from '../actions/template';

const defaultState = { list: [], saved: false, errors: {}, axis: [] };
export default function template(state = defaultState, action = {}) {
  console.log(action, '....action.playLoad call...........');
  switch (action.type) {
    case LOAD_LIST:
      return { ...state, list: action.playLoad, errors: {}, saved: false };
    case SAVED_FORM:
      return { ...state, saved: true };
    case SAVE_ERROR:
      return { ...state, errors: action.playLoad };
    case SET_AXIS:
      console.log(action, '....action.playLoad');
      return { ...state, axis: action.playLoad };
    default:
      return state;
  }
}
