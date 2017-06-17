import {
  SET_JWT,
  UNSET_JWT
} from './Constants';

export function authenticate(state = {}, action) {
  switch(action.type) {
    case SET_JWT:
      return {
        ...state,
        token: action.token
      };
    case UNSET_JWT:
      return {};
    default:
      return state;
  }
}