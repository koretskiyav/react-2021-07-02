//import { useEffect } from 'react';
import { connect } from 'react-redux';
//import Product from '../product';
import PropTypes from 'prop-types';
import Order from './../order/order';
function Bucket({ amount }) {
  return <div>This is Bucket</div>;
}
const mapStateToProps = (state, props) => ({
  amount: state.order[props.product.id] || 0,
});
export default connect(mapStateToProps)(Bucket);
