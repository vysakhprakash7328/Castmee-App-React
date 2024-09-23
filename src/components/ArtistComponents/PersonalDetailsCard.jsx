import React from "react";
import styled from "styled-components";
import apiEndpoint from "views/Services/ApiConfig";
import curlyhair from "../../assets/img/curly.jpg";
import coilyhair from "../../assets/img/coily.jpg";
import nohair from "../../assets/img/no_hair.jpg";
import wavyhair from "../../assets/img/wavy.jpg";
import straighthair from "../../assets/img/straight.jpg";
import blackeye from "../../assets/img/black.jpg";
import blueeye from "../../assets/img/blue.jpg";
import browneye from "../../assets/img/brown.jpg";
import ambereye from "../../assets/img/amber.jpg";
import greyeye from "../../assets/img/gray.jpg";
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
  border: ${({ isSelected }) => (isSelected ? "2px solid blue" : "none")};
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

const RoundCard = styled.button`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  cursor: pointer;
  border: ${({ isSelected }) => (isSelected ? "2px solid blue" : "none")};
  background-color: ${({ color }) => color};
  margin: 0 5px;
  outline: none;
  box-shadow: ${({ isSelected }) =>
    isSelected ? "0 0 5px rgba(225, 185, 49, 0.5)" : "none"};
`;

// Example data for image options
const hairTypes = [
  { label: "Straight", imageSrc: straighthair },
  { label: "Curly", imageSrc: curlyhair },
  { label: "Wavy", imageSrc: wavyhair },
  { label: "coily", imageSrc: coilyhair },
  { label: "nohair", imageSrc: nohair },
];

const eyeColors = [
  { label: "blackeye", imageSrc: blackeye },
  { label: "blueeye", imageSrc: blueeye },
  { label: "browneye", imageSrc: browneye },
  { label: "ambereye", imageSrc: ambereye },
  { label: "greyeye", imageSrc: greyeye },
];

const hairColors = [
  { value: "black", label: "Black" },
  { value: "brown", label: "Brown" },
  { value: "blonde", label: "Blonde" },
  { value: "red", label: "Red" },
  { value: "saltpepper", label: "Salt and Pepper" },
];
const bodyType = [
  { value: "slim", label: "Slim" },
  { value: "athletic", label: "Athletic" },
  { value: "average", label: "Average" },
  { value: "muscular", label: "Muscular" },
  { value: "curvy", label: "Curvy" },
  { value: "heavy", label: "Heavy" },
  { value: "plus-sized", label: "Plus-sized" },
];
const skinColor = [
  { value: "rgb(255, 219, 172)", label: "veryfair" },
  { value: "rgb(241, 194, 125)", label: "fair" },
  { value: "rgb(224, 172, 105)", label: "wheatish" },
  { value: "rgb(198, 134, 66)", label: "brown" },
  { value: "rgb(141, 85, 36)", label: "dark" },
  { value: "rgb(88, 49, 35)", label: "verydark" },
];

const currentState = [
  { id: "1", value: "Kerala" },
  { id: "2", value: "TamilNadu" },
  { id: "3", value: "Karnataka" },
];
// Functional component for rendering the form
const EditPersonalDetailsCard = ({ data, onChange }) => {
  const [selectedHairType, setSelectedHairType] = React.useState(null);
  const [selectedEyeColor, setSelectedEyeColor] = React.useState(null);
  const [selectedSkinColor, setSelectedSkinColor] = React.useState(null);

  const handleHairTypeSelect = (hairType) => {
    setSelectedHairType(hairType);
  };

  const handleEyeColorSelect = (eyeColor) => {
    setSelectedEyeColor(eyeColor);
  };

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
            <LabelText>Height (cm)</LabelText>
            <TextInput
              placeholder="Enter your height"
              name="height"
              value={data.height}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div
            style={{ width: "48%", minWidth: "200px", marginBottom: "20px" }}
          >
            <LabelText>Weight (Kg)</LabelText>
            <TextInput
              placeholder="Enter your weight"
              name="weight"
              value={data.weight}
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>

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
            <LabelText>Hair Type</LabelText>
            <ImageSelectorContainer>
              {hairTypes.map((type, index) => (
                <ImageOption
                  key={index}
                  src={type.imageSrc}
                  alt={type.label}
                  isSelected={selectedHairType === type}
                  onClick={() => handleHairTypeSelect(type)}
                  name="selectedHairType"
                  value={data.selectedHairType}
                  onChange={(e) => onChange(e)}
                />
              ))}
            </ImageSelectorContainer>
          </div>
          <div
            style={{ width: "48%", minWidth: "200px", marginBottom: "20px" }}
          >
            <LabelText>Eye Color</LabelText>
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
            <LabelText>Hair Color</LabelText>
            <Select
              placeholder="Enter your current state"
              name="hairColor"
              value={data.hairColor}
              onChange={(e) => onChange(e)}
            >
              <option>--select--</option>
              {hairColors.map((clr) => (
                <option key={clr.value} value={clr.value}>
                  {clr.label}
                </option>
              ))}
            </Select>
          </div>
          <div
            style={{ width: "48%", minWidth: "200px", marginBottom: "20px" }}
          >
            <LabelText>Body Type</LabelText>
            <Select
              placeholder="Enter your current state"
              name="bodyType"
              value={data.bodyType}
              onChange={(e) => onChange(e)}
            >
              <option>--select--</option>
              {bodyType.map((clr) => (
                <option key={clr.value} value={clr.value}>
                  {clr.label}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {" "}
          <div
            style={{ width: "48%", minWidth: "200px", marginBottom: "20px" }}
          >
            <LabelText>Skin Color</LabelText>
            <ImageSelectorContainer>
              {skinColor.map((color, index) => (
                <RoundCard
                  key={index}
                  color={color.value}
                  isSelected={selectedSkinColor === color.value}
                  onClick={() => setSelectedSkinColor(color.value)}
                />
              ))}
            </ImageSelectorContainer>
          </div>
          <div
            style={{ width: "48%", minWidth: "200px", marginBottom: "20px" }}
          >
            <LabelText>Current State</LabelText>

            <Select
              placeholder="Enter your current state"
              name="currentState"
              value={data.currentState}
              onChange={(e) => onChange(e)}
            >
              <option>--select--</option>
              {currentState.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.value}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {" "}
          <div
            style={{ width: "48%", minWidth: "200px", marginBottom: "20px" }}
          >
            <LabelText>Current City</LabelText>
            <Select
              placeholder="Enter your current City"
              name="currentCity"
              value={data.currentCity}
              onChange={(e) => onChange(e)}
            >
              <option>--select--</option>
              {currentState.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.value}
                </option>
              ))}
            </Select>{" "}
          </div>
          <div
            style={{ width: "48%", minWidth: "200px", marginBottom: "20px" }}
          >
            <LabelText>Native State</LabelText>
            <Select
              placeholder="Enter your current state"
              name="nativeState"
              value={data.nativeState}
              onChange={(e) => onChange(e)}
            >
              <option>--select--</option>
              {currentState.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.value}
                </option>
              ))}
            </Select>{" "}
          </div>
        </div>

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
            <LabelText>Native City</LabelText>
            <Select
              placeholder="Enter your current state"
              name="nativeCity"
              value={data.nativeCity}
              onChange={(e) => onChange(e)}
            >
              <option>--select--</option>
              {currentState.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.value}
                </option>
              ))}
            </Select>{" "}
          </div>
        </div>
      </InputContainer>
    </EditCard>
  );
};

export default EditPersonalDetailsCard;
