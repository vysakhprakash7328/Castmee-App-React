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
};

const PersonalDetails = ({handleFormChange, formDataArtist, setformDataArtistSignup}) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const [selectedGender, setSelectedGender] = useState(null); // State to manage selected gender

  const handleCardClick = (gender) => {
    setformDataArtistSignup((prevFormData) => ({
      ...prevFormData,
      gender
    }));
  };

  const handleInputChange = (value, name) => {
    switch (name) {
      case "firstname":
        setFirstname(value);
        break;
      case "lastname":
        setLastname(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "dateOfBirth":
        setDateOfBirth(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div style={styles.SelectText}>Fill Personal Details</div>

      <div style={styles.CardContainer}>
        <div style={{ ...styles.Card }}>
          <input
            style={styles.CardInput}
            type="text"
            placeholder="first_name"
            name = "first_name"
            value={formDataArtist.first_name} 
            onChange={handleFormChange}
          />
        </div>

        <div style={{ ...styles.Card }}>
          <input
            style={styles.CardInput}
            type="text"
            placeholder="last_name"
            name = "last_name"
            value={formDataArtist.last_name}
            onChange={handleFormChange}
          />
        </div>

        <div style={{ ...styles.Card }}>
          <input
            style={styles.CardInput}
            type="text"
            placeholder="Phone Number"
            name = "contact_no"
            value={formDataArtist.contact_no}
            onChange={handleFormChange}
          />
        </div>

        <div style={{ ...styles.Card }}>
          <input
            style={styles.CardInput}
            type="email"
            placeholder="Email"
            name = "email"
            value={formDataArtist.email}
            onChange={handleFormChange}
          />
        </div>

        <div style={{ ...styles.Card }}>
          <input
            style={styles.CardInput}
            type="date"
            placeholder="Date of Birth"
            name = "date_of_birth"
            value={formDataArtist.date_of_birth}
            onChange={handleFormChange}
            
          />
        </div>

        <div
          style={{
            ...styles.genderCard,
            border:
            formDataArtist.gender === "male"
                ? "2px solid #f4ec0b"
                : "2px solid transparent",
          }}
          onClick={() => handleCardClick("male")}
          onChange={() => handleFormChange('male')}
          value = {formDataArtist.gender}
          name="gender"
        >
          Male
        </div>
        <div
          style={{
            ...styles.genderCard,
            border:
            formDataArtist.gender === "female"
                ? "2px solid #f4ec0b"
                : "2px solid transparent",
          }}
          onClick={() => handleCardClick("female")}
          checked={formDataArtist.gender === 'female'}
          onChange={(event) => handleFormChange(event)}
          value="female" 
          name="gender"
        >
          Female
        </div>
        <div
          style={{
            ...styles.genderCard,
            border:
            formDataArtist.gender === "other"
                ? "2px solid #f4ec0b"
                : "2px solid transparent",
          }}
          onClick={() => handleCardClick("other")}
          checked={formDataArtist.gender === 'other'}
          onChange={(event) => handleFormChange(event)}
          value="other" 
          name="gender"
        >
          Other
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
