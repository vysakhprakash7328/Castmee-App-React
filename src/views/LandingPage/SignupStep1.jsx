import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import SignupHeader from "./SignupHeader";
import RoleSelection from "./RoleSelection";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import PersonalDetails from "./PersonalDetails";
import DobSelection from "./DateofbirthSelection";
import UploadPhotos from "./UploadPhotos";
import ProductionHousePersonalDetails from "./ProductionHousePersonalDetails";
import TypeSelection from "./ProductionHouseTypeSelection";
import FreelancerDetails from "./FreelancerDetails";
import CompanyDetails from "./CompanyDetails";
import VerifyDetails from "./VerifyDetails";
import axios from "axios";
import apiEndpoint from "views/Services/ApiConfig";
import { useLocation } from "react-router-dom";

const styles = {
  Screen: {
    backgroundColor: "#161616",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "20px",
    fontFamily: "Nanum Gothic",
    color: "#ffffff",
    overflowY: "auto",
    position: "relative",
  },
  RoleSelectionContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "40px",
  },
  NextSymbol: {
    position: "fixed",
    right: "10px", // Adjusted for mobile screens
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "40px", // Decreased font size
    color: "#f4ec0b",
    cursor: "pointer",
    transition: "transform 0.3s ease-in-out",
    zIndex: 1000,
  },
  PrevSymbol: {
    position: "fixed",
    left: "10px", // Adjusted for mobile screens
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "40px", // Decreased font size
    color: "#f4ec0b",
    cursor: "pointer",
    transition: "transform 0.3s ease-in-out",
    zIndex: 1000,
  },
  StepperContainer: {
    position: "fixed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 1000,
  },
  Stepper: {
    width: "20px",
    height: "10px",
    backgroundColor: "#3a3a3a",
    borderRadius: "9999px",
    margin: "0 10px",
    transition: "width 0.3s ease-in-out",
  },
  ActiveStepper: {
    width: "100px",
    backgroundColor: "#f4ec0b",
  },
};

const SignupStep1 = () => {
  const history = useHistory();
  const location = useLocation();
  const formData = location.state.SignupformData;
  const [signupStep, setSignupStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedProductionType, setSelectedProductionType] = useState(null);
  const [formDataArtistSignup, setformDataArtistSignup] = useState({
    username: formData.username,
    password: formData.password,
    confirm_password: formData.Repeatpassword,
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    gender: "",
    date_of_birth: "",
  });
  const [formDataProducerSignup, setformDataProducerSignup] = useState({
    username: formData.username,
    password: formData.password,
    confirm_password: formData.Repeatpassword,
    email: "",
    first_name: "",
    last_name: "",
    user_type: "",
    company_name: "",
    company_registration: "",
    company_address: "",
    contact_no: "",
    offcl_mmbrship_or_assction_rltd_to_film_prdction: false,
    membership_id: "",
    membership_name: "",
    reference_id: "",
    reference_contact_no: "",
    project_name: "",
    project_location: "",
    project_type: "",
    worked_projects: "",
    tid: "",
  });

  const handleArtistFormChange = (event) => {
    const { name, value, checked, type } = event.target;
    let newValue;
    if (type === "checkbox") {
      newValue = checked;
    } else if (type === "radio") {
      newValue = value;
    } else {
      newValue = value;
    }
    setformDataArtistSignup((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  const handleProducerFormChange = (event) => {
    const { name, value, checked, type } = event.target;
    let newValue;
    if (type === "checkbox") {
      newValue = checked;
    } else if (type === "radio") {
      newValue = value;
    } else {
      newValue = value;
    }
    setformDataProducerSignup((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  const handleSubmit = () => {
    if (selectedRole === "artist") {
      
      handleArtistSignupSubmit();
    } else if (selectedRole === "production") {
      handleProducerSignupSubmit();
    }
  };

  useEffect(() => {
       
    // console.log(formDataArtistSignup, "formData");
    // console.log(formDataArtistSignup, "formDataArtist");
    console.log(formDataProducerSignup)
  });

  const handleArtistSignupSubmit = async () => {
    try {
     
      if (
        formDataArtistSignup.username !== "" ||
        formDataArtistSignup.password !== "" ||
        formDataArtistSignup.confirm_password !== ""
      ) {
        const response = await axios.post(
          apiEndpoint + "/api/artist_registration/",
          formDataArtistSignup
        );
        console.log(response.data);
        alert("Registration successful");
        history.push('/home')
      } else {
        alert("Failed due to invalid data");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Error while storing....", error);
    }
  };

  const handleProducerSignupSubmit = async () => {
    try {
      if (
        formDataArtistSignup.username !== "" ||
        formDataArtistSignup.password !== "" ||
        formDataArtistSignup.confirm_password !== ""
      ) {
      const response = await axios.post(
        apiEndpoint + "/api/producer_registration/",
        formDataProducerSignup
      );
      console.log(response.data);
      alert("Registration successful");
      history.push('/home')

    }
    else{
      alert("Failed due to invalid data");

    }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Error while storing....", error);
    }
  };

  const handleSelectRole = (role) => {
    setSelectedRole(role);
  };

  const handleSelectedProductionType = (user_type) => {
    setformDataProducerSignup((prevFormData) => ({
      ...prevFormData,
      user_type,
    }));
    setSelectedProductionType(user_type);
  };

  const handleNextStep = () => {
    setSignupStep(signupStep + 1);
  };

  const handlePrevStep = () => {
    setSignupStep(signupStep - 1);
  };

  return (
    <div style={styles.Screen}>
      <SignupHeader step={signupStep} selectedRole={selectedRole} />
      <div style={styles.RoleSelectionContainer}>
        {selectedRole === "artist" ? (
          <>
            {signupStep === 2 && (
              <PersonalDetails
                handleFormChange={handleArtistFormChange}
                formDataArtist={formDataArtistSignup}
                setformDataArtistSignup={setformDataArtistSignup}
              />
            )}
            {signupStep === 3 && <UploadPhotos />}
          </>
        ) : selectedRole === "production" ? (
          <>
            {signupStep === 2 && (
              <ProductionHousePersonalDetails
                handleFormChange={handleProducerFormChange}
                formDataProducer={formDataProducerSignup}
              />
            )}
            {signupStep === 3 && (
              <TypeSelection
                handleSelectedProductionType={handleSelectedProductionType}
                handleFormChange={handleProducerFormChange}
                formDataProducer={formDataProducerSignup}
              />
            )}
            {selectedProductionType === "freelancer" ? (
              <>
                {signupStep === 4 && (
                  <FreelancerDetails
                    handleFormChange={handleProducerFormChange}
                    formDataProducer={formDataProducerSignup}
                  />
                )}
              </>
            ) : selectedProductionType === "company" ? (
              <>
                {signupStep === 4 && (
                  <CompanyDetails
                    handleFormChange={handleProducerFormChange}
                    formDataProducer={formDataProducerSignup}
                  />
                )}
              </>
            ) : null}
          </>
        ) : null}
        {selectedRole === "production" && signupStep === 5 && (
          <VerifyDetails handleSubmit={handleSubmit} />
        )}
        {selectedRole === "artist" && signupStep === 4 && (
          <VerifyDetails handleSubmit={handleSubmit} />
        )}
        {signupStep === 1 && (
          <RoleSelection
            handleSelectRole={handleSelectRole}
            role={selectedRole}
          />
        )}
      </div>
      {(signupStep !== 5 ||
        selectedRole !== null ||
        selectedProductionType !== null) && (
        <div
          style={{ ...styles.NextSymbol }}
          onClick={handleNextStep}
          onMouseEnter={(e) =>
            (e.target.style.transform = "translateY(-50%) translateX(5px)")
          }
          onMouseLeave={(e) =>
            (e.target.style.transform = "translateY(-50%) translateX(0)")
          }
        >
          <FaAngleRight />
        </div>
      )}
      {signupStep === 1 ? null : (
        <div
          style={{ ...styles.PrevSymbol }}
          onClick={handlePrevStep}
          onMouseEnter={(e) =>
            (e.target.style.transform = "translateY(-50%) translateX(0)")
          }
          onMouseLeave={(e) =>
            (e.target.style.transform = "translateY(-50%) translateX(5px)")
          }
        >
          <FaAngleLeft />
        </div>
      )}
      <div style={styles.StepperContainer}>
        <div
          style={{
            ...styles.Stepper,
            ...(signupStep === 1 && styles.ActiveStepper),
          }}
        ></div>
        <div
          style={{
            ...styles.Stepper,
            ...(signupStep === 2 && styles.ActiveStepper),
          }}
        ></div>
        <div
          style={{
            ...styles.Stepper,
            ...(signupStep === 3 && styles.ActiveStepper),
          }}
        ></div>
        <div
          style={{
            ...styles.Stepper,
            ...(signupStep === 4 && styles.ActiveStepper),
          }}
        ></div>
        {selectedRole === "production" ? (
          <div
            style={{
              ...styles.Stepper,
              ...(signupStep === 5 && styles.ActiveStepper),
            }}
          ></div>
        ) : null}
      </div>
    </div>
  );
};

export default SignupStep1;
