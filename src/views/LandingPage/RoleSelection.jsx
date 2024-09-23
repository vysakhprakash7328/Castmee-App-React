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

const RoleSelection = ({handleSelectRole, role}) => {
    
  return (
    <div>
      <div style={styles.SelectText}>Select Your Role</div>

      <div style={styles.CardContainer}>
        <div
          style={{
            ...styles.Card,
            border:
            role === "artist"
                ? "2px solid #f4ec0b"
                : "2px solid transparent",
          }}
          onClick={() => handleSelectRole("artist")}
        >
          <div style={styles.MainText}>Artist</div>
          <div style={styles.Description}>
            Choose this if you are an artist looking to connect with production
            houses.
          </div>
        </div>

        <div
          style={{
            ...styles.Card,
            border:
            role === "production"
                ? "2px solid #f4ec0b"
                : "2px solid transparent",
          }}
          onClick={() => handleSelectRole("production")}
        >
          <div style={styles.MainText}>Production House</div>
          <div style={styles.Description}>
            Choose this if you are a production house looking to connect with
            artists.
          </div>
        </div>
      </div>
    </div>
  );
}; export default RoleSelection
