import React from "react";
import styled from "styled-components";

// Define styled components
const EditCard = styled.div`
  width: 100%;
  background-color: #282828;
  border-radius: 24px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 40px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LabelText = styled.div`
  color: #ffffff;
  font-size: 16px;
  font-family: "Source Sans Pro";
  line-height: 24px;
  margin-bottom: 8px;
`;

const TextInput = styled.input`
  width: 100%;
  height: 56px;
  padding: 0px 8px;
  border: 0;
  box-sizing: border-box;
  border-radius: 24px;
  background-color: #393939;
  color: #94a3b8;
  font-size: 16px;
  font-family: "Source Sans Pro";
  line-height: 56px;
  outline: none;
`;

const UpdateButton = styled.button`
  background-color: rgb(225, 185, 49);
  color: white;
  width: 30%;
  height: 40px;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
  align-self: flex-end;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormColumn = styled.div`
  width: 48%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// Functional component for rendering the form
const EditPreferenceDetailsCard = () => {
  return (
    <EditCard>
      <InputContainer>
        <FormRow>
          <FormColumn>
            <LabelText>Consider Me For</LabelText>
            <TextInput placeholder="Enter your preference" />
          </FormColumn>
          <FormColumn>
            <LabelText>I am Available</LabelText>
            <TextInput placeholder="Enter your availability" />
          </FormColumn>
        </FormRow>
        <FormRow>
          <FormColumn>
            <LabelText>My Preferred Format</LabelText>
            <TextInput placeholder="Enter your preferred format" />
          </FormColumn>
          <FormColumn>
            <LabelText>My Personal Preferences</LabelText>
            <TextInput placeholder="Enter your personal preferences" />
          </FormColumn>
        </FormRow>
        <FormRow>
          <FormColumn>
            <LabelText>My Preferred Genre</LabelText>
            <TextInput placeholder="Enter your preferred genre" />
          </FormColumn>
        </FormRow>
        <UpdateButton>Update</UpdateButton>
      </InputContainer>
    </EditCard>
  );
};

export default EditPreferenceDetailsCard;
