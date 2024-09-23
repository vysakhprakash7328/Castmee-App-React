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


const interest = [
  { value: "Singing", label: "Singing" },
  { value: "Dancing", label: "Dancing" },

];

const EditSpecialServicesCard = ({ data, onChange }) => {
  return (
    <EditCard>
      <InputContainer>
       
          <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
            <div
              style={{ width: "48%", minWidth: "200px", marginBottom: "20px" }}
            >
              <LabelText>Interest</LabelText>
              <Select
                placeholder="Select your interest"
                name="interest"
                value={data.interest}
                onChange={(e) => onChange(e)}
              >
                <option>--select--</option>
                {interest.map((intr) => (
                  <option key={intr.value} value={intr.value}>
                    {intr.label}
                  </option>
                ))}
              </Select>
            </div>
            </div>

       
        <UpdateButton>Update</UpdateButton>
      </InputContainer>
    </EditCard>
  );
};

export default EditSpecialServicesCard;
