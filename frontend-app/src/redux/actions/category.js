import { callHttpRequestWithLoading } from '../../helpers/services';

export const LOAD_LIST = `LOAD_CATEGORY_LIST`;

export function loadList(data) {
  return {
    type: LOAD_LIST,
    payload: data,
  };
}

export function getCategoryList(query, isEdit = false) {
  return async (dispatch) => {
    const {
      data: [data],
    } = await callHttpRequestWithLoading('post', 'categories/list', query);
    dispatch(loadList(data));
  };
}
