/**
 * Customer info component test
 */

import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import CustomerInfo from '../src/components/CustomerInfo/CustomerInfo';

configure({ adapter: new Adapter() });

describe('>>> Customer info test', () => {
  const initialState = {
    customerInfo: {
      error: '',
      loading: false,
      data: {
        id: 1,
        name: 'Customer 1',
        address: '#1 Nice Apartments, 5th cross, Bengaluru 560001',
        country: 'India',
        phone: 9876543210,
        created_at: '2020-06-25T00:00:00.000Z',
        updated_at: '2020-06-25T00:00:00.000Z',
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
          <CustomerInfo id="1" />
        </Router>
      </Provider>
    );
  });

  it('+++ Component gets rendered', () => {
    expect(wrapper.find(CustomerInfo).length).toEqual(1);
  });

  it('+++ Props match with initialState', () => {
    expect(wrapper.find(CustomerInfo).prop('error')).toEqual(initialState.error);
    expect(wrapper.find(CustomerInfo).prop('loading')).toEqual(initialState.loading);
    expect(wrapper.find(CustomerInfo).prop('data')).toEqual(initialState.data);
  });

  it('+++ Contains table', () => {
    expect(wrapper.find('table').length).toEqual(1);
  });

  it('+++ Contains proper amount of rows', () => {
    expect(wrapper.find('tr').length).toEqual(7);
  });

  it('+++ Table contains the right data', () => {
    expect(wrapper.find('th').get(0).props.children).toBe('ID');
    expect(wrapper.find('th').get(1).props.children).toBe('Name');
    expect(wrapper.find('th').get(2).props.children).toBe('Address');
    expect(wrapper.find('th').get(3).props.children).toBe('Country');
    expect(wrapper.find('th').get(4).props.children).toBe('Phone Number');
    expect(wrapper.find('th').get(5).props.children).toBe('Created At');
    expect(wrapper.find('th').get(6).props.children).toBe('Updated At');
    expect(wrapper.find('td').get(0).props.children).toBe(1);
    expect(wrapper.find('td').get(1).props.children).toBe('Customer 1');
    expect(wrapper.find('td').get(2).props.children).toBe('#1 Nice Apartments, 5th cross, Bengaluru 560001');
    expect(wrapper.find('td').get(3).props.children).toBe('India');
    expect(wrapper.find('td').get(4).props.children).toBe(9876543210);
    expect(wrapper.find('td').get(5).props.children).toBe('2020-06-25T00:00:00.000Z');
    expect(wrapper.find('td').get(6).props.children).toBe('2020-06-25T00:00:00.000Z');
  });

  it('+++ Capturing Snapshot of CustomerInfo', () => {
    const renderedValue = renderer.create(
      <Provider store={store}>
        <Router>
          <CustomerInfo id="1" />
        </Router>
      </Provider>
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});
