import React, { useState } from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import "./PostProduct.css";

function PostProduct() {
  const userData = JSON.parse(localStorage.getItem("chomp-food-user")) || null;
  const [inputs, setInputs] = useState({
    category: "SIDES",
    name: "",
    description: "",
    price: 0,
    image: "",
  });
  const { image, name, description, price } = inputs;
  const [registrationDone, setRegistrationDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorOnRegistration, setErrorOnRegistration] = useState(false);

  const onChange = ({ target: { name, value } }) => {
    setInputs({ ...inputs, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://chomp-food.herokuapp.com/admin/additem",
        { ...inputs, price: parseFloat(inputs.price) },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.data.token}`,
          },
        }
      );
      console.log("Add item", data);
      setRegistrationDone(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorOnRegistration(true);
      console.error(error.response);
    }
  };
  return (
    <div className="post-product">
      <h3>Add Product</h3>
      <Alert
        show={registrationDone}
        onClose={() => setRegistrationDone(false)}
        variant="success"
        dismissible
      >
        Item has been added.
      </Alert>
      <Alert
        variant="danger"
        show={errorOnRegistration}
        onClose={() => setErrorOnRegistration(false)}
        dismissible
      >
        An error occurred while adding item.
      </Alert>
      <Form onSubmit={onSubmit}>
        <Form.Group
          className="form-texts"
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </Form.Group>
        <Form.Group className="form-texts" controlId="exampleForm.">
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={description}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="form-texts" controlId="exampleForm.">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={price}
            onChange={onChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formFile" className="form-texts">
          <Form.Label>Upload Image Url</Form.Label>
          <Form.Control type="url" onChange={onChange} name="image" placeholder="https://" value={image} required />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            "Post Product"
          )}
        </Button>
      </Form>
    </div>
  );
}

export default PostProduct;
