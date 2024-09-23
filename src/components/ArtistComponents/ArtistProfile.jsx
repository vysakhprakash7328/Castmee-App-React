import React, { useState, useEffect } from "react";
import styled from "styled-components";
import apiEndpoint from "views/Services/ApiConfig";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const Screen = styled.div`
  background-color: #161616;
  color: #ffffff;
  font-family: "Source Sans Pro", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  overflow: auto;
  height: 90vh;
  max-height: 100vh;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 20px;
  text-align: center;
`;

const ProfileImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.imageUrl});
  margin-bottom: 10px;
  border: 3px solid #d5ad1e; /* Gold border for profile picture */
`;

const Name = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 5px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const Skill = styled.div`
  font-size: 18px;
  color: #b0b0b0; /* Lighter color for profile completeness */
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    gap: 5px;
    flex-wrap: wrap;
  }
`;

const EditIcon = styled.div`
  cursor: pointer;
  font-size: 24px;
  color: #d5ad1e;
  transition: color 0.3s;

  &:hover {
    color: #b4931b;
  }

  @media (max-width: 768px) {
    font-size: 20px;
  }
  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const MenuBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => (props.active ? "#d5ad1e" : "#ffffff")};
  font-size: 16px;
  cursor: pointer;
  padding: 10px 20px;
  border-bottom: ${(props) => (props.active ? "2px solid #d5ad1e" : "none")};
  transition: color 0.3s, border-bottom 0.3s;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 15px;
  }
  @media (max-width: 480px) {
    font-size: 12px;
    padding: 6px 10px;
  }
`;

const PhotosContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
`;

const Photo = styled.div`
  width: calc(33.33% - 10px);
  height: 200px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 12px;

  @media (max-width: 480px) {
    width: calc(50% - 8px);
  }
`;

const VideosContainer = styled.div`
  width: 100%;
  max-width: 1200px;
`;

const Video = styled.div`
  width: 100%;
  height: 200px;
  background-color: #333;
  border-radius: 12px;
  margin-bottom: 10px;
`;

const ProfileCard = styled.div`
  width: 100%;
  max-width: 1200px;
  background-color: #1f1f1f;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  border: 1px solid #282828;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 15px;
  }
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const TabButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => (props.active ? "#d5ad1e" : "#ffffff")};
  font-size: 16px;
  cursor: pointer;
  padding: 10px;
  border-bottom: ${(props) => (props.active ? "2px solid #d5ad1e" : "none")};
  transition: color 0.3s, border-bottom 0.3s;
`;

const TabContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailItem = styled.div`
  font-size: 16px;
  color: #e0e0e0;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
  background-color: #2e2e2e;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const ProfileScreen = () => {
  const [activeSection, setActiveSection] = useState("photos");
  const [userDetails, setUserDetails] = useState({});
  const [profilePercentage, setProfilePercentage] = useState(30);
  const [activeTab, setActiveTab] = useState("personal");

  useEffect(() => {
    const userDetailsStr = localStorage.getItem("user_details");

    if (userDetailsStr) {
      const userDetails = JSON.parse(userDetailsStr);
      setUserDetails(userDetails.data.data);
      setProfilePercentage(userDetails.data.data.profile_percentage);

      const intervalId = setInterval(() => {
        setProfilePercentage((prevPercentage) => prevPercentage + 1);
      }, 60000);

      return () => clearInterval(intervalId);
    }
  }, []);

  const imageUrl = userDetails.headshot_image
    ? apiEndpoint + userDetails.headshot_image
    : "";

  const history = useHistory();
  const handleEditProfile = () => {
    history.push('/artisteditprofile');
  };

  return (
    <Screen>
      <Header>
        <ProfileContainer>
          <ProfileImage imageUrl={imageUrl} />
          <Name>{userDetails.first_name} {userDetails.last_name}</Name>
          <Skill>Profile Completeness: {profilePercentage}%</Skill>
        </ProfileContainer>
        {/* <ButtonContainer>
          <EditIcon onClick={handleEditProfile}>
            <FontAwesomeIcon icon={faEdit} />
          </EditIcon>
        </ButtonContainer> */}
      </Header>

      <MenuBar>
        <MenuButton
          active={activeSection === "photos"}
          onClick={() => setActiveSection("photos")}
        >
          Photos
        </MenuButton>
        <MenuButton
          active={activeSection === "videos"}
          onClick={() => setActiveSection("videos")}
        >
          Videos
        </MenuButton>
        <MenuButton
          active={activeSection === "profile"}
          onClick={() => setActiveSection("profile")}
        >
          Profile
        </MenuButton>
      </MenuBar>

      {activeSection === "photos" && (
        <PhotosContainer>
          {/* Render photos here */}
          <Photo style={{ backgroundImage: "url(photo_url1)" }} />
          <Photo style={{ backgroundImage: "url(photo_url2)" }} />
          <Photo style={{ backgroundImage: "url(photo_url3)" }} />
        </PhotosContainer>
      )}

      {activeSection === "videos" && (
        <VideosContainer>
          {/* Render videos here */}
          <Video />
          <Video />
          <Video />
        </VideosContainer>
      )}

      {activeSection === "profile" && (
        <ProfileCard>
          <TabContainer>
            <TabButton
              active={activeTab === "personal"}
              onClick={() => setActiveTab("personal")}
            >
              Personal Details
            </TabButton>
            <TabButton
              active={activeTab === "professional"}
              onClick={() => setActiveTab("professional")}
            >
              Professional Details
            </TabButton>
            <TabButton
              active={activeTab === "interests"}
              onClick={() => setActiveTab("interests")}
            >
              Interests
            </TabButton>
          </TabContainer>
          <TabContent>
            {activeTab === "personal" && (
              <>
                <DetailItem>
                  <strong>Address:</strong> {userDetails.current_city}, {userDetails.current_state}
                </DetailItem>
                <DetailItem>
                  <strong>Age:</strong> {userDetails.age ? userDetails.age : "Unknown"}
                </DetailItem>
                <DetailItem>
                  <strong>Email:</strong> {userDetails.email}
                </DetailItem>
                <DetailItem>
                  <strong>Gender:</strong> {userDetails.gender}
                </DetailItem>
              </>
            )}
            {activeTab === "professional" && (
              <>
                <DetailItem>
                  <strong>Artist ID:</strong> {userDetails.artist_id}
                </DetailItem>
                <DetailItem>
                  <strong>Bio:</strong> {userDetails.bio}
                </DetailItem>
                <DetailItem>
                  <strong>Body Type:</strong> {userDetails.body_type}
                </DetailItem>
                <DetailItem>
                  <strong>Eye Color:</strong> {userDetails.eye_color}
                </DetailItem>
                <DetailItem>
                  <strong>Hair Type:</strong> {userDetails.hair_type}
                </DetailItem>
                <DetailItem>
                  <strong>Height:</strong> {userDetails.height}
                </DetailItem>
              </>
            )}
            {activeTab === "interests" && (
              <>
                <DetailItem>
                  <strong>Facebook:</strong> {userDetails.facebook}
                </DetailItem>
                <DetailItem>
                  <strong>Instagram:</strong> {userDetails.instagram}
                </DetailItem>
                <DetailItem>
                  <strong>Twitter:</strong> {userDetails.twitter}
                </DetailItem>
                <DetailItem>
                  <strong>YouTube:</strong> {userDetails.youtube}
                </DetailItem>
              </>
            )}
          </TabContent>
        </ProfileCard>
      )}
    </Screen>
  );
};

export default ProfileScreen;
