import React from 'react';
import apiEndpoint from 'views/Services/ApiConfig';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
  profileImage: {
    width: '400px', // Set your desired width
    height: 'auto', // Set your desired height
    objectFit: 'cover',
  },
  container: {
    height: 'auto', // Set the height of the container
    overflowY: 'auto', // Enable vertical scrolling
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    width: '100%', // Set the width of the card
    marginBottom: '20px', // Add some spacing between cards
  },
});

export default function ArtistProfileView({ user_details }) {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Card className={classes.card}>
                <img
                    src={apiEndpoint + user_details.headshot_image}
                    alt={user_details.user_name}
                    className={classes.profileImage} // Apply styles to the image
                />
            </Card>
            <Card className={classes.card}>   
                <CardContent>
                    <p><strong>Bio:</strong> {user_details.bio}</p>
                </CardContent>
            </Card>
            <Card className={classes.card}>
                <CardContent>
                    <p><strong>Username:</strong> {user_details.user_name}</p>
                </CardContent>
            </Card>
            <Card className={classes.card}>
                <CardContent>
                    <p><strong>Email:</strong> {user_details.email}</p>
                </CardContent>
            </Card>
            <Card className={classes.card}>
                <CardContent>
                    <p><strong>Date of Birth:</strong> {user_details.date_of_birth}</p>
                </CardContent>
            </Card>
            {/* Add more Card components for other details */}
        </div>
    )
}
