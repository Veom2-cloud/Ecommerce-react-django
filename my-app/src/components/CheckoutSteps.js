import React from "react";
import { Nav, Row} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
      <Row>
    <Nav className = 'justify-content-center mb-3'>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link diabled>Login</Nav.Link>
        )}
        </Nav.Item>
        <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link diabled>Shipping</Nav.Link>
        )}
        </Nav.Item>
        <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link diabled>Payment</Nav.Link>
        )}
        </Nav.Item>
        <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>PlaceOrder</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link diabled>PlaceOrder</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
    </Row>
  );
}

export default CheckoutSteps;
