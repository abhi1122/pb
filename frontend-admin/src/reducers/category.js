import {
  LOAD_LIST,
  SAVED_FORM,
  SAVE_ERROR,
  FORM_CHANGE,
  LOAD_EDIT,
} from '../actions/category';

const defaultState = {
  list: [],
  saved: false,
  errors: {},
  relations: [],
  formData: { status: true },
};
export default function categories(state = defaultState, action = {}) {
  console.log(action.playLoad, '........action.playLoad');
  switch (action.type) {
    case LOAD_LIST:
      return {
        ...state,
        list: action.playLoad.list,
        errors: {},
        saved: false,
        relations: action.playLoad.relations,
        formData: defaultState.formData,
      };
    case LOAD_EDIT:
      return {
        ...state,
        list: [],
        errors: {},
        saved: false,
        relations: action.playLoad.relations,
        formData: action.playLoad.list.length
          ? action.playLoad.list[0]
          : defaultState.formData,
      };
    case SAVED_FORM:
      return { ...state, saved: true, formData: {} };
    case SAVE_ERROR:
      return { ...state, errors: action.playLoad };
    case FORM_CHANGE:
      return {
        ...state,
        formData: { ...state.formData, ...action.playLoad },
        saved: false,
      };
    default:
      return state;
  }
}
