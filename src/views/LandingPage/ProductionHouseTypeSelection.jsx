import react, {useState} from "react";


const styles = {
    SelectText: {
    fontSize: '32px',
    fontWeight: 700,
    lineHeight: '42px',
    textAlign: 'center',
    margin: '40px 0',
  },
  CardContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px', // Reduced gap between cards for smaller screens
    flexWrap: 'wrap', // Allow cards to wrap to the next line on smaller screens
    maxWidth: '800px', // Limit card container width for responsiveness
    margin: '0 auto', // Center align on larger screens
  },
  Card: {
    width: '350px',
    height: '232px',
    backgroundColor: '#282828',
    borderRadius: '24px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
    marginBottom: '20px', // Add bottom margin between cards
    cursor: 'pointer', // Change cursor to pointer on hover
    transition: 'transform 0.3s ease-in-out, border-color 0.3s ease-in-out', // Add smooth transition on hover
    '&:hover': {
      transform: 'scale(1.05)', // Scale up card on hover
    },
  },
  MainText: {
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: '32px',
    marginBottom: '12px',
  },
  Description: {
    fontSize: '16px',
    lineHeight: '24px',
  },

};

const TypeSelection = ({handleSelectedProductionType, handleFormChange, formDataProducer}) => {
    
  return (
    <div>
      <div style={styles.SelectText}>Which Type You are?</div>

      <div style={styles.CardContainer}>
        <div
          style={{
            ...styles.Card,
            border:
            formDataProducer.user_type === "freelancer"
                ? "2px solid #f4ec0b"
                : "2px solid transparent",
          }}
          onClick={() => handleSelectedProductionType("freelancer")}
          onChange={() => handleFormChange('freelancer')}
          value = {formDataProducer.user_type}
          name="user_type"
        >
          <div style={styles.MainText}>Freelancer</div>
          <div style={styles.Description}>
          Choose this if you are a freelancer looking to connect with artists.
          </div>
        </div>

        <div
          style={{
            ...styles.Card,
            border:
            formDataProducer.user_type === "company"
                ? "2px solid #f4ec0b"
                : "2px solid transparent",
          }}
          onClick={() => handleSelectedProductionType("company")}
          onChange={() => handleFormChange('company')}
          value = {formDataProducer.user_type}
          name="user_type"
        >
          <div style={styles.MainText}>Company</div>
          <div style={styles.Description}>
          Choose this if you are a company looking to connect with artists.
          </div>
        </div>
      </div>
    </div>
  );
}; export default TypeSelection
