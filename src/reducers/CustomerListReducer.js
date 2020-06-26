/**
 * Customer list reducers
 */

import {
  START_LIST_FETCH,
  FINISH_LIST_FETCH,
  FETCH_ERROR,
} from '../constants';

const INITIAL_STATE = {
  data: {},
  loading: false,
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_LIST_FETCH:
      return { ...state, loading: true, error: '' };
    case FINISH_LIST_FETCH:
      return { ...state, data: action.payload, loading: false, error: '' };
    case FETCH_ERROR:
        return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
