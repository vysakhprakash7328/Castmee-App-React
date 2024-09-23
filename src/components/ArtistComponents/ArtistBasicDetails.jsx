import React, { useState } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

// Define styled components
const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 40px;
  max-width: 100%;
  margin: 0 auto;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    max-width: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 10px;
  max-width: 50%;
  height: 500px;
`;

const LargeImageContainer = css`
  grid-column: span 2;
  grid-row: span 2;
  width: 300px;
  height: 300px;
`;

const SmallImageContainer = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 24px;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  ${({ large }) => large && LargeImageContainer}
`;

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ index }) => {
    const gridPositions = [
      "span 2 / span 2", // index 0
      "1 / 3",           // index 1
      "2 / 3",           // index 2
      "3 / 1",           // index 3
      "3 / 2",           // index 4
      "3 / 3"            // default
    ];
    return css`
      grid-column: ${gridPositions[index].split(" / ")[0]};
      grid-row: ${gridPositions[index].split(" / ")[1]};
    `;
  }}
`;

const AddButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.7);
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #161616;
`;

const Input = styled.input`
  display: none;
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

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 8px;
  border: 0;
  box-sizing: border-box;
  border-radius: 24px;
  background-color: #393939;
  color: #94a3b8;
  font-size: 16px;
  font-family: "Source Sans Pro";
  line-height: 24px;
  outline: none;
  resize: none;
`;

const PersonalDetails = styled.div`
  width: 50%;
`;

function EditBasicDetailsCard({ data, onChange }) {
  const [images, setImages] = useState([
    "https://assets.api.uizard.io/api/cdn/stream/856337a9-51dc-4541-bf28-97ffaa90906d.png",
    "https://via.placeholder.com/200",
    "https://via.placeholder.com/200",
    "https://via.placeholder.com/200",
    "https://via.placeholder.com/200",
    "https://via.placeholder.com/200",
  ]);

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images];
        newImages[index] = reader.result;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  
  return (
    <div>
      <Row>
        <Container>
          <GridContainer>
            {images.map((image, index) => (
              <Card key={index} index={index}>
                <SmallImageContainer
                  large={index === 0}
                  style={{ backgroundImage: `url(${image})` }}
                />
                <AddButton
                  onClick={() =>
                    document.getElementById(`fileInput-${index}`).click()
                  }
                >
                  +
                </AddButton>
                <Input
                  type="file"
                  id={`fileInput-${index}`}
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, index)}
                />
              </Card>
            ))}
          </GridContainer>
          <PersonalDetails>
            <InputContainer>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ width: "50%", marginRight: "20px" }}>
                  <LabelText>UserName</LabelText>
                  <TextInput
                    placeholder="Enter your name"
                    name="user_name"
                    value={data.user_name}
                    disabled
                  />
                </div>
                <div style={{ width: "50%" }}>
                  <LabelText>Email</LabelText>
                  <TextInput
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={data.email}
                    disabled
                  />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ width: "25%", marginRight: "20px" }}>
                  <LabelText>First Name</LabelText>
                  <TextInput
                    placeholder="Enter your first name"
                    name="first_name"
                    value={data.first_name}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div style={{ width: "25%", marginRight: "20px" }}>
                  <LabelText>Last Name</LabelText>
                  <TextInput
                    placeholder="Enter your last name"
                    name="last_name"
                    value={data.last_name}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div style={{ width: "25%", marginRight: "20px" }}>
                  <LabelText>Gender</LabelText>
                  <TextInput
                    as="select"
                    name="gender"
                    value={data.gender}
                    onChange={(e) => onChange(e)}
                  >
                    <option value="">--select--</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </TextInput>
                </div>
                <div style={{ width: "25%" }}>
                  <LabelText>Date of Birth</LabelText>
                  <TextInput
                    type="date"
                    name="date_of_birth"
                    value={data.date_of_birth}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </div>
              <div style={{ width: "100%" }}>
                <LabelText>Bio</LabelText>
                <Textarea
                  placeholder="Enter your bio"
                  name="bio"
                  value={data.bio}
                  onChange={(e) => onChange(e)}
                  />
              </div>
            </InputContainer>
          </PersonalDetails>
        </Container>
      </Row>
    </div>
  );
}



export default EditBasicDetailsCard;
