import React, { useState } from "react";
import SignupHeader from "./SignupHeader";
import castmeelogo from '../../assets/img/castmeehead.png';

const styles = {
  Screen: {
    backgroundColor: "#161616",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "20px",
    fontFamily: 'Nanum Gothic',
    color: '#ffffff',
  },
  SelectText: {
    fontSize: '32px',
    fontWeight: 700,
    lineHeight: '42px',
    textAlign: 'center',
    margin: '40px 0',
  },
  FormContainer: {
    maxWidth: '600px',
    width: '100%',
    backgroundColor: '#282828',
    borderRadius: '24px',
    padding: '40px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
    boxSizing: 'border-box',
  },
  FormGroup: {
    marginBottom: '20px',
  },
  FormLabel: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '18px',
    fontWeight: 700,
  },
  FormInput: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #3a3a3a',
    backgroundColor: '#1f1f1f',
    color: '#ffffff',
    fontSize: '16px',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.3s ease-in-out',
    '&:focus': {
      borderColor: '#f4ec0b',
    },
  },
  SubmitButton: {
    marginTop: '20px',
    padding: '12px 24px',
    backgroundColor: '#f4ec0b',
    color: '#282828',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: 700,
    cursor: 'pointer',
    outline: 'none',
    transition: 'background-color 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: '#e3da00',
    },
  },
};

const SignupStep1 = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    location: '',
    dob: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic here
    console.log(formData);
    // Redirect to the next step or perform further actions
  };

  return (
    <div style={styles.Screen}>
      <SignupHeader />

      <div style={styles.SelectText}>Fill in Your Personal Details</div>

      <form style={styles.FormContainer} onSubmit={handleSubmit}>
        <div style={styles.FormGroup}>
          <label style={styles.FormLabel} htmlFor="firstName">First Name</label>
          <input
            style={styles.FormInput}
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div style={styles.FormGroup}>
          <label style={styles.FormLabel} htmlFor="lastName">Last Name</label>
          <input
            style={styles.FormInput}
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div style={styles.FormGroup}>
          <label style={styles.FormLabel} htmlFor="gender">Gender</label>
          <input
            style={styles.FormInput}
            type="text"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          />
        </div>

        <div style={styles.FormGroup}>
          <label style={styles.FormLabel} htmlFor="location">Location</label>
          <input
            style={styles.FormInput}
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
        </div>

        <div style={styles.FormGroup}>
          <label style={styles.FormLabel} htmlFor="dob">Date of Birth</label>
          <input
            style={styles.FormInput}
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" style={styles.SubmitButton}>Continue</button>
      </form>
    </div>
  );
};

export default SignupStep1;
