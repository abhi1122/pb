import { LOAD_LIST } from '../actions/template';

const defaultState = {
  list: [],
};

export default function core(state = defaultState, action = {}) {
  switch (action.type) {
    case LOAD_LIST:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
}
