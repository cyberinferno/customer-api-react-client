/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import createReducer from './reducers';
import rootSaga from './sagas';

export default function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    createReducer(),
    initialState,
    applyMiddleware(logger, sagaMiddleware)
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
