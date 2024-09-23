import React from "react";
import styled from "styled-components";
import apiEndpoint from "views/Services/ApiConfig";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

// Styled components
const Modal = styled.div`
  width: 100%;
  height: 80vh;
  background-color: #282828;
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  padding: 20px;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: flex-start;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 10%;
`;

const ImageContainer = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-image: url(${props => props.imageUrl});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  margin-right: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ProfileDetails = styled.div`
  flex: 1;
`;

const Text = styled.h1`
  color: #ffffff;
  font-size: 36px;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 700;
  margin-bottom: 10px;
`;

const LocationText = styled.div`
  color: #ffffff;
  font-size: 16px;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 600;
  display: flex;
  align-items: center;
`;

const Icon = styled.svg`
  color: #ffffff;
  fill: #ffffff;
  font-size: 20px;
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

const InfoCard = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
`;

const InfoItem = styled.div`
  text-align: center;
`;

const InfoValue = styled.div`
  color: #ffffff;
  font-size: 28px;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 600;
`;

const InfoLabel = styled.div`
  color: #ffffff;
  font-size: 16px;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 600;
  margin-top: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  cursor: pointer;
  height: 45px;
  padding: 0 12px;
  border: none;
  border-radius: 24px;
  color: #ffffff;
  font-size: 18px;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 600;
  outline: none;
  transition: all 0.3s ease;
  margin: 10px 5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative; /* Position relative to place the tooltip correctly */

  &:hover {
    opacity: 0.9;
  }
`;

const PhotosButton = styled(Button)`
  background: linear-gradient(to right, #f7c51c, #f4b700);
`;

const TimelineButton = styled(Button)`
  background: linear-gradient(to right, #f7c51c, #f4b700);
`;

const RequestPhoneButton = styled(Button)`
  background: linear-gradient(to right, #28a745, #218838);
`;

const Tooltip = styled.div`
  visibility: hidden;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 4px;
  padding: 5px;
  position: absolute;
  bottom: 100%; /* Position it above the button */
  left: 50%;
  margin-left: -60px; /* Adjust to center the tooltip */
  width: 120px;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.3s;

  ${RequestPhoneButton}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;

const PhotosGridContainer = styled.div`
  margin-top: 20px;
  max-height: 400px;
  overflow-y: auto;
`;

const PhotosGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const PhotosContainer = styled.div`
  width: calc(33.33% - 10px);
  height: 200px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const LikeButton = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  border: none;
  border-radius: 50%;
  color: #161616;
  background: #f4ec0b;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  outline: none;
  margin-top: 20px;
  transition: all 0.3s ease;

  &:hover {
    background: #f0e800;
  }
`;

const LikeIcon = styled.svg`
  fill: black;
  width: 20px;
  height: 20px;
`;

const PhoneIcon = styled.svg`
  fill: #ffffff;
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

const ViewArtistProfile = ({ onClose, user }) => {
  return (
    <Modal>
      <Header>
        <LeftSection>
          <ImageContainer imageUrl={apiEndpoint + user.headshot_image} />
          <ProfileDetails>
            <Text>{user.user_name}</Text>
            <LocationText>
              <Icon viewBox="0 0 512 512">
                <path d="M352 256C352 278.2 350.8 299.6 348.7 320H163.3C161.2 299.6 159.1 278.2 159.1 256C159.1 233.8 161.2 212.4 163.3 192H348.7C350.8 212.4 352 233.8 352 256zM503.9 192C509.2 212.5 512 233.9 512 256C512 278.1 509.2 299.5 503.9 320H380.8C382.9 299.4 384 277.1 384 256C384 234 382.9 212.6 380.8 192H503.9zM493.4 160H376.7C366.7 96.14 346.9 42.62 321.4 8.442C399.8 29.09 463.4 85.94 493.4 160zM344.3 160H167.7C173.8 123.6 183.2 91.38 194.7 65.35C205.2 41.74 216.9 24.61 228.2 13.81C239.4 3.178 248.7 0 256 0C263.3 0 272.6 3.178 283.8 13.81C295.1 24.61 306.8 41.74 317.3 65.35C328.8 91.38 338.2 123.6 344.3 160H344.3zM18.61 160C48.59 85.94 112.2 29.09 190.6 8.442C165.1 42.62 145.3 96.14 135.3 160H18.61zM131.2 192C129.1 212.6 127.1 234 127.1 256C127.1 277.1 129.1 299.4 131.2 320H8.065C2.8 299.5 0 278.1 0 256C0 233.9 2.8 212.5 8.065 192H131.2zM194.7 446.6C183.2 420.6 173.8 388.4 167.7 352H344.3C338.2 388.4 328.8 420.6 317.3 446.6C306.8 470.3 295.1 487.4 283.8 498.2C272.6 508.8 263.3 512 255.1 512C248.7 512 239.4 508.8 228.2 498.2C216.9 487.4 205.2 470.3 194.7 446.6H194.7zM190.6 503.6C112.2 482.9 48.59 426.1 18.61 352H135.3C145.3 415.9 165.1 469.4 190.6 503.6V503.6zM321.4 503.6C346.9 469.4 366.7 415.9 376.7 352H493.4C463.4 426.1 399.8 482.9 321.4 503.6V503.6z"></path>
              </Icon>
              {user.current_city}
            </LocationText>
          </ProfileDetails>
        </LeftSection>

        <RightSection>
          <InfoCard>
            <InfoItem>
              <InfoValue>{user.age}</InfoValue>
              <InfoLabel>Age</InfoLabel>
            </InfoItem>
            <InfoItem>
              <InfoValue>{user.height}</InfoValue>
              <InfoLabel>Height</InfoLabel>
            </InfoItem>
            <InfoItem>
              <InfoValue>{user.weight}</InfoValue>
              <InfoLabel>Weight</InfoLabel>
            </InfoItem>
          </InfoCard>
        </RightSection>
      </Header>

      <ButtonContainer>
        <PhotosButton>Photos</PhotosButton>
        <TimelineButton>Timeline</TimelineButton>
      </ButtonContainer>

      <RequestPhoneButton>
        <FontAwesomeIcon icon={faPhone} style={{ marginRight: '8px' }} />
        <Tooltip>Request Phone Number</Tooltip>
      </RequestPhoneButton>

      <LikeButton>
        <LikeIcon viewBox="0 0 512 512">
          <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z"></path>
        </LikeIcon>
      </LikeButton>

      <PhotosGridContainer>
        <PhotosGrid>
          <PhotosContainer
            style={{ backgroundImage: `url(${apiEndpoint + user.headshot_image})` }}
          />
          <PhotosContainer
            style={{ backgroundImage: `url(${apiEndpoint + user.left_profile})` }}
          />
          <PhotosContainer
            style={{ backgroundImage: `url(${apiEndpoint + user.right_profile})` }}
          />
        </PhotosGrid>
      </PhotosGridContainer>
    </Modal>
  );
};

export default ViewArtistProfile;
