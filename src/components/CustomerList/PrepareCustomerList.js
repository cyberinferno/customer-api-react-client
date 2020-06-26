/**
 * Returns customer list component by inserting current page number
 */

import React from 'react';
import { useLocation } from 'react-router-dom';

import CustomerList from './CustomerList';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function PrepareCustomerList() {
  const query = useQuery();
  return (<CustomerList page={query.get('page')} />);
}

export default PrepareCustomerList;
