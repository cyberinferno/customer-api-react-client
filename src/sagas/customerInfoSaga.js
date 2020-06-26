/**
 * Customer info saga
 */

import { takeLatest, put } from 'redux-saga/effects';
import {
  START_INFO_FETCH,
} from '../constants';
import { fetchCustomerInfoSuccess, fetchError } from '../actions';

function* fetchCustomerInfoSaga(payload) {
  try {
    const taskResponse = yield fetch(`/customer/${payload.id}`);
    const data = yield taskResponse.json();
    yield put(fetchCustomerInfoSuccess(data));
  } catch (error) {
    yield put(fetchError(error.message));
  }
}

export function* customerInfoSaga() {
  yield takeLatest(START_INFO_FETCH, fetchCustomerInfoSaga);
}
