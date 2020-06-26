/**
 * Root saga which combines all sagas
 */

import { fork } from 'redux-saga/effects';
import { customerListSaga } from './customerListSaga';
import { customerInfoSaga } from './customerInfoSaga';

export default function* rootSaga() {
  yield fork(customerListSaga);
  yield fork(customerInfoSaga);
}
