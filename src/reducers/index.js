/**
 * index.js
 *
 * Combines all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import CustomerListReducer from './CustomerListReducer';
import CustomerInfoReducer from './CustomerInfoReducer';

export default function createReducer() {
  const rootReducer = combineReducers({
    customerList: CustomerListReducer,
    customerInfo: CustomerInfoReducer,
  });
  return rootReducer;
}
