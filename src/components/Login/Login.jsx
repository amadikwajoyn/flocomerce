import React, { useState } from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [loginDone, setLoginDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorOnLogin, setErrorOnLogin] = useState(false);
  const navigate = useNavigate();

  const { email, password } = inputs;

  const onChange = ({ target: { name, value } }) => {
    setInputs({ ...inputs, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://chomp-food.herokuapp.com/auth/login",
        { ...inputs },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const redirectLink = data.role === "ADMIN" ? "/dashboard" : "/";
      const stringifyData = JSON.stringify({ data, isLoggedin: true });
      localStorage.setItem("chomp-food-user", stringifyData);
      setLoginDone(true);
      setLoading(false);
      setErrorOnLogin(false);
      navigate(redirectLink);
    } catch (error) {
      setLoading(false);
      setErrorOnLogin(true);
      console.error(error.response);
    }
  };
  return (
    <div className="tab-content-wrapper">
      <div>
        <h4>Welcome Back!</h4>
        <h5>Signin to stay connected</h5>
        <Alert
          show={loginDone}
          onClose={() => setLoginDone(false)}
          variant="success"
          dismissible
        >
          Sign in successful.
        </Alert>
        <Alert
          variant="danger"
          show={errorOnLogin}
          onClose={() => setErrorOnLogin(false)}
          dismissible
        >
          An error occurred.
        </Alert>
      </div>
      <div>
        <Form onSubmit={onSubmit}>
          <Form.Group className=" form-texts" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={onChange}
              value={email}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className=" form-texts" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={onChange}
              placeholder="Password"
              value={password}
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
              "Sign in"
            )}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
