import React, { useState, useEffect } from "react";

import {
    Badge,
    Button,
    Card,
    Form,
    Navbar,
    Nav,
    Container,
    Row,
    Col,
    ProgressBar,
    ButtonGroup,
    Modal,
    Tab, Tabs

} from "react-bootstrap";
import './productionhousehomecss.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import apiEndpoint from "./Services/ApiConfig";
import axios from 'axios';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SortIcon from '@mui/icons-material/Sort';

import 'react-toastify/dist/ReactToastify.css';
import UserProfileGrid from "./UserProfileGrid";
import UserProfileList from "./UserProfileList";
import UserProfileView from "./UserProfileSingleView";
import UserProfileCard from "./UserProfileCard";

import getNewAccessToken from "./Services/getRefreshToken";
import FilterModal from "./FilterPopup";


const usersPerPage = 4; // Number of users to display per page




function ProductionHouseHome() {

    const [editprofile, setEditProfile] = React.useState(0);
    const [ProgressPercentage, setProgressPrecentage] = React.useState(25)
    const [filter, setFilter] = React.useState("");
    const [selectedAgeRange, setSelectedAgeRange] = React.useState([0, 40]);
    const [showAdvancedFilters, setShowAdvancedFilters] = React.useState(false);
    const [view, setView] = React.useState("grid");
    const [showProfileModal, setShowProfileModal] = React.useState(false);
    const [selectedProfile, setSelectedProfile] = React.useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextProfile = () => {
        setCurrentIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
    };

    const previousProfile = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
    };


    const handleChange = (event) => {
        const newValue = event.currentTarget.getAttribute('data-value');
        setView(newValue);
        handleClose();
    };


    
    const handleProfileClick = (profile) => {
        setSelectedProfile(profile);
        setShowProfileModal(true);
    };
    const handleCloseProfileModal = () => {
        setSelectedProfile(null);
    };
   
    const [data, setData] = useState([]);
    const [filterData, setDropdownData] = useState([]);


    useEffect(() => {
        const user_data_str = localStorage.getItem('user_details');
        const user_data = JSON.parse(user_data_str);
        const apiUrl = apiEndpoint + '/api/get_artists/';

        const refreshToken = user_data.data.refresh;

        getNewAccessToken(refreshToken)
            .then((accessToken) => {
                axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                    .then(response => {
                        setData(response.data.detail);
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            })
            .catch((error) => {
                console.log(error)
            });
    }, []);



    useEffect(() => {
        const user_data_str = localStorage.getItem('user_details');
        const user_data = JSON.parse(user_data_str);
        const apiUrl = apiEndpoint + '/api/dropdowns_for_artist/';
        const refreshToken = user_data.data.refresh;

        getNewAccessToken(refreshToken)
            .then((accessToken) => {
                axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                    
                })
                .then(response => {
                    let response_data = response.data.detail
                    console.log(response_data)
                    setDropdownData(response.data.detail);
                })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            })
            .catch((error) => {
                console.error('Error fetching new access token:', error);
            });
    }, []);

    const [currentPage, setCurrentPage] = React.useState(1);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);
    const [showFilterModal, setShowFilterModal] = React.useState(false);
    const [selectedFilters, setSelectedFilters] = React.useState([]);

   
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    // useEffect(() => {
    //     console.log(selectedFilter, 'filters');
    //     console.log(selectedOptions, 'options')
    // }, [selectedFilter]);

    const handleFilterSubmit = () => {

        const user_data_str = localStorage.getItem('user_details');
        const user_data = JSON.parse(user_data_str);
        const apiUrl = apiEndpoint + '/api/filter_artists/';
        const refreshToken = user_data.data.refresh;
        getNewAccessToken(refreshToken)
            .then((accessToken) => {
                axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },

                    selectedOptions

                })
                    .then(response => {
                        console.log(response.data + 'filter response data');
                        setData(response.data.detail);
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            })
            .catch((error) => {
                console.error('Error fetching new access token:', error);
            });

        setShowFilterModal(false);

    }
    const [showModal, setShowModal] = useState(false);

    // Sample filters data
    const filters = [
        {
            key: 'category',
            label: 'Category',
            options: ['Electronics', 'Clothing', 'Books'],
        },
        {
            key: 'price',
            label: 'Price Range',
            options: ['Under $50', '$50 - $100', 'Over $100'],
        },
        {
            key: 'brand',
            label: 'Brand',
            options: ['Samsung', 'Nike', 'Apple', 'Adidas'],
        },
    ];

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleHideModal = () => {
        setShowModal(false);
    };

    return (
        <>

            <Container fluid>
                <Row>
                    <Col xs={6}>
                        <Menu
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem data-value="grid" onClick={handleChange}>Grid View</MenuItem>
                            <MenuItem data-value="list" onClick={handleChange}>List View</MenuItem>
                            <MenuItem data-value="single" className="d-lg-none" onClick={handleChange}>Single Profile View</MenuItem>
                        </Menu>
                        <SortIcon style={{ width: '30px', height: '30px', color: 'grey' }} onClick={handleShowModal} />
                    </Col>
                    <Col xs={6} className="text-right">
                        <ViewCompactIcon style={{ width: '30px', height: '30px', color: 'grey' }} onClick={handleClick} />
                    </Col>
                </Row>

                <br />

                {view === "grid" && <UserProfileGrid onProfileClick={handleProfileClick} userdata={data} />}
                {view === "list" && <UserProfileList onProfileClick={handleProfileClick} userdata={data} />}
                {view === "single" &&
                    <>
                        <Row>
                            <Col className="text-center">
                                <Button variant="secondary" onClick={previousProfile} className="d-none d-lg-inline">
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                </Button>
                            </Col>
                            <Col xs={12} className="d-lg-none">
                                {/* Render UserProfileView only on mobile screens */}
                                <UserProfileView profile={data[currentIndex]} onNext={nextProfile} onPrevious={previousProfile} onProfileClick={handleProfileClick} />
                            </Col>
                            <Col className="text-center">
                                <Button variant="secondary" onClick={nextProfile} className="d-none d-lg-inline">
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </Button>
                            </Col>
                        </Row>
                    </>
                }
                {selectedProfile && (
                    <UserProfileCard profile={selectedProfile} onClose={handleCloseProfileModal} />
                )}
                
                <FilterModal show={showModal} onHide={handleHideModal} filters={filterData} setuserData={setData} />


            </Container>

        </>
    );
}

export default ProductionHouseHome;
