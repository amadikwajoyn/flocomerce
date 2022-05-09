import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { ReactComponent as Cart } from "../../assets/cart.svg"
import "./Navbox.css";

function Navbox() {
  const userData = JSON.parse(localStorage.getItem("chomp-food-user")) || null;
  const isLoggedin = userData && userData.isLoggedin;
  const isAdmin = isLoggedin && userData.data && userData.data.role === 'ADMIN';
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        className="navbox-container"
      >
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link
                href={isLoggedin ? "/" : "auth"}
                onClick={() =>
                  isLoggedin ? localStorage.removeItem("chomp-food-user") : null
                }
              >
                {isLoggedin ? "Logout" : "Login"}
              </Nav.Link>
              {isLoggedin && (
                <Nav.Link eventKey={2} href="checkout">
                  <Cart />
                </Nav.Link>
              )}
              {isAdmin && (
                <Nav.Link eventKey={2} href="dashboard">
                  Dashboard
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navbox;
