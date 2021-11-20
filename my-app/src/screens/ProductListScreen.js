import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/loader";
import Message from "../components/message";
import Paginate from "../components/Paginate";
import { useDispatch, useSelector } from "react-redux";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
function ProductListScreen({ history, match }) {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products ,page,pages} = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let keyword = history.location.search

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo.isAdmin) {
      history.push("/login");
    }
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts(keyword));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    keyword
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete ? ")) {
      dispatch(deleteProduct(id));
    }
  };
  const CreateProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-center">
          <Button className="my-3" onClick={CreateProductHandler}>
            <i className="fa fa-plus"> </i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="red">{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="red">{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="red">{error}</Message>
      ) : (
        <div>
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category} </td>
                <td>{product.brand} </td>

                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                      Edit
                    </Button>
                  </LinkContainer>
                </td>
                <td>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Paginate pages={pages} page = {page} isAdmin = {true}></Paginate>
        </div>
      )}
    </div>
  );
}

export default ProductListScreen;
