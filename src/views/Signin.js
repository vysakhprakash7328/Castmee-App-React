import React, { useState,useEffect } from "react";
import "./signin.css"; // Import your CSS file
import { useHistory } from "react-router-dom";
import axios from 'axios';
import apiEndpoint from "./Services/ApiConfig";
import AddressFormProducer from "./AddressFormProducer";
import AddressFormArtist from "./AddressFormArtist";
import FreelancerFormProduction from "./FreelancerFormProduction";
import CompanyFormProduction from "./CompanyFormProduction";
import SignupFormArtist from "./SignupFormArtist";
import SignupFormProducer from "./SignupFormProducer";

const LoginForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionType, setSelectedOptionType] = useState(null);

  const [activePage, setActivePage] = React.useState(0);
  const [activePageArtist, setActivePageArtist] = React.useState(0);
  const [formDataArtistSignup, setformDataArtistSignup] = useState({
    username: '',
    password: '',
    confirm_password: '',
    email: '',
    first_name: '',
    last_name: '',
    phone:'',
    gender:'',
    date_of_birth:''
  });
  const [formDataProducerSignup, setformDataProducerSignup] = useState({
    username: '',
    password: '',
    confirm_password: '',
    email: '',
    first_name: '',
    last_name: '',
    user_type: '',
    company_name: '',
    company_registration: '',
    company_address: '',
    contact_no: '',
    offcl_mmbrship_or_assction_rltd_to_film_prdction: false,
    membership_id: '',
    membership_name: '',
    reference_id: '',
    reference_contact_no: '',
    project_name: '',
    project_location: '',
    project_type: '',
    worked_projects: '',
    tid: ''
  });

  


  const handleArtistFormChange = (event) => {
    const { name, value, checked, type } = event.target;
    console.log(name,value,checked,type)


    let newValue;
    if (type === 'checkbox') {
        newValue = checked;
    } else if (type === 'radio') {
        newValue = value;
    } else {
        newValue = value;
    }

    

    setformDataArtistSignup((prevFormData) => ({
        ...prevFormData,
        [name]: newValue
    }));
};
  const handleProducerFormChange = (event) => {
    const { name, value, checked, type } = event.target;
    console.log(name,value,checked,type)


    let newValue;
    if (type === 'checkbox') {
        newValue = checked;
    } else if (type === 'radio') {
        newValue = value;
    } else {
        newValue = value;
    }


    setformDataProducerSignup((prevFormData) => ({
        ...prevFormData,
        [name]: newValue
    }));
};


  const handleArtistSignupSubmit = async () => {
    

    // if (formData.password !== formData.confirm_password) {
    //   alert('Passwords do not match');
    //   return;
    // }

    // Example of Axios request
    try {
      const response = await axios.post(apiEndpoint + '/api/artist_registration/', formDataArtistSignup);
      console.log(response.data);
      console.log("Registration successful");
      alert(formDataArtistSignup);

    } catch (error) {
      console.error('Error during registration:', error);
      alert('Error while storing....', error);

    }
  };
  const handleProducerSignupSubmit = async () => {
    

    // Example of Axios request
    try {
      const response = await axios.post(apiEndpoint + '/api/producer_registration/', formDataProducerSignup);
      console.log(response.data);
      console.log("Registration successful");
      alert('Registration successful');

    } catch (error) {
      console.error('Error during registration:', error);
      alert('Error while storing....', error);

    }
  };


  useEffect(() => {
    console.log(activePage)
    // console.log(formDataArtistSignup)
    console.log(formDataProducerSignup)
  })

  const handleNextPage = () => {
    setActivePage(activePage + 1)
  }
  const handlePrevPage = () => {
    setActivePage(activePage - 1)
  }

  const handleNextPageArtist = () => {
    setActivePageArtist(activePageArtist + 1)
  }
  const handlePrevPageArtist = () => {
    setActivePageArtist(activePageArtist - 1)
  }

  const handlePrevSignupPage = () => {
    setSelectedOption(null)

  }

  const handlePrevProducerTypePage = () => {

    setSelectedOptionType(null)
  }

  const handleNextSignupProducer = () => {
    setActivePage(null);
  }



  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  const handleOptionTypeChange = (option) => {
    setSelectedOptionType(option);
    const userType = (option === 'freelancer') ? 'freelancer' : 'company';
    handleProducerFormChange({ target: { name: 'user_type', value: userType } });
  };

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  const history = useHistory();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(apiEndpoint + '/api/login/', formData);
      console.log('Response:', response);
      if (response.status === 200) {
        localStorage.setItem('user_details', JSON.stringify(response.data))
        console.log(response.data.data.user_type)
        if (response.data.data.user_type === 'producer') {
          history.push('/admin/ProductionHouseHome');

        }
        else if (response.data.data.user_type === 'artist') {
          history.push('/artist/user')
        }



      }

    } catch (error) {
      console.error('Error:', error);
      alert("username or password incorrect");
    }
  };

  const handleChange = (e, fieldName) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };



  return (
    <div className={`container-main ${isSignUp ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" value={formData.username}
                onChange={(e) => handleChange(e, 'username')} />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" value={formData.password}
                onChange={(e) => handleChange(e, 'password')} />
            </div>
            <input type="submit" value="Login" className="btn-btn solid" onClick={handleSubmit} />
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
          <form action="#" className="sign-up-form">




            {activePage === 0 ?

              <>

                {selectedOption === 'production' ?
                <>
                            <h2 className="title">Personal Details</h2>

                  <AddressFormProducer formData={formDataProducerSignup} handleFormChange={handleProducerFormChange} handleNextPage={handleNextPage} handlePrevPage={handlePrevSignupPage} /></> :
                  selectedOption === 'artist' ?
                    <>
                      {activePageArtist === 0 ?
                      <>                            <h2 className="title">Personal Details</h2>
                        <AddressFormArtist formDataSignup={formDataArtistSignup} handleFormChange={handleArtistFormChange} handleNextPageArtist={handleNextPageArtist} handlePrevPage={handlePrevSignupPage} />
                        </>
                        : activePageArtist === 1 ?<>                                    <h2 className="title">Verify Artist</h2>
                        <SignupFormArtist formDataSignup={formDataArtistSignup} handleFormChange={handleArtistFormChange} handleSubmit={handleArtistSignupSubmit} handlePrevPageArtist={handlePrevPageArtist} /></> : null}
                    </>
                    :
                    <div>
                                  <h2 className="title">I'm ...</h2>

                      <button
                        style={{
                          display: 'block',
                          width: '100%',
                          padding: '10px 20px',
                          cursor: 'pointer',
                          border: '1px solid #ccc',
                          borderRadius: '30px',
                          marginBottom: '10px',
                          backgroundColor: selectedOption === 'artist' ? '#007bff' : 'transparent',
                          color: selectedOption === 'artist' ? '#fff' : '#000',
                        }}
                        

                        onClick={() => handleOptionChange('artist')}
                      >
                        I'm an Artist
                      </button>
                      <button
                        style={{
                          display: 'block',
                          width: '100%',
                          padding: '10px 20px',
                          cursor: 'pointer',
                          border: '1px solid #ccc',
                          borderRadius: '30px',
                          marginBottom: '20px',

                          backgroundColor: selectedOption === 'production' ? '#007bff' : 'transparent',
                          color: selectedOption === 'production' ? '#fff' : '#000',
                        }}
                        onClick={() => handleOptionChange('production')}
                      >
                        I'm a Production House
                      </button>
                    </div>
                }
              </>

              : activePage === null ? (
                <SignupFormProducer formData={formDataProducerSignup} handleFormChange={handleProducerFormChange} handlePrevPage={handlePrevProducerTypePage} handleSubmit = {handleProducerSignupSubmit}/>
              ) :

              <div>

                {selectedOptionType === 'freelancer' ?
                <>

                 <FreelancerFormProduction formData={formDataProducerSignup} setActivePage={setActivePage} handleFormChange={handleProducerFormChange} handlePrevPage={handlePrevProducerTypePage} handleNextSignup = {handleNextSignupProducer}/> </>: selectedOptionType === 'company' ? 
                 <>
                                                                     <h2 className="title">Company Details</h2>

                 <CompanyFormProduction formData={formDataProducerSignup} handleFormChange={handleProducerFormChange} handlePrevPage={handlePrevProducerTypePage} handleNextSignup = {handleNextSignupProducer} /> </>:
                  <>
                                    <h2 className="title">Select User Type</h2>

                    <button
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '10px 20px',
                        cursor: 'pointer',
                        border: '1px solid #ccc',
                        borderRadius: '30px',
                        marginBottom: '10px',
                        backgroundColor: selectedOptionType === 'freelancer' ? '#007bff' : 'transparent',
                        color: selectedOptionType === 'freelancer' ? '#fff' : '#000',
                      }}
                      name="user_type"
                      onClick={() => handleOptionTypeChange('freelancer')}
                    >
                      Freelancer
                    </button>
                    <button
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '10px 20px',
                        cursor: 'pointer',
                        border: '1px solid #ccc',
                        borderRadius: '30px',
                        marginBottom: '20px',

                        backgroundColor: selectedOptionType === 'company' ? '#007bff' : 'transparent',
                        color: selectedOptionType === 'company' ? '#fff' : '#000',
                      }}
                      name="user_type"
                      onClick={() => handleOptionTypeChange('company')}
                    >
                      Company
                    </button>
                  </>
                }
              </div>

            }

            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
          <img width={"170px"} src={require("assets/img/castmeehead.png")} alt="..." />

            <h3>New here ?</h3>
            <p>

            </p>
            <button className="btn-btn transparent" onClick={handleSignUpClick}>
              Sign up
            </button>
          </div>
          <img src="img/log.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
            <img width={"170px"} src={require("assets/img/castmeehead.png")} alt="..." />


            </p>
            <button className="btn-btn transparent" onClick={handleSignInClick}>
              Sign in
            </button>
          </div>
          <img src="img/register.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
