import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Cart } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { addToCart } from '../actions/cartActions';

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = location.search ? location.search.split('=')[1] : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return (
    <div>
      <h1>Cart</h1>
    </div>
  );
};

export default CartScreen;