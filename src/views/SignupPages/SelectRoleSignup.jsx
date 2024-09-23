import React from "react";
import CastingProducerHeader from "components/CastingProducerComponents/CastingProducerHeader";
import castingcallimage from '../../assets/img/castincallimage2.jpg';
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '70vh', // Ensure the container fills the viewport height
    flexDirection: 'column', // Align items vertically
  },
  Text: {
    color: '#ffffff',
    fontSize: '32px',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 700,
    lineHeight: '1.5',
    textAlign: 'center',
    marginBottom: '40px', // Increased margin for better spacing
  },
  Button: {
    cursor: 'pointer',
    width: '300px',
    height: '60px',
    padding: '0px 20px',
    border: 'none',
    borderRadius: '30px',
    backgroundColor: '#f4ec0b',
    color: '#161616',
    fontSize: '20px',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 600,
    lineHeight: '60px',
    outline: 'none',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    marginBottom: '20px',
  },
  ButtonHover: {
    backgroundColor: '#ffd700',
  },
  ButtonActive: {
    transform: 'scale(0.95)',
    backgroundColor: '#F7C51C',
  },
  FormContainer: {
    width: '300px',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  },
};

const SignupPageRole = () => {
  const [isChecked, setIsChecked] = React.useState('');

  const handleButtonClick = (role) => {
    setIsChecked(role);
  };

  return (
    <div style={styles.container}>
      <div style={styles.Text}>
        Select Your Role
      </div>
      <button
        style={{ ...styles.Button, ...(isChecked === 'artist' ? styles.ButtonActive : null) }}
        onClick={() => handleButtonClick('artist')}
      >
        Artist
      </button>
      <button
        style={{ ...styles.Button, ...(isChecked === 'productionhouse' ? styles.ButtonActive : null) }}
        onClick={() => handleButtonClick('productionhouse')}
      >
        Production House
      </button>
      {isChecked && (
        <div style={styles.FormContainer}>
          {isChecked === 'artist' ? (
            // Render artist form here
            <form>
              {/* Artist form fields */}
              HI
            </form>
          ) : (
            // Render production house form here
            <form>
              {/* Production house form fields */}
              HELLO
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default SignupPageRole;
