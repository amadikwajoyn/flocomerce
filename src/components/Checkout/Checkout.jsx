import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Checkout.css";
import { Modal } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";
import { useNavigate } from "react-router-dom"

function Checkout() {
  const userData = JSON.parse(localStorage.getItem("chomp-food-user")) || null;
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [inputs, setInputs] = useState({});
  const [show, setShow] = useState(false)
  const navigate = useNavigate()

  const handleClose = () => setShow(!show)

  const onChange = ({ target: { name, value } }) => {
    setInputs({ ...inputs, [name]: value });
  };

  const getCarts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://chomp-food.herokuapp.com/user/viewCart",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.data.token}`,
          },
        }
      );
      setProducts(data.usersCartItems);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error.response);
    }
  };

  const onSubmit = (e) => {
    if (!products.length) return
    handleClose()
  }

  useEffect(() => {
    getCarts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <h2>Checkout Flowers</h2>
      <p>NOTE: Kindly Confirm your products before checking out.</p>
      <div className="row">
      <Modal show={show} onHide={() => {}}>
        <Modal.Body>Order has been made. Item(s) will be sent to with the next 14 days</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => {
            handleClose()
            navigate('/')
          }}>
            Go to Home
          </Button>
        </Modal.Footer>
      </Modal>
        <div className="col-75">
          <div className="container">
            <form onSubmit={onSubmit}>
              <div className="row">
                <div className="col-50">
                  <h3>Billing Address</h3>
                  <label for="fname">
                    <i className="fa fa-user"></i> Full Name
                  </label>
                  <input
                    type="text"
                    id="fname"
                    name="firstname"
                    placeholder="John M. Doe"
                    className=" form-control"
                    onChange={onChange}
                    required
                  />
                  <label for="email">
                    <i className="fa fa-envelope"></i> Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    className=" form-control"
                    onChange={onChange}
                    required
                  />
                  <label for="adr">
                    <i className="fa fa-address-card-o"></i> Address
                  </label>
                  <input
                    type="text"
                    id="adr"
                    name="address"
                    placeholder="542 W. 15th Street"
                    onChange={onChange}
                    className=" form-control"
                    required
                  />
                  <label for="city">
                    <i className="fa fa-institution"></i> City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="New York"
                    onChange={onChange}
                    className=" form-control"
                    required
                  />

                  <div className="row">
                    <div className="col-50">
                      <label for="state">State</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        placeholder="NY"
                        onChange={onChange}
                    className=" form-control"
                        required
                      />
                    </div>
                    <div className="col-50">
                      <label for="zip">Zip</label>
                      <input
                        type="text"
                        id="zip"
                        name="zip"
                        placeholder="10001"
                        onChange={onChange}
                        className=" form-control"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="col-50">
                  <h3>Payment</h3>
                  <label for="fname">Accepted Cards</label>
                  <div className="icon-container">
                    <i className="fa fa-cc-visa" style={{ color: "navy" }}></i>
                    <i className="fa fa-cc-amex" style={{ color: "blue" }}></i>
                    <i
                      className="fa fa-cc-mastercard"
                      style={{ color: "red" }}
                    ></i>
                    <i
                      className="fa fa-cc-discover"
                      style={{ color: "orange" }}
                    ></i>
                  </div>
                  <label for="cname">Name on Card</label>
                  <input
                    type="text"
                    id="cname"
                    name="cardname"
                    className=" form-control"
                    placeholder="John More Doe"
                    onChange={onChange}
                    required
                  />
                  <label for="ccnum">Credit card number</label>
                  <input
                    type="text"
                    id="ccnum"
                    name="cardnumber"
                    placeholder="1111-2222-3333-4444"
                    className=" form-control"
                    onChange={onChange}
                    required
                  />
                  <label for="expmonth">Exp Month</label>
                  <input
                    type="text"
                    id="expmonth"
                    name="expmonth"
                    placeholder="September"
                    className=" form-control"
                    onChange={onChange}
                    required
                  />
                  <div className="row">
                    <div className="col-50">
                      <label for="expyear">Exp Year</label>
                      <input
                        type="text"
                        id="expyear"
                        name="expyear"
                        placeholder="2018"
                    className=" form-control"
                        onChange={onChange}
                        required
                      />
                    </div>
                    <div className="col-50">
                      <label for="cvv">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        placeholder="352"
                    className=" form-control"
                        onChange={onChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <label>
                <input type="checkbox" checked="checked" name="sameadr" />{" "}
                Shipping address same as billing
              </label>
              <input
                type="submit"
                value="Continue to checkout"
                className="btn"
              />
            </form>
          </div>
        </div>
        <div className="col-25">
          <div className="container">
            {loading && <p className="text-center"></p>}
            <h4>
              Cart{" "}
              <span className="price" style={{ color: "black" }}>
                <i className="fa fa-shopping-cart"></i> <b>{products.length}</b>
              </span>
            </h4>
            {products.length &&
              products.map((product) => (
                <p key={product.id}>
                  <a href="/">{product.productName}</a>{" "}
                  <span className="price">${product.amount}</span>
                </p>
              ))}
            <hr />
            <p>
              Total{" "}
              <span className="price" style={{ color: "black" }}>
                <b>
                  $
                  {products.length
                    ? products.reduce(
                        (partialSum, a) => partialSum + a.amount,
                        0
                      )
                    : 0}
                </b>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
