import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProducts, deleteProduct } from '../actions/productActions';

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.productList);
  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state) => state.productDelete);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      return dispatch(listProducts());
    }
    history.push('/signin');
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = (product) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      // dispatch(deleteUser(id));
    }
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus" /> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message varaint="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/user/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit" />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;
