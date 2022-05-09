import React, { useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import axios from "axios";

function Signup() {
  const [inputs, setInputs] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [registrationDone, setRegistrationDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorOnRegistration, setErrorOnRegistration] = useState(false);

  const { email, firstName, lastName, password } = inputs;

  const onChange = ({ target: { name, value } }) => {
    setInputs({ ...inputs, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://chomp-food.herokuapp.com/auth/signup",
        { ...inputs },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Sign Up", data);
      setRegistrationDone(true);
      setErrorOnRegistration(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorOnRegistration(true);
      console.error(error.response);
    }
  };
  return (
    <div className="tab-content-wrapper">
      <div>
        <h4>Register to Access Products</h4>
        <h5>Signin to stay connected</h5>
        <Alert
          show={registrationDone}
          onClose={() => setRegistrationDone(false)}
          variant="success"
          dismissible
        >
          Sign up successful. An email validation link has been sent to your
          mail. Please check and confirm.
        </Alert>
        <Alert
          variant="danger"
          show={errorOnRegistration}
          onClose={() => setErrorOnRegistration(false)}
          dismissible
        >
          An error occurred while registering the user
        </Alert>
      </div>
      <div>
        <Form onSubmit={onSubmit}>
          <Form.Group className="form-texts" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={onChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="form-texts" controlId="formBasicEmail">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First Name"
              name="firstName"
              value={firstName}
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group className="form-texts" controlId="formBasicEmail">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Last Name"
              name="lastName"
              value={lastName}
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group className="form-texts" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />{" "}
            Show Password
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
              "Sign up"
            )}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Signup;
