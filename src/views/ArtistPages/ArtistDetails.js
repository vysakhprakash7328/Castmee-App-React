import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { Row, Col } from 'react-bootstrap';
import ArtistPersonalDetailsCard from './ArtistPersonalDetailsCard';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArtistMoreDetailsCard from './ArtistMoreDetailsCard';

const useStyles = makeStyles((theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
      display: "none",
    },
  },
  mainCard: {
    height: 350,
    width: 350,
    margin: 'auto',
    marginBottom: theme.spacing(2),
    float: 'left',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  smallCard: {
    height: 170,
    width: 170,
    marginBottom: theme.spacing(2),
    float: 'left',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  halfCard: {
    height: 170,
    width: 170,
    marginBottom: theme.spacing(2),
    float: 'left',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  rightCard: {
    height: 360,
    width: 170,
    marginLeft: theme.spacing(2),
    float: 'left',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
  },
  ProfilePercentageCard: {
    borderRadius: '15px',
    width: '50%',
    height: '40px',
    backgroundColor: '#FFFFFF',
    color: 'grey',
    border: '3px solid #FEC400',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadInput: {
    display: 'none',
  },
  uploadButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: 'None'
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bioCard: {
    width: '90%',
    height: '30%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  '@media (max-width: 768px)': {
    mainCard: {
      height: 230,
      width: 230,
    },
    smallCard: {
      height: 105,
      width: 105,
    },
    halfCard: {
      height: 100,
      width: 100,
    },
    rightCard: {
      height: 240,
      width: 100,
    },
    bioCard: {
      width: '100%',
    },
  },
  
  cardContent: {
    width: '100%', /* Fills the width of the parent container (Card) */
    height: '100%', /* Fills the height of the parent container (Card) */
    display: 'flex',
    flexDirection: 'column',
  },
  bioInput: {
    width: '100%', /* Fills the width of the parent container (CardContent) */
    height: '40%', /* Fills the height of the parent container (CardContent) */
    resize: 'none', /* Disables resizing */
    boxSizing: 'border-box', /* Ensures padding and border are included in the height */
    borderRadius: '10px',
  },
  personaldetailsCard: {
    marginTop: '10px',
    width: '90%',
    height: '70%',
  },
  PersonalcardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  HeightCard: {
    width: '80%',
    height: '5%',
  },


}));

export default function ArtistDetails() {
  const classes = useStyles();
  const fileInputRefs = useRef([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleUpload = (index) => (event) => {
    fileInputRefs.current[index].click();
  };

  const handleFileChange = (index) => (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = {
        index,
        dataURL: e.target.result,
      };
      setUploadedImages((prevImages) => [...prevImages, imageData]);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={classes.MainDiv}>
      <Row>
        <Col md={6}>
          {/* <div style={{ marginBottom: '10px' }}>
            <div className={classes.ProfilePercentageCard}>
              Complete Profile  &nbsp; &nbsp; &nbsp; &nbsp;  <ArrowForwardIosIcon style={{fontSize:'20px'}}/>
            </div>
          </div> */}
          <Card className={classes.mainCard}>
            <CardContent>
              {/* Main card content */}
              {uploadedImages.map((imageData) => {
                if (imageData.index === 0) {
                  return (
                    <img
                      key={imageData.dataURL}
                      src={imageData.dataURL}
                      alt="Uploaded"
                      className={classes.uploadedImage}
                    />
                  );
                }
                return null;
              })}
              <input
                type="file"
                ref={(element) => (fileInputRefs.current[0] = element)}
                className={classes.uploadInput}
                onChange={handleFileChange(0)}
              />
              <Button
                className={classes.uploadButton}
                variant="outlined"
                onClick={handleUpload(0)}
              >
                <AddIcon />
              </Button>
            </CardContent>
          </Card>
          <div className={classes.rightCard}>
            <Card className={classes.halfCard}>
              <CardContent>
                {/* First half card content */}
                {uploadedImages.map((imageData) => {
                  if (imageData.index === 1) {
                    return (
                      <img
                        key={imageData.dataURL}
                        src={imageData.dataURL}
                        alt="Uploaded"
                        className={classes.uploadedImage}
                      />
                    );
                  }
                  return null;
                })}
                <input
                  type="file"
                  ref={(element) => (fileInputRefs.current[1] = element)}
                  className={classes.uploadInput}
                  onChange={handleFileChange(1)}
                />
                <Button
                  className={classes.uploadButton}
                  variant="outlined"
                  onClick={handleUpload(1)}
                >
                  <AddIcon />
                </Button>
              </CardContent>
            </Card>
            <Card className={classes.halfCard}>
              <CardContent>
                {/* Second half card content */}
                {uploadedImages.map((imageData) => {
                  if (imageData.index === 2) {
                    return (
                      <img
                        key={imageData.dataURL}
                        src={imageData.dataURL}
                        alt="Uploaded"
                        className={classes.uploadedImage}
                      />
                    );
                  }
                  return null;
                })}
                <input
                  type="file"
                  ref={(element) => (fileInputRefs.current[2] = element)}
                  className={classes.uploadInput}
                  onChange={handleFileChange(2)}
                />
                <Button
                  className={classes.uploadButton}
                  variant="outlined"
                  onClick={handleUpload(2)}
                >
                  <AddIcon />
                </Button>
              </CardContent>
            </Card>
          </div>

          <Grid container spacing={2}>
            {[...Array(3)].map((_, index) => (
              <Grid item key={index}>
                <Card className={classes.smallCard}>
                  <CardContent>
                    {/* Small card content */}
                    {uploadedImages.map((imageData) => {
                      if (imageData.index === index + 3) {
                        return (
                          <img
                            key={imageData.dataURL}
                            src={imageData.dataURL}
                            alt="Uploaded"
                            className={classes.uploadedImage}
                          />
                        );
                      }
                      return null;
                    })}
                    <input
                      type="file"
                      ref={(element) => (fileInputRefs.current[index + 3] = element)}
                      className={classes.uploadInput}
                      onChange={handleFileChange(index + 3)}
                    />
                    <Button
                      className={classes.uploadButton}
                      variant="outlined"
                      onClick={handleUpload(index + 3)}
                    >
                      <AddIcon />
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Col>
        <Col>
      
        <ArtistPersonalDetailsCard />
          
          

        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <br/>
          <Card className={classes.bioCard}>
            <CardContent className={classes.cardContent}>
              <div className={classes.titleContainer}>
                <span className={classes.title} style={{ fontSize: '25px' ,fontFamily: "playfair display",fontWeight: 'bold',color:'#474646'}}>Bio</span>
                <br/>
                <span style={{ fontSize: '15px' ,fontFamily: "playfair display",fontWeight: 'bold',color:'#706e6e'}}>Write about yourself...</span>
              </div>
              <textarea
                className={classes.bioInput}
                placeholder="  Enter bio here..."
              />
              
            </CardContent>
          </Card>
          
         
        </Col>
      </Row>
    </div>
  );
}
