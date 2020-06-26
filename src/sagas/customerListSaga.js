/**
 * Customer list saga
 */

import { takeLatest, put } from 'redux-saga/effects';
import {
  START_LIST_FETCH,
} from '../constants';
import { fetchCustomersSuccess, fetchError } from '../actions';

function* fetchCustomerListSaga(payload) {
  try {
    const page = payload.page || 1;
    const taskResponse = yield fetch(`/customer?page=${page}`);
    const data = yield taskResponse.json();
    yield put(fetchCustomersSuccess(data));
  } catch (error) {
    yield put(fetchError(error.message));
  }
}

export function* customerListSaga() {
  yield takeLatest(START_LIST_FETCH, fetchCustomerListSaga);
}
