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
  gap: 20px;
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

const Select = styled.select`
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

const languages = [
  { id: "1", value: "Malayalam" },
  { id: "2", value: "English" },
  { id: "3", value: "Tamil" },
];

const EditProfessionalDetailsCard = ({ data, onChange, onFileChange }) => {
  console.log(data,'data in professional details')
  return (
    <EditCard>
      <InputContainer>
        <FormRow>
          <FormColumn>
            <LabelText>Languages</LabelText>
            <Select
              name="languages"
              value={data.languages}
              onChange={(e) => onChange(e)}
            >
              <option value="">--select--</option>
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.value}
                </option>
              ))}
            </Select>
          </FormColumn>
          <FormColumn>
            <LabelText>Skills</LabelText>
            <Select
              name="skills"
              value={data.skills}
              onChange={(e) => onChange(e)}
            >
              <option value="">--select--</option>
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.value}
                </option>
              ))}
            </Select>
          </FormColumn>
        </FormRow>
        <FormRow>
          <FormColumn>
            <LabelText>Project Type</LabelText>
            <Select
              name="projectType"
              value={data.projectType}
              onChange={(e) => onChange(e)}
            >
              <option value="">--select--</option>
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.value}
                </option>
              ))}
            </Select>
          </FormColumn>
          <FormColumn>
            <LabelText>Role</LabelText>
            <Select
              name="role"
              value={data.role}
              onChange={(e) => onChange(e)}
            >
              <option value="">--select--</option>
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.value}
                </option>
              ))}
            </Select>
          </FormColumn>
        </FormRow>
        <FormRow>
          <FormColumn>
            <LabelText>Project Name</LabelText>
            <TextInput
              placeholder="Enter project name"
              name="projectName"
              value={data.projectName}
              onChange={(e) => onChange(e)}
            />
          </FormColumn>
          <FormColumn>
            <LabelText>Project Link</LabelText>
            <TextInput
              placeholder="Enter project link"
              name="projectLink"
              value={data.projectLink}
              onChange={(e) => onChange(e)}
            />
          </FormColumn>
        </FormRow>
        <FormRow>
          <FormColumn>
            <LabelText>Upload a Poster Image</LabelText>
            <TextInput
              placeholder="Upload an image"
              type="file"
              name="posterImage"
              onChange={onFileChange}
            />
          </FormColumn>
        </FormRow>
        <UpdateButton onClick={() => alert("Updated")}>Update</UpdateButton>
      </InputContainer>
    </EditCard>
  );
};

export default EditProfessionalDetailsCard;
