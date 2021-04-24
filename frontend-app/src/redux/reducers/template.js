import { LOAD_LIST } from '../actions/template';

const defaultState = {
  list: [],
};

export default function core(state = defaultState, action = {}) {
  switch (action.type) {
    case LOAD_LIST:
      const { list = [] } = action.payload;
      return {
        ...state,
        list,
      };
    default:
      return state;
  }
}
