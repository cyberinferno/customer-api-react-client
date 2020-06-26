/**
 * Customer info component
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchCustomerInfoStarted } from '../../actions';

class CustomerInfo extends Component {
  componentDidMount() {
    const { id } = this.props;
    this.props.fetchCustomerInfoStarted(id);
  }

  renderCustomerInfo() {
    const { data } = this.props;
    let content;
    if (typeof data.errors !== 'undefined') {
      content = <b>{data.errors[0].msg}</b>;
    } else {
      content = JSON.stringify(data);
      const keyMap = {
        id: 'ID',
        name: 'Name',
        phone: 'Phone Number',
        address: 'Address',
        country: 'Country',
        created_at: 'Created At',
        updated_at: 'Updated At',
      };
      const rows = [];
      Object.keys(data).forEach((key) => {
        rows.push(
          <tr key={key}>
            <th>{keyMap[key] ? keyMap[key] : key}</th>
            <td>{data[key]}</td>
          </tr>
        );
      });
      content = <table className="table table-bordered"><tbody>{rows}</tbody></table>;
    }
    return (
      <div>
        <div className="row">
          <div className="col-sm-8">
            {content}
          </div>
        </div>
        <div className="row" style={{ marginTop: '20px' }}>
          <div className="col-sm-12">
            <Link to="/" className="btn btn-danger">Back</Link>
          </div>
        </div>
      </div>
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
        content = this.renderCustomerInfo();
      }
    }
    return (
      <div>
        {content}
      </div>
    );
  }
}

CustomerInfo.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  fetchCustomerInfoStarted: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  id: PropTypes.string,
};

const mapStateToProps = (state) => {
  const {
    loading,
    data,
    error,
  } = state.customerInfo;

  return {
    loading,
    data,
    error,
  };
};

export default connect(
  mapStateToProps,
  {
    fetchCustomerInfoStarted,
  }
)(CustomerInfo);
