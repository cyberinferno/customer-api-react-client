/**
 * Customer
 */

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import CustomerList from './components/CustomerList/PrepareCustomerList';
import CustomerInfo from './components/CustomerInfo/PrepareCustomerInfo';

function App() {
  return (
    <div className="container" style={{ marginTop: '40px' }}>
      <h1>Customer Info</h1>
      <div className="row" style={{ marginTop: '50px' }}>
        <div className="col-sm-12">
          <Router>
            <Switch>
              <Route exact path="/">
                <CustomerList />
              </Route>
              <Route path="/customer/:id">
                <CustomerInfo />
              </Route>
              <Route path="*">
                <h2>Page not found!</h2>
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
