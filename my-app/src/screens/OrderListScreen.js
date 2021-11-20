import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import Loader from "../components/loader";
import Message from "../components/message";
import { useDispatch, useSelector } from "react-redux";
import {  listOrders ,deleteOrder} from "../actions/orderAction";

function OrderListScreen({history}) {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);

  const { loading, error, orders } = orderList;
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;
  
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete ? ")) {
      dispatch(deleteOrder(id));
    }
  };

  useEffect(() => {
    if(userInfo && userInfo.isAdmin){
      dispatch(listOrders());

    }else {
      history.push('/login')
    }
  }, [dispatch,history,userInfo,successDelete]);

 

  return (
    <div>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="red">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL PRICE</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createAt.substring(0,10)}</td>
                <td>{order.totalPrice}</td>
                <td> {order.isPaid ? (
                    order.paidAt.substring(0,10)
                ): (
                    <i className='fas fa-check' style = {{color : 'red'}}></i>
                )}</td>
                <td> {order.isDelivered ? (
                    order.deliveredAt.substring(0,10)
                ): (
                    <i className='fas fa-check' style = {{color : 'red'}}></i>
                )}</td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                    Details
                    </Button>
                    
                  </LinkContainer>
                  </td>
                  <td>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(order._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
                  
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default OrderListScreen;
