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

const ImageSelectorContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 8px;
`;

const ImageOption = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  border: ${({ isSelected }) => (isSelected ? "2px solid rgb(225, 185, 49)" : "none")};
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
`;

// Example data for image options
const hairTypes = [
  { label: "Straight", imageSrc: "/path/to/straight-hair.png" },
  { label: "Curly", imageSrc: "/path/to/curly-hair.png" },
  { label: "Wavy", imageSrc: "/path/to/wavy-hair.png" },
];

const eyeColors = [
  { label: "Blue", imageSrc: "/path/to/blue-eye.png" },
  { label: "Brown", imageSrc: "/path/to/brown-eye.png" },
  { label: "Green", imageSrc: "/path/to/green-eye.png" },
];

// Functional component for rendering the form
const EditPersonalDetailsCard = () => {
  const [selectedHairType, setSelectedHairType] = React.useState(null);
  const [selectedEyeColor, setSelectedEyeColor] = React.useState(null);

  const handleHairTypeSelect = (hairType) => {
    setSelectedHairType(hairType);
  };

  const handleEyeColorSelect = (eyeColor) => {
    setSelectedEyeColor(eyeColor);
  };

  return (
    <EditCard>
      <InputContainer>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <div style={{ width: "48%" }}>
            <LabelText>Height (cm)</LabelText>
            <TextInput placeholder="Enter your height" />
          </div>
          <div style={{ width: "48%" }}>
            <LabelText>Weight (Kg)</LabelText>
            <TextInput placeholder="Enter your weight" />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <div style={{ width: "48%" }}>
            <LabelText>Hair Type</LabelText>
            <ImageSelectorContainer>
              {hairTypes.map((type, index) => (
                <ImageOption
                  key={index}
                  src={type.imageSrc}
                  alt={type.label}
                  isSelected={selectedHairType === type}
                  onClick={() => handleHairTypeSelect(type)}
                />
              ))}
            </ImageSelectorContainer>
          </div>
          <div style={{ width: "48%" }}>
            <LabelText>Hair Color</LabelText>
            <ImageSelectorContainer>
              {eyeColors.map((color, index) => (
                <ImageOption
                  key={index}
                  src={color.imageSrc}
                  alt={color.label}
                  isSelected={selectedEyeColor === color}
                  onClick={() => handleEyeColorSelect(color)}
                />
              ))}
            </ImageSelectorContainer>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <div style={{ width: "48%" }}>
            <LabelText>Eye Color</LabelText>
            <ImageSelectorContainer>
              {hairTypes.map((type, index) => (
                <ImageOption
                  key={index}
                  src={type.imageSrc}
                  alt={type.label}
                  isSelected={selectedHairType === type}
                  onClick={() => handleHairTypeSelect(type)}
                />
              ))}
            </ImageSelectorContainer>
          </div>
          <div style={{ width: "48%" }}>
            <LabelText>Skin Color</LabelText>
            <ImageSelectorContainer>
              {eyeColors.map((color, index) => (
                <ImageOption
                  key={index}
                  src={color.imageSrc}
                  alt={color.label}
                  isSelected={selectedEyeColor === color}
                  onClick={() => handleEyeColorSelect(color)}
                />
              ))}
            </ImageSelectorContainer>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <div style={{ width: "48%" }}>
            <LabelText>Current State</LabelText>
            <TextInput placeholder="Enter your skin color" />
          </div>
          <div style={{ width: "48%" }}>
            <LabelText>Current City</LabelText>
            <TextInput placeholder="Enter your eye color" />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <div style={{ width: "48%" }}>
            <LabelText>Native State</LabelText>
            <TextInput placeholder="Enter your skin color" />
          </div>
          <div style={{ width: "48%" }}>
            <LabelText>Native City</LabelText>
            <TextInput placeholder="Enter your eye color" />
          </div>
        </div>

        <UpdateButton>Update</UpdateButton>
      </InputContainer>
    </EditCard>
  );
};

export default EditPersonalDetailsCard;
