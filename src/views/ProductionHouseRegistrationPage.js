import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './ProductionHouseReg.css'; // Import custom CSS file

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false,
  });

  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({ ...formData, [name]: name === 'agreedToTerms' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.agreedToTerms) {
      // Handle form submission logic here
      console.log(formData);
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="registration-page">
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col md={6} className="form-container">
            <div class="image-container">
              <img src="castmeelogo.png" alt="Company Logo" class="company-logo mb-4" />
            </div>            <h2 className="mb-4">Sign In</h2>
            <Form onSubmit={handleSubmit}>
              {/* <Form.Group controlId="formBasicUsername">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </Form.Group> */}
              <br />

              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <br />


              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <br />

{/* 
              <Form.Group controlId="formBasicConfirmPassword">
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </Form.Group> */}

              <br />
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="I agree to the Terms and Conditions"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                  required
                  className="mb-3"
                />
              </Form.Group>

              {/* {showError && (
                <Alert variant="danger" className="mt-3">
                  You must agree to the terms and conditions.
                </Alert>
              )} */}



              <Button variant="primary" type="submit" className="btn-register">
                Login
              </Button>
              
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegistrationPage;
