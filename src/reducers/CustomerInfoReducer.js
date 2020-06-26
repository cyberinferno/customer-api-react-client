/**
 * Customer info reducers
 */

import {
  START_INFO_FETCH,
  FINISH_INFO_FETCH,
  FETCH_ERROR,
} from '../constants';

const INITIAL_STATE = {
  data: {},
  loading: false,
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_INFO_FETCH:
      return { ...state, loading: true };
    case FINISH_INFO_FETCH:
      return { ...state, data: action.payload, loading: false };
    case FETCH_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
