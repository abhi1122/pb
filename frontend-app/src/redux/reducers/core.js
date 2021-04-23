import { ADD_CORE, REMOVE_CORE } from '../actions/core';

const defaultState = {
  appVersion: '0.1',
  showHeader: true,
  showMenu: true,
  apiHostUrl: '',
};

export default function core(state = defaultState, action = {}) {
  switch (action.type) {
    case ADD_CORE:
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
