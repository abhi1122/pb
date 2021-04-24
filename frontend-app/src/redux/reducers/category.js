import { LOAD_LIST } from "../actions/category";

const defaultState = {
  list: [],
  self: {},
};

export default function core(state = defaultState, action = {}) {
  switch (action.type) {
    case LOAD_LIST:
      const { list = [], self = {} } = action.payload;
      return {
        ...state,
        list,
        self,
      };
    default:
      return state;
  }
}
