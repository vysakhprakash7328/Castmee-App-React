import React, { useState, useEffect } from "react";
import apiEndpoint from "views/Services/ApiConfig";
import axios from "axios";
import getNewAccessToken from "views/Services/getRefreshToken";

const styles = {
  ContentContainer: {
    height: "80vh",
    overflowY: "auto",
    padding: "20px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  WishlistContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "16px",
    width: "100%",
    maxWidth: "1200px",
  },
  Card: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#282828",
    borderRadius: "5px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  ImageContainer: {
    flex: "0 0 30%",
    height: "200px",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  DetailsContainer: {
    flex: "1 1 70%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "16px",
  },
  Text: {
    color: "#ffffff",
    fontSize: "18px",
    fontFamily: "Source Sans Pro",
    fontWeight: 700,
    lineHeight: "22px",
    marginBottom: "8px",
  },
  AgeLocationText: {
    color: "#ffffff",
    fontSize: "16px",
    fontFamily: "Source Sans Pro",
    fontWeight: 400,
    lineHeight: "19px",
    marginBottom: "8px",
  },
  RemoveText: {
    color: '#ffffff',
    fontSize: '16px',
    fontFamily: 'Source Sans Pro',
    fontWeight: 400,
    lineHeight: '19px',
    cursor: 'pointer',
    textAlign: 'center',
    padding: "12px",
  },
  EmptyMessage: {
    color: "#ffffff",
    fontSize: "18px",
    fontFamily: "Source Sans Pro",
    fontWeight: 400,
    textAlign: "center",
    padding: "20px",
  },
  RequestButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#ff5722",
    color: "#ffffff",
    border: "none",
    borderRadius: "24px",
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: 700,
    cursor: "pointer",
    zIndex: 1000,
  }
};

export default function WishlistView() {
  const [favorites, setFavorites] = useState([]);

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
            console.log(response.data, 'favoritessssss');
            setFavorites(response.data.detail || []);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleWishlist = (user) => {
    const user_data_str = localStorage.getItem("user_details");
    const user_data = JSON.parse(user_data_str);
    const apiUrl = apiEndpoint + "/api/add_to_wishlist/";

    const producer_id = user_data.data.data.id;
    const refreshToken = user_data.data.refresh;
    const artist_id = user.id;

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
            setFavorites(prevFavorites => 
              prevFavorites.filter(fav => fav.id !== user.id)
            );
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
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
    <div style={styles.ContentContainer}>
      {favorites.length === 0 ? (
        <div style={styles.EmptyMessage}>Your wishlist is empty</div>
      ) : (
        <div style={styles.WishlistContainer}>
          {favorites.map((user, index) => (
            <div style={styles.Card} key={index}>
              <div
                style={{
                  ...styles.ImageContainer,
                  backgroundImage: `url(${apiEndpoint + user.headshot_image})`,
                }}
              />
              <div style={styles.DetailsContainer}>
                <div style={styles.Text}>{user.first_name} {user.last_name}</div>
                <div style={styles.AgeLocationText}>{user.AgeLocation}</div>
                <div style={styles.RemoveText} onClick={() => handleWishlist(user)}>Remove</div>
              </div>
            </div>
          ))}
        </div>
      )}
      {favorites.length > 0 && (
        <button style={styles.RequestButton} onClick={handleRequestPhonenumber}>
          Request Phone Numbers
        </button>
      )}
    </div>
  );
}
