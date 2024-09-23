import React, { useState, useEffect } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import apiEndpoint from "./Services/ApiConfig";
import axios from "axios";
import getNewAccessToken from "./Services/getRefreshToken";
import maleicon from "../assets/img/male icon.png";
import femaleicon from "../assets/img/female icon.png";
import UserProfileCard from "./UserProfileCard";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  profileIcon: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  card: {
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    transition: "0.3s",
    "&:hover": {
      boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2)",
    },
  },
});

function WishList() {
  const classes = useStyles();

  const [favorites, setFavorites] = useState([]);
  const [showProfileModal, setShowProfileModal] = React.useState(false);
  const [selectedProfile, setSelectedProfile] = React.useState(null);

  const removeFromWishList = (profileId, e) => {
    e.stopPropagation();

    const updatedFavorites = favorites.filter(
      (profile) => profile.id !== profileId
    );
    setFavorites(updatedFavorites);
    const user_data_str = localStorage.getItem("user_details");
    const user_data = JSON.parse(user_data_str);
    const apiUrl = apiEndpoint + "/api/add_to_wishlist/";

    const producer_id = user_data.data.data.id;
    const refreshToken = user_data.data.refresh;
    const artist_id = profileId;
    getNewAccessToken(refreshToken)
      .then((accessToken) => {
        axios
          .post(
            apiUrl,
            { producer_id, artist_id },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const user_data_str = localStorage.getItem("user_details");
    const user_data = JSON.parse(user_data_str);
    const apiUrl = apiEndpoint + "/api/get_related_wishlist/";

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
            console.log(response.data);
            setFavorites(response.data.detail);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
    setShowProfileModal(true);
  };

  const handleCloseProfileModal = () => {
    setSelectedProfile(null);
  };

  const handleRequestPhonenumber = () => {
    console.log("clicked....");
    const user_data_str = localStorage.getItem("user_details");
    const user_data = JSON.parse(user_data_str);
    const apiUrl = apiEndpoint + "/api/request_contact/";
    const refreshToken = user_data.data.refresh;
    const user_id = user_data.data.data.id;
    const artistId = favorites.map((user) => user.id);

    console.log(artistId, user_id);

    getNewAccessToken(refreshToken)
      .then((accessToken) => {
        axios
          .post(
            apiUrl,
            { artist_id: artistId, producer_id: user_id },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container mt-4">
      {favorites && favorites.length === 0 ? (
        <div className="text-center">Wishlist empty</div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {favorites.map((profile) => (
            <Col key={profile.id}>
              <Card
                className={`mb-4 ${classes.card}`}
                onClick={() => handleProfileClick(profile)}
                style={{ cursor: "pointer" }}
              >
                <Card.Body>
                  <div className="d-flex align-items-center">
                    <div className="profile-image-container me-3">
                      {profile.headshot_image ? (
                        <img
                          src={apiEndpoint + profile.headshot_image}
                          alt={profile.user_name}
                          className={classes.profileIcon}
                        />
                      ) : profile.gender === "male" ? (
                        <img
                          src={maleicon}
                          alt="Male"
                          className={classes.profileIcon}
                        />
                      ) : (
                        <img
                          src={femaleicon}
                          alt="Female"
                          className={classes.profileIcon}
                        />
                      )}
                    </div>
                    <div>
                      <Card.Title>{profile.user_name}</Card.Title>
                      <p>Bio: {profile.bio || "Not available"}</p>
                      <p>Age: {profile.age || "Not available"}</p>
                      <p>Gender: {profile.gender || "Not available"}</p>
                    </div>
                  </div>
                  <Button
                    variant="danger"
                    onClick={(e) => removeFromWishList(profile.id, e)}
                    className="mt-3 float-end"
                  >
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {favorites && favorites.length > 0 && (
        <Row>
          <Col className="text-end">
            <Button
              variant="primary"
              onClick={handleRequestPhonenumber}
              className="mt-3"
            >
              Request Phone Number
            </Button>
          </Col>
        </Row>
      )}

      {selectedProfile && (
        <UserProfileCard
          profile={selectedProfile}
          onClose={handleCloseProfileModal}
        />
      )}
    </div>
  );
}

export default WishList;
