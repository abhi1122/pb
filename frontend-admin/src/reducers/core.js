import { ADD_CORE, REMOVE_CORE } from '../actions/core';

const defaultState = { loading: false };
export default function core(state = defaultState, action = {}) {
  switch (action.type) {
    case ADD_CORE:
      console.log(action, '.......action.payload))))))');
      return {
        ...state,
        ...action.payload,
      };
    case REMOVE_CORE:
      delete state[action.payload.data];
      return { ...state };
    default:
      return state;
  }
}
