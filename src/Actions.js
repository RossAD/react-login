import {
  SET_JWT,
  UNSET_JWT
} from './Constants';

export function setJwt(jwt) {
  return {
    type: SET_JWT,
    token
  };
}

export function unsetJwt() {
  return {
    type: UNSET_JWT
  };
}