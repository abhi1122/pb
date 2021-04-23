export const ADD_CORE = 'ADD_CORE';
export const REMOVE_CORE = 'REMOVE_CORE';

export function addCore(data) {
  return {
    type: ADD_CORE,
    payload: data,
  };
}

export function removeCore(data) {
  return {
    type: REMOVE_CORE,
    payload: data,
  };
}
