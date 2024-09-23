import React, { useState, useEffect } from "react";
import styled from "styled-components";
import EditPersonalDetailsCard from "./PersonalDetailsCard";
import EditProfessionalDetailsCard from "./ProfessionalDetailsCard";
import EditSocialMediaCard from "./SocialMediaCard";
import EditPreferenceDetailsCard from "./PreferenceDetailsCard";
import EditSpecialServicesCard from "./SpecialServicesCard";
import EditBasicDetailsCard from "./ArtistBasicDetails";
import apiEndpoint from "views/Services/ApiConfig";
import axios from "axios"; // Import axios for making API calls
import getNewAccessToken from "views/Services/getRefreshToken";

// Styled components
const Screen = styled.div`
  background-color: #161616;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 90vh;
  padding: 20px;
  overflow: hidden;
`;

const Container = styled.div`
  overflow-y: auto;
  width: 100%;
  max-height: 100%;
  padding-right: 20px;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const UpdateProfile = () => {
  // Define state variables for form data
  const [data, setData] = useState([]);
  const [basicDetails, setBasicDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    user_name: "",
    gender: "",
    date_of_birth: null,
    bio: "",
  });
  const [personalDetails, setPersonalDetails] = useState({
    height: "",
    weight: "",
    selectedHairType: null,
    hairColor: null,
    bodyType: null,
    selectedEyeColor: null,
    selectedSkinColor: null,
    currentState: null,
    currentCity: null,
    nativeState: null,
    nativeCity: null,
  });
  const [professionalDetails, setProfessionalDetails] = useState({
    languages: [],
    skills: [],
    projectType: "",
    role: "",
    projectName: "",
    projectLink: "",
    selectedImage: null,
  });
  const [socialMedia, setSocialMedia] = useState({
    facebook: "",
    instagram: "",
    youtube: "",
    twitter: "",
    linkedIn: "",
  });
  const [preferenceDetails, setPreferenceDetails] = useState({
    consider_me_for: [{}],
    available_for: [{}],
    preferred_format: [{}],
    preferred_genre: [{}],
    interest: [{}],
  });
  const [specialServices, setSpecialServices] = useState({});

  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`);
    setBasicDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for API
    const profileData = {
      basicDetails,
      personalDetails,
      professionalDetails,
      socialMedia,
      preferenceDetails,
      specialServices,
    };

    try {
      const response = await fetch("/api/updateProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        console.log("Profile updated successfully");
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const user_data_str = localStorage.getItem("user_details");
    const user_data = JSON.parse(user_data_str);

    const apiUrl = apiEndpoint + "/api/get_artist_user/";
    const refreshToken = user_data.data.refresh;

    getNewAccessToken(refreshToken)
      .then((accessToken) => {
        axios
          .get(apiUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            console.log(response.data, "artist_details");
            const artistDetails = response.data.detail; // Extract artist details from response

            // Update individual fields of artistData state
            setBasicDetails((prevData) => ({
              ...prevData,
              first_name: artistDetails.first_name,
              email: artistDetails.email,
              last_name: artistDetails.last_name,
              user_name: artistDetails.user_name,
              gender: artistDetails.gender,
              date_of_birth: artistDetails.date_of_birth,
              bio: artistDetails.bio,
            }));
            setPersonalDetails((prevData) => ({
              ...prevData,
              height: artistDetails.height,
              weight: artistDetails.weight,
              selectedHairType: artistDetails.selectedHairType,
              hairColor: artistDetails.hairColor,
              bodyType: artistDetails.bodyType,
              selectedEyeColor: artistDetails.selectedEyeColor,
              selectedSkinColor: artistDetails.selectedSkinColor,
              currentState: artistDetails.currentState,
              currentCity: artistDetails.currentCity,
              nativeState: artistDetails.nativeState,
              nativeCity: artistDetails.nativeCity,
            }));
            setProfessionalDetails([
              {
                languages: [artistDetails.languages_known],
                skills: [artistDetails.skills],
                projectType: "",
                role: "",
                projectName: "",
                projectLink: "",
                selectedImage: null,
              },
            ]);
            setSocialMedia((prevData) => ({
              ...prevData,
              facebook: artistDetails.facebook,
              instagram: artistDetails.instagram,
              twitter: artistDetails.twitter,
              linkedIn: artistDetails.linkedin,
              youtube: artistDetails.youtube,
            }));
            setPreferenceDetails({
              consider_me_for: [artistDetails.consider_me_for],
              available_for: [artistDetails.available_for],
              preferred_format: [artistDetails.preferred_format],
              preferred_genre: [artistDetails.preferred_genre],
              interest: [artistDetails.interest],
            });
            setCheckboxData({
              interest: [artistDetails.interest],
            });
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching new access token:", error);
      });
  }, []);
  return (
    <Screen>
      <Container>
        <form onSubmit={handleSubmit}>
          <EditBasicDetailsCard data={basicDetails} onChange={handleChange} />
          <EditPersonalDetailsCard
            data={personalDetails}
            onChange={handleChange}
          />
          <EditProfessionalDetailsCard
            data={professionalDetails}
            onChange={handleChange}
          />
          <EditSocialMediaCard
            data={socialMedia}
            onChange={handleChange}
          />
          <EditPreferenceDetailsCard
            data={preferenceDetails}
            onChange={handleChange}
          />
          <EditSpecialServicesCard
            data={specialServices}
            onChange={handleChange}
          />
          {/* <button type="submit">Update Profile</button> */}
        </form>
      </Container>
    </Screen>
  );
};

export default UpdateProfile;
