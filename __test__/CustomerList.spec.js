/**
 * Customer list component test
 */

import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import CustomerList from '../src/components/CustomerList/CustomerList';

configure({ adapter: new Adapter() });

describe('>>> Customer list test', () => {
  const initialState = {
    customerList: {
      error: '',
      loading: false,
      data: {
        results: [
          {
            id: 1,
            name: 'Customer 1',
            phone: 9876543210,
          },
        ],
        pagination: {},
      },
    },
  };
  const mockStore = configureStore();
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <CustomerList page="1" />
        </Router>
      </Provider>
    );
  });

  it('+++ Component gets rendered', () => {
    expect(wrapper.find(CustomerList).length).toEqual(1);
  });

  it('+++ Props match with initialState', () => {
    expect(wrapper.find(CustomerList).prop('error')).toEqual(initialState.error);
    expect(wrapper.find(CustomerList).prop('loading')).toEqual(initialState.loading);
    expect(wrapper.find(CustomerList).prop('data')).toEqual(initialState.data);
  });

  it('+++ Contains table', () => {
    expect(wrapper.find('table').length).toEqual(1);
  });

  it('+++ Contains proper amount of rows', () => {
    expect(wrapper.find('tr').length).toEqual(2);
  });

  it('+++ Table contains the right data', () => {
    expect(wrapper.find('th').get(0).props.children).toBe('#');
    expect(wrapper.find('th').get(1).props.children).toBe('Name');
    expect(wrapper.find('th').get(2).props.children).toBe('Phone Number');
    expect(wrapper.find('th').get(3).props.children).toBe('Actions');
    expect(wrapper.find('td').get(0).props.children).toBe(1);
    expect(wrapper.find('td').get(1).props.children).toBe('Customer 1');
    expect(wrapper.find('td').get(2).props.children).toBe(9876543210);
  });

  it('+++ Capturing Snapshot of CustomerList', () => {
    const renderedValue = renderer.create(
      <Provider store={store}>
        <Router>
          <CustomerList page="1" />
        </Router>
      </Provider>
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});
