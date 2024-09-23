import React from "react";
import castmeelogo from "../../assets/img/castmeehead.png";

const styles = {
  Header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px", // Added padding for spacing
    height: "60px",
    width: "100%",
    backgroundColor: "#282828",
  },
  Text: {
    color: "#ffffff",
    fontSize: "20px",
    fontFamily: "Nanum Gothic",
    fontWeight: 700,
    lineHeight: "28px",
    textAlign: "right", // Align text to the right
  },
  Logo: {
    flex: "0 0 auto", // Ensure logo doesn't grow
  },
};

const SignupHeader = ({ step, selectedRole }) => {
  return (
    <div style={styles.Header}>
      <div style={styles.Logo}>
        <img src={castmeelogo} alt="castmee" style={{ width: "200px" }} />
      </div>
      <div style={styles.Text}>
        Step {step} of{" "}
        {selectedRole === "artist" ? 4 : selectedRole === "production" ? 5 : 4}
      </div>
    </div>
  );
};

export default SignupHeader;
