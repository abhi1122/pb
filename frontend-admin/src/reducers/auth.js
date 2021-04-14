import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from '../actions/user';

const authenticated = localStorage.getItem('authenticated');
let user = localStorage.getItem('user');
console.log(user, typeof user);
export default function auth(
  state = {
    user: JSON.parse(user),
    isAuthenticated: authenticated,
  },
  action = {}
) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: !state.user ? action.payload : state.user,
        callTime: new Date().getTime(),
      };
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.payload,
      });
    case LOGOUT_SUCCESS:
      return { ...state, user: {}, isAuthenticated: false };
    default:
      return state;
  }
}
