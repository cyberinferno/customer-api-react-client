/**
 * Returns customer info component by inserting id param
 */

import React from 'react';
import { useParams } from 'react-router-dom';
import CustomerInfo from './CustomerInfo';

function PrepareCustomerInfo() {
  const { id } = useParams();
  return (<CustomerInfo id={id} />);
}

export default PrepareCustomerInfo;
