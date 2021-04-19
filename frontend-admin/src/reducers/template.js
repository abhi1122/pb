import {
  LOAD_LIST,
  SAVED_FORM,
  SAVE_ERROR,
  SET_AXIS,
  FORM_CHANGE,
  DOWNLOAD_URL,
  SAVED_AXIS,
} from '../actions/template';

const defaultState = {
  list: [],
  saved: false,
  errors: {},
  axis: [],
  formData: {},
  downloadUrl: '',
  setAxis: false,
};
export default function template(state = defaultState, action = {}) {
  switch (action.type) {
    case LOAD_LIST:
      return {
        ...state,
        list: action.playLoad,
        errors: {},
        saved: false,
        downloadUrl: '',
        setAxis: false,
      };
    case SAVED_FORM:
      return { ...state, saved: true, downloadUrl: '', setAxis: false };
    case SAVE_ERROR:
      return {
        ...state,
        errors: action.playLoad,
        downloadUrl: '',
        setAxis: false,
      };
    case SET_AXIS:
      return {
        ...state,
        axis: action.playLoad,
        downloadUrl: '',
        setAxis: false,
      };
    case SAVED_AXIS:
      return {
        ...state,
        ...action.playLoad,
      };
    case FORM_CHANGE:
      return {
        ...state,
        formData: { ...state.formData, ...action.playLoad },
        downloadUrl: '',
        setAxis: false,
      };
    case DOWNLOAD_URL:
      return { ...state, downloadUrl: action.playLoad.url, setAxis: false };
    default:
      return state;
  }
}
