import React from "react";
const styles = {
    Card: {
    padding: "32px",
    width: "100%",
    maxWidth: "448px",
    backgroundColor: "rgba(40, 40, 40, 0.8)",
    borderRadius: "24px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  
  Text: {
    color: "#F7C51C",
    fontSize: "36px",
    fontFamily: "Source Sans Pro",
    fontWeight: 700,
    lineHeight: "40px",
    textAlign: "center",
    marginBottom: "24px",
  },
  NameLabel: {
    color: "#ffffff",
    fontSize: "14px",
    fontFamily: "Source Sans Pro",
    fontWeight: 500,
    lineHeight: "20px",
    marginBottom: "8px",
  },
  NameInput: {
    width: "100%",
    height: "48px",
    padding: "0px 8px",
    border: "0",
    boxSizing: "border-box",
    borderRadius: "24px",
    backgroundColor: "#393939",
    color: "#94a3b8",
    fontSize: "16px",
    fontFamily: "Source Sans Pro",
    lineHeight: "48px",
    outline: "none",
    marginBottom: "16px",
  },
  Terms: {
    color: "#ffffff",
    fontSize: "14px",
    fontFamily: "Source Sans Pro",
    lineHeight: "20px",
    marginTop: "8px",
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
  Button: {
    cursor: "pointer",
    width: "100%",
    height: "48px",
    padding: "0px 8px",
    border: "0",
    boxSizing: "border-box",
    borderRadius: "24px",
    backgroundColor: "#F7C51C",
    color: "#161616",
    fontSize: "16px",
    fontFamily: "Source Sans Pro",
    fontWeight: 700,
    lineHeight: "24px",
    outline: "none",
    marginTop: "24px",
    transition: "background-color 0.3s ease",
  },
  ButtonHover: {
    backgroundColor: "#d4c70a",
  },
  ButtonActive: {
    backgroundColor: "#b3a20b",
  },
  "@media (max-width: 768px)": {
    Content: {
      flexDirection: "column",
      alignItems: "center",
    },
  },

}



export default function SignupPagePersonalDetails({setSignupPage}) {

    const setSignupPageSubmit = () => {
        setSignupPage(2)
    }


  const [isChecked, setIsChecked] = React.useState(false);
  const [buttonHover, setButtonHover] = React.useState(false);
  const [buttonActive, setButtonActive] = React.useState(false);
  const onClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div style={styles.Card}>
      <div style={styles.Text}>Create Account</div>
      <div>
        <div style={styles.NameLabel}>Name</div>
        <input style={styles.NameInput} />
      </div>
      <div>
        <div style={styles.NameLabel}>Email</div>
        <input style={styles.NameInput} />
      </div>
      <div>
        <div style={styles.NameLabel}>Username</div>
        <input style={styles.NameInput} />
      </div>
      <div>
        <div style={styles.NameLabel}>Phone Number</div>
        <input style={styles.NameInput} />
      </div>
      <div style={styles.Container} onClick={onClick}>
        <div style={styles.CheckboxWrapper}>
          <div
            style={{
              ...styles.Check,
              display: isChecked ? "block" : "none",
            }}
          >
            ✓
          </div>
          <input type="checkbox" style={styles.CheckboxInput} />
        </div>
        <div style={styles.Terms}>I agree to the terms and conditions</div>
      </div>
      <button
        style={{
          ...styles.Button,
          ...(buttonHover ? styles.ButtonHover : {}),
          ...(buttonActive ? styles.ButtonActive : {}),
        }}
        onMouseEnter={() => setButtonHover(true)}
        onMouseLeave={() => setButtonHover(false)}
        onMouseDown={() => setButtonActive(true)}
        onMouseUp={() => setButtonActive(false)}
        onClick={setSignupPageSubmit}
      >
        Create Account
      </button>
    </div>
  );
}
