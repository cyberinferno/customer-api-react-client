/**
 * Customer list component
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchCustomersStarted } from '../../actions';

class CustomerList extends Component {
  componentDidMount() {
    const { page } = this.props;
    if (page !== null) {
      this.props.fetchCustomersStarted(page);
    } else {
      this.props.fetchCustomersStarted();
    }
  }

  componentDidUpdate() {
    const { page, data } = this.props;
    if (typeof data.pagination !== 'undefined' && page !== null && parseInt(page, 10) !== parseInt(data.pagination.current, 10)) {
      this.props.fetchCustomersStarted(page);
    }
  }

  renderCustomerData() {
    const { data } = this.props;
    if (typeof data.results === 'undefined') {
      return (
        <div className="row">
          <div className="col-sm-8">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      );
    }
    return (
      <div className="row">
        <div className="col-sm-8">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.results.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td><Link to={`/customer/${item.id}`}>View Details</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  renderPagination() {
    const { loading, error, data } = this.props;
    if (loading || error !== '' || typeof data.pagination === 'undefined') {
      return ('');
    }
    const { pagination } = data;
    const buttons = [];
    if (pagination.current === 1 || pagination.total === 1) {
      buttons.push(<li key="prev" className="page-item disabled"><span className="page-link">Previous</span></li>);
    } else {
      buttons.push(<li key="prev" className="page-item"><Link className="page-link" to={`?page=${pagination.current - 1}`}>Previous</Link></li>);
    }
    for (let i = 1; i <= pagination.total; i++) {
      if (pagination.current === i) {
        buttons.push(<li key={i} className="page-item active"><span className="page-link">{i}</span></li>);
      } else {
        buttons.push(<li key={i} className="page-item"><Link className="page-link" to={`?page=${i}`}>{i}</Link></li>);
      }
    }
    if (pagination.current === pagination.total) {
      buttons.push(<li key="next" className="page-item disabled"><span className="page-link">Next</span></li>);
    } else {
      buttons.push(<li key="next" className="page-item"><Link className="page-link" to={`?page=${pagination.current + 1}`}>Next</Link></li>);
    }
    return (
      <nav>
        <ul className="pagination">
          {buttons}
        </ul>
      </nav>
    );
  }

  render() {
    let content;
    const { loading, error } = this.props;
    if (loading) {
      content = <b>Loading...</b>;
    } else {
      if (error !== '') {
        content = <b>error</b>;
      } else {
        content = this.renderCustomerData();
      }
    }
    return (
      <div>
        {content}
        {this.renderPagination()}
      </div>
    );
  }
}

CustomerList.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  fetchCustomersStarted: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  page: PropTypes.string,
};

const mapStateToProps = (state) => {
  const {
    loading,
    data,
    error,
  } = state.customerList;

  return {
    loading,
    data,
    error,
  };
};

export default connect(
  mapStateToProps,
  {
    fetchCustomersStarted,
  }
)(CustomerList);
