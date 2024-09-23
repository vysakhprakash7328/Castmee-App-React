import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 75vh;
  font-family: Arial, sans-serif;
`;

const Card = styled.div`
  width: 500px;
  max-width: 100%;
  background-color: #282828;
  border-radius: 24px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  padding: 32px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  position: relative;
  margin-top: 20%;

  @media (max-width: 768px) {
  width: 350px;
}
`;

const Title = styled.div`
  font-size: 32px;
  font-family: Source Sans Pro;
  font-weight: 700;
  line-height: 42px;
  text-align: center;
  margin-bottom: 16px;
`;

const Description = styled.div`
  font-size: 16px;
  font-family: Source Sans Pro;
  line-height: 24px;
  text-align: center;
  margin-bottom: 24px;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 16px;
`;

const Input = styled.input`
  width: calc(100% - 80px);
  height: 56px;
  padding: 0px 16px;
  border: none;
  border-radius: 24px;
  background-color: #393939;
  color: #94a3b8;
  font-size: 16px;
  font-family: Source Sans Pro;
  line-height: 56px;
  text-align: center;
  outline: none;
  position: relative;
`;

const Button = styled.button`
  cursor: pointer;
  width: 80px;
  height: 56px;
  padding: 0px;
  border: none;
  border-radius: 24px;
  background-color: #f4ec0b;
  color: #282828;
  font-size: 16px;
  font-family: Source Sans Pro;
  line-height: 24px;
  text-align: center;
  outline: none;
  position: absolute;
  right: 0;
  top: 0;

  &:hover {
    background-color: #e3da0f;
  }
`;

const VerifyOTPContainer = styled.div`
  width: 100%;
  margin-top: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const OTPInput = styled.input`
  width: 64px;
  height: 64px;
  padding: 0px 8px;
  border: 0;
  box-sizing: border-box;
  border-radius: 24px;
  background-color: #393939;
  color: #94a3b8;
  font-size: 32px;
  font-family: Source Sans Pro;
  font-weight: 700;
  line-height: 64px;
  text-align: center;
  outline: none;
  margin: 0 8px;
`;

const VerifyButton = styled.button`
  cursor: pointer;
  width: 160px;
  height: 56px;
  padding: 0px 16px;
  border: none;
  border-radius: 24px;
  background-color: #f4ec0b;
  color: #282828;
  font-size: 16px;
  font-family: Source Sans Pro;
  line-height: 24px;
  text-align: center;
  outline: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e3da0f;
  }
`;

const CreateAccountButton = styled.button`
  cursor: pointer;
  width: 160px;
  height: 56px;
  padding: 0px 16px;
  border: none;
  border-radius: 24px;
  background-color: #f4ec0b;
  color: #282828;
  font-size: 16px;
  font-family: Source Sans Pro;
  line-height: 24px;
  text-align: center;
  outline: none;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #e3da0f;
  }
`;

const Tab = styled.div`
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px 8px 0 0;
  background-color: ${(props) => (props.active ? "#f4ec0b" : "#393939")};
  color: ${(props) => (props.active ? "#282828" : "#ffffff")};
  font-size: 16px;
  font-family: Arial, sans-serif;
  margin-right: 8px;
`;

const VerifyDetails = ({handleSubmit}) => {
  const [showVerifyField, setShowVerifyField] = useState(false);
  const [activeTab, setActiveTab] = useState("email");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setShowVerifyField(false); // Reset OTP verification field when switching tabs
  };

  const handleSendOTP = () => {
    setShowVerifyField(true);
  };

  const handleVerifyOTP = () => {
    // Placeholder for OTP verification logic
    console.log("Verifying OTP...");
  };

  return (
    <Container>
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "16px",
          }}
        >
          <Tab
            active={activeTab === "email"}
            onClick={() => handleTabClick("email")}
          >
            Email
          </Tab>
          <Tab
            active={activeTab === "phone"}
            onClick={() => handleTabClick("phone")}
          >
            Phone
          </Tab>
        </div>
        <Title>
          Verify Your {activeTab === "email" ? "Email" : "Phone Number"}
        </Title>
        <Description>
          Enter your {activeTab === "email" ? "email" : "phone number"} to
          receive the OTP
        </Description>
        <InputContainer>
          <div style={{ position: "relative", width: "100%" }}>
            <Input
              placeholder={`Enter your ${
                activeTab === "email" ? "email" : "phone number"
              }`}
            />
            <Button onClick={handleSendOTP}>Send</Button>
          </div>
        </InputContainer>
        {showVerifyField && (
          <VerifyOTPContainer>
            {[...Array(4)].map((_, index) => (
              <OTPInput key={index} placeholder="0" maxLength={1} />
            ))}
            <VerifyButton onClick={handleVerifyOTP}>Verify OTP</VerifyButton>
          </VerifyOTPContainer>
        )}
      </Card>
      <CreateAccountButton onClick={handleSubmit}>
        Create Account
      </CreateAccountButton>
    </Container>
  );
};

export default VerifyDetails;
