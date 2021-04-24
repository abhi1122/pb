import { callHttpRequestWithLoading } from '../../helpers/services';

export const LOAD_LIST = `LOAD_TEMPLATE_LIST`;

export function loadList(data) {
  return {
    type: LOAD_LIST,
    payload: data,
  };
}

export function getTemplate(query, isEdit = false) {
  return async (dispatch) => {
    const {
      data: [data],
    } = await callHttpRequestWithLoading('post', 'templates/list', query);
    dispatch(loadList(data));
  };
}
