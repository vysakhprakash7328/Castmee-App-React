import React, { useState } from "react";
import CastingProducerHeader from "components/CastingProducerComponents/CastingProducerHeader";
import castingcallimage from "../../assets/img/castincallimage2.jpg";
import SignupPagePersonalDetails from "./SignupPagePersonalDetails";
import SignupPageRole from "./SelectRoleSignup";

const styles = {
  Screen: {
    backgroundColor: "#161616",
    backgroundImage: `url(${castingcallimage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    color: "#fff",
    padding: "0 16px",
  },
  Content: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    maxWidth: "1200px",
    marginTop: "20px",
    marginBottom: "20px",
  },
  Header: {
    width: "100%",
    height: "64px",
    backgroundColor: "#282828",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "bold",
  },
  
  Footer: {
    marginTop: "auto",
    width: "100%",
    height: "64px",
    backgroundColor: "#282828",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
  },
};

const SignupPage = () => {
 const [signupPage, setSignupPage] = useState(1);

 


  return (
    <div style={styles.Screen}>
      <CastingProducerHeader />
      <div style={styles.Content}>
        
        {signupPage === 1 ?<SignupPagePersonalDetails setSignupPage={setSignupPage}/>:signupPage === 2 ? <SignupPageRole/>:null }
        
        
        
        </div>
      <div style={styles.Footer}>© 2024 Your Company</div>
    </div>
  );
};

export default SignupPage;
