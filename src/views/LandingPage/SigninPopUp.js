import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useLocation, Link } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';

// Importing images
import Facebookicon from '../../assets/img/facebooktransparent.png';
import Googleicon from '../../assets/img/google.png';
import Twittericon from '../../assets/img/twittertransparent.png';
import castmee from '../../assets/img/castmee.png';
import apiEndpoint from 'views/Services/ApiConfig';

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    margin: theme.spacing(1),
    textTransform: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: theme.spacing(1.5),
    minWidth: 0,
    backgroundColor: '#FEC400', // Yellow color
    color: '#000', // Black text color
    width: '100%',
    '&:hover': {
      backgroundColor: 'linear-gradient(to right, #ffffff, #FEC400)', // Slightly different shade on hover
    },
  },
  icon: {
    width: 30, // Adjust the width of the icons as needed
    marginRight: 5,

  },
  logo: {
    width: 100,
  },
  emailInput: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    border: '1px solid white',
  },
  passwordInput: {
    marginTop: theme.spacing(2),
  },
}));

const FlipBoxContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    backdropFilter: 'blur(30px)',

    perspective: 1000px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FlipBoxInner = styled.div`
    position: relative;
    backdropFilter: 'blur(30px)',
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    ${props => props.flipped && `
        transform: rotateY(180deg);
    `}
`;
const FlipBoxFront = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    backdropFilter: 'blur(30px)',
    justify-content: center;
    align-items: center;
    backface-visibility: hidden;
`;

const FlipBoxBack = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #555;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    backface-visibility: hidden;
    transform: rotateY(180deg);
`;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backdropFilter: 'blur(30px)',
  boxShadow: '0px 0px 30px rgba(227,228,237,0.37)',
  borderRadius: 2,
  border: '2px solid rgba(255,255,255,0.18)',
  p: 4,
};

export default function TransitionsModal({ open, handleClose }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [flipped, setFlipped] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [SignupformData, setSignupFormData] = useState({
    username: '',
    password: '',
    Repeatpassword: '',
  });

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleSignUpRedirect = () => {
    history.push({
      pathname: '/SignupStep1',
      state: { SignupformData: SignupformData }
    });
  };

  const handleChange = (e, fieldName) => {
    const { value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSignupChange = (e, fieldName) => {
    const { value } = e.target;
    setSignupFormData(prevData => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(apiEndpoint + '/api/login/', formData);
      if (response.status === 200) {
        localStorage.setItem('user_details', JSON.stringify(response.data))
        if (response.data.data.user_type === 'producer') {
          history.push('/castingproducerprofileview');
        } else if (response.data.data.user_type === 'artist') {
          history.push('/artistuserprofile')
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert("username or password incorrect");
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <FlipBoxContainer>
            <FlipBoxInner flipped={flipped}>
              <FlipBoxFront>
                <Box sx={style}>
                  <Typography id="transition-modal-title" variant="h6" component="h2">
                    <img src={castmee} alt="Google" className={classes.logo} />
                  </Typography>
                  <Typography id="transition-modal-description" sx={{ color: 'white', textAlign: 'center', fontSize: '20px', fontFamily: "Playfair Display" }}>
                    Welcome to Castmee.
                  </Typography>
                  <TextField
                    className={classes.emailInput}
                    label="Username"
                    variant="outlined"
                    fullWidth
                    name='username'
                    value={formData.username}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'white',
                        },
                        '&:hover fieldset': {
                          borderColor: 'white',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'white',
                        },
                        '& input': {
                          color: 'white', // Set text color to white
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'white',
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: 'white',
                      }
                    }}
                    InputLabelProps={{
                      style: { color: 'white' },
                    }}
                    onChange={(e) => handleChange(e, 'username')}
                  />
                  <br />
                  <TextField
                    className={classes.passwordInput}
                    label="Password"
                    variant="outlined"
                    type='password'
                    fullWidth
                    name='password'
                    value={formData.password}
                    sx={{
                      marginTop: 2,
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'white',
                        },
                        '&:hover fieldset': {
                          borderColor: 'white',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'white',
                        },
                        '& input': {
                          color: 'white', // Set text color to white
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'white',
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: 'white',
                      }
                    }}
                    InputLabelProps={{
                      style: { color: 'white' },
                    }}
                    onChange={(e) => handleChange(e, 'password')}
                  />
                  <Button
                    className={classes.button}
                    sx={{ backgroundColor: '#FEC400', color: '#000', marginTop: 2 }}
                    onClick={handleSubmit}
                  >
                    Sign in
                  </Button>
                  <br />
                  <Typography style={{ color: 'white', textAlign: 'center', fontSize: '15px' }}>OR</Typography>
                  <Button
                    fullWidth
                    sx={{ backgroundColor: '#FEC400', color: '#000', marginTop: 2 }}
                  >
                    <img src={Googleicon} alt="Google" className={classes.icon} />
                    Sign in with google
                  </Button>
                  <br />
                  <Button
                    className={classes.button}
                    fullWidth
                    sx={{ backgroundColor: '#FEC400', color: '#000', marginTop: 2 }}
                  >
                    <img src={Facebookicon} alt="Facebook" className={classes.icon} />
                    Sign in with Facebook
                  </Button>
                  <Typography style={{ color: 'grey', textAlign: 'center', fontSize: '12px' }}>By continuing you are agree to castmee's <Link style={{ color: '#FEC400' }}>Terms and conditions</Link> </Typography>
                  <Typography style={{ color: 'grey', textAlign: 'center', fontSize: '14px' }}>Don't have an account, <Link style={{ color: '#FEC400', fontWeight: 'bold' }} onClick={handleFlip}>Sign up</Link> </Typography>
                </Box>
              </FlipBoxFront>
              <FlipBoxBack>
                <Box sx={style}>
                  <Typography id="transition-modal-title" variant="h6" component="h2">
                    <img src={castmee} alt="Google" className={classes.logo} />
                  </Typography>
                  <Typography id="transition-modal-description" sx={{ color: 'white', textAlign: 'center', fontSize: '20px', fontFamily: "Playfair Display" }}>
                    Create Castmee Account Now
                  </Typography>
                  <TextField
                    className={classes.emailInput}
                    label="Username"
                    variant="outlined"
                    fullWidth
                    name='username'
                    value={SignupformData.username}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'white',
                        },
                        '&:hover fieldset': {
                          borderColor: 'white',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'white',
                        },
                        '& input': {
                          color: 'white', // Set text color to white
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'white',
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: 'white',
                      }
                    }}
                    InputLabelProps={{
                      style: { color: 'white' },
                    }}
                    onChange={(e) => handleSignupChange(e, 'username')}
                  />
                  <br />
                  <TextField
                    className={classes.passwordInput}
                    label="Password"
                    variant="outlined"
                    type='password'
                    fullWidth
                    name='password'
                    value={SignupformData.password}
                    sx={{
                      marginTop: 2,
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'white',
                        },
                        '&:hover fieldset': {
                          borderColor: 'white',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'white',
                        },
                        '& input': {
                          color: 'white', // Set text color to white
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'white',
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: 'white',
                      }
                    }}
                    InputLabelProps={{
                      style: { color: 'white' },
                    }}
                    onChange={(e) => handleSignupChange(e, 'password')}
                  />
                  <br />
                  <TextField
                    className={classes.passwordInput}
                    label="Repeat Password"
                    variant="outlined"
                    type='password'
                    fullWidth
                    name='Repeatpassword'
                    value={SignupformData.Repeatpassword}
                    sx={{
                      marginTop: 2,
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'white',
                        },
                        '&:hover fieldset': {
                          borderColor: 'white',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'white',
                        },
                        '& input': {
                          color: 'white', // Set text color to white
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'white',
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: 'white',
                      }
                    }}
                    InputLabelProps={{
                      style: { color: 'white' },
                    }}
                    onChange={(e) => handleSignupChange(e, 'Repeatpassword')}
                  />
                  <Button
                    className={classes.button}
                    sx={{ backgroundColor: '#FEC400', color: '#000', marginTop: 2 }}
                    onClick={handleSignUpRedirect}
                  >
                    Sign Up
                  </Button>
                  <br />
                  <Typography style={{ color: 'white', textAlign: 'center', fontSize: '15px' }}>OR</Typography>
                  <Button
                    fullWidth
                    sx={{ backgroundColor: '#FEC400', color: '#000', marginTop: 2 }}
                  >
                    <img src={Googleicon} alt="Google" className={classes.icon} />
                    Sign Up with google
                  </Button>
                  <br />
                  <Button
                    className={classes.button}
                    fullWidth
                    sx={{ backgroundColor: '#FEC400', color: '#000', marginTop: 2 }}
                  >
                    <img src={Facebookicon} alt="Facebook" className={classes.icon} />
                    Sign Up with Facebook
                  </Button>
                  <Typography style={{ color: 'grey', textAlign: 'center', fontSize: '12px' }}>By continuing you are agree to castmee's <Link style={{ color: '#FEC400' }}>Terms and conditions</Link> </Typography>
                  <Typography style={{ color: 'grey', textAlign: 'center', fontSize: '14px' }}>Already have an account, <Link style={{ color: '#FEC400', fontWeight: 'bold' }} onClick={handleFlip}>Sign In</Link> </Typography>
                </Box>
              </FlipBoxBack>
            </FlipBoxInner>
          </FlipBoxContainer>
        </Fade>
      </Modal>
    </div>
  );
}
