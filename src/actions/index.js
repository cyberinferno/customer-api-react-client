/**
 * Actions available in the app
 */

import {
  START_LIST_FETCH,
  FINISH_LIST_FETCH,
  START_INFO_FETCH,
  FINISH_INFO_FETCH,
  FETCH_ERROR,
} from '../constants';

export const fetchCustomersStarted = (page = 1) => ({
  type: START_LIST_FETCH,
  page,
});

export const fetchCustomersSuccess = (data) => ({
  type: FINISH_LIST_FETCH,
  payload: data,
});

export const fetchCustomerInfoStarted = (id) => ({
  type: START_INFO_FETCH,
  id,
});

export const fetchCustomerInfoSuccess = (data) => ({
  type: FINISH_INFO_FETCH,
  payload: data,
});

export const fetchError = (errorMessage) => ({
  type: FETCH_ERROR,
  payload: errorMessage,
});
