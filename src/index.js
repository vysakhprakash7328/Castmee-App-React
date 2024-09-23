
import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import RegistrationPage from "views/ProductionHouseRegistrationPage";
import SignIn from "views/Signin";

import AdminLayout from "layouts/Admin.js";
import Artist from "layouts/ArtistLayout";
import SignUp from "./views/RegistrationPage";
import SignupStep1 from "views/LandingPage/SignupStep1";
import Home from "views/LandingPage/Home";
import ArtistProfilePage from "views/ArtistPages/ArtistProfilePage";
import ArtistUserProfile from "views/ArtistPages/ArtistUserProfile";
import CastingProducerProfileView from "views/CastingProducerPages/CastingProducerProfileView";
import CastingProducerWishlist from "views/CastingProducerPages/CastingProducerWishlist";
import SignupPage from "views/SignupPages/SignupPage";
import SignupPageRole from "views/SignupPages/SelectRoleSignup";
import ArtistEditProfile from "views/ArtistPages/ArtistEditProfile";
import Modal from "views/LandingPage/sample";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/artist" render={(props) => <Artist {...props} />} />

      <Route path="/signin" render={() => <SignIn />} />
      <Route path="/SignupStep1" render={() => <SignupStep1 />} />
      <Route path="/signuppage" render={() => <SignupPage />} />
      <Route path="/signuppagerole" render={() => <SignupPageRole />} />
      <Route path="/artistprofilepage" render={() => <ArtistProfilePage />} /> 
      <Route path="/artistuserprofile" render={() => <ArtistUserProfile />} />
      <Route path="/artisteditprofile" render={() => <ArtistEditProfile />} />
      <Route path="/castingproducerprofileview" render={() => <CastingProducerProfileView />} />
      <Route path="/castingproducerwishlist" render={() => <CastingProducerWishlist />} />
      <Route path="/home" render={() => <Home />} /> 
      <Route path="/TransitionModal1" render={() => <Modal />} /> 


    </Switch> 
  </BrowserRouter>
);