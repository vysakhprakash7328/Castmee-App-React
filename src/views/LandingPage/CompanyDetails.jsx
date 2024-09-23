import React, { useState } from "react";

const styles = {
  SelectText: {
    fontSize: "32px",
    fontWeight: 700,
    lineHeight: "42px",
    textAlign: "center",
    margin: "40px 0",
  },
  CardContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px", // Reduced gap between cards for smaller screens
    flexWrap: "wrap", // Allow cards to wrap to the next line on smaller screens
    maxWidth: "800px", // Limit card container width for responsiveness
    margin: "0 auto", // Center align on larger screens
  },
  Card: {
    width: "350px",
    height: "60px",
    backgroundColor: "#282828",
    borderRadius: "24px",
    padding: "10px", // Adjusted padding for input-like feel
    textAlign: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
    marginBottom: "20px", // Add bottom margin between cards
    cursor: "pointer", // Change cursor to pointer on hover
    transition: "transform 0.3s ease-in-out, border-color 0.3s ease-in-out", // Add smooth transition on hover
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid transparent", // Transparent border for initial state
  },
  TextAreaCard: {
    width: "700px",
    height: "70px",
    backgroundColor: "#282828",
    borderRadius: "24px",
    padding: "10px", // Adjusted padding for input-like feel
    textAlign: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
    marginBottom: "20px", // Add bottom margin between cards
    cursor: "pointer", // Change cursor to pointer on hover
    transition: "transform 0.3s ease-in-out, border-color 0.3s ease-in-out", // Add smooth transition on hover
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid transparent", // Transparent border for initial state
  },
  CardInput: {
    width: "100%",
    height: "100%",
    background: "transparent",
    border: "none",
    outline: "none",
    fontSize: "16px",
    color: "#fff",
    fontFamily: "inherit",
    fontWeight: "700",
    textAlign: "center",
    borderRadius: "22px", // Slightly less than Card's borderRadius for inner padding
  },
  MainText: {
    fontSize: "24px",
    fontWeight: 700,
    lineHeight: "32px",
    marginBottom: "12px",
  },
  Description: {
    fontSize: "16px",
    lineHeight: "24px",
  },
  genderCard: {
    width: "100px",
    height: "60px",
    backgroundColor: "#282828",
    borderRadius: "12px",
    padding: "10px", // Adjusted padding for input-like feel
    textAlign: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
    marginBottom: "20px", // Add bottom margin between cards
    cursor: "pointer", // Change cursor to pointer on hover
    transition: "transform 0.3s ease-in-out, border-color 0.3s ease-in-out", // Add smooth transition on hover
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid transparent", // Transparent border for initial state
  },
  Container: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    marginBottom: "16px",
  },
  CheckboxWrapper: {
    position: "relative",
    width: "20px",
    height: "20px",
    backgroundColor: "#393939",
    borderRadius: "4px",
    border: "2px solid #f4ec0b",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "8px",
  },
  Check: {
    color: "#f4ec0b",
    fontSize: "16px",
    display: "none",
  },
  CheckboxInput: {
    position: "absolute",
    opacity: 0,
    visibility: "hidden",
    width: "1px",
    height: "1px",
    pointerEvents: "none",
  },
};

const CompanyDetails = ({handleFormChange, formDataProducer}) => {
  return (
    <div>
      <div style={styles.SelectText}>Company Details</div>

      <div style={styles.CardContainer}>
        <div style={{ ...styles.Card }}>
          <input
            style={styles.CardInput}
            type="text"
            placeholder="Company Name"
            name = "company_name"
            value = {formDataProducer.company_name}
            onChange={handleFormChange}

          />
        </div>
        <div style={{ ...styles.Card }}>
          <input
            style={styles.CardInput}
            type="text"
            placeholder="Comapny Registration"
            onChange={handleFormChange}
            name = "company_registration"
            value = {formDataProducer.company_registration}
          />
        </div>
        <div style={{ ...styles.Card }}>
          <input
            style={styles.CardInput}
            type="text"
            placeholder="Company Address"
            onChange={handleFormChange}
            name = "company_address"
            value = {formDataProducer.company_address}
          />
        </div>
        <div style={{ ...styles.Card }}>
          <input
            style={styles.CardInput}
            type="text"
            placeholder="Tax Identification No"
            onChange={handleFormChange}
            name = "tid"
            value = {formDataProducer.tid}
          />
        </div>
       
      </div>
    </div>
  );
};

export default CompanyDetails;
