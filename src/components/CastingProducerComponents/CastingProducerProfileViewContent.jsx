import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Slider from '@material-ui/core/Slider';
import ViewArtistProfile from './ViewArtistProfile';
import AdvancedFilters from './AdvancedFilters';
import apiEndpoint from '../../views/Services/ApiConfig';
import getNewAccessToken from '../../views/Services/getRefreshToken';

// Styled Components
const Screen = styled.div`
  background-color: #161616;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow: hidden;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  height: 56px;
  padding: 0 8px 0 40px;
  border: none;
  border-radius: 24px;
  background-color: #393939;
  color: #bebebe;
  font-size: 18px;
  font-family: 'Source Sans Pro';
  outline: none;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const Icon = styled.svg`
  fill: #bebebe;
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
`;

const Card = styled.div`
  width: 23%;
  min-width: 200px;
  height: 45vh;
  background-color: #282828;
  border-radius: 18px;
  margin: 0 15px 15px 0;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 100%;
    margin: 0 0 15px 0;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 30vh;
  border-radius: 18px;
  background: url(${props => props.imageUrl}) center center / cover no-repeat;
`;

const Text = styled.div`
  color: #ffffff;
  font-size: 18px;
  font-family: 'Source Sans Pro';
  font-weight: 700;
  margin-top: 5px;
  margin-left: 10px;
`;

const CaptionText = styled.div`
  color: #ffffff;
  font-size: 16px;
  font-family: 'Source Sans Pro';
  font-weight: 400;
  margin-top: 5px;
  margin-left: 10px;
`;

const Button = styled.button`
  cursor: pointer;
  width: 114px;
  height: 40px;
  border-radius: 10px;
  background-color: #f7c51c;
  color: #ffffff;
  font-size: 16px;
  font-family: 'Source Sans Pro';
  margin-top: 5px;
  margin-left: 10px;
  border: none;
  outline: none;
`;

const FilterCard = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  background-color: #282828;
  border-radius: 2px;
  transition: width 0.3s ease-in-out;
  overflow: hidden;
  width: ${props => (props.showFilter ? '25%' : '0')};

  @media (max-width: 768px) {
    width: ${props => (props.showFilter ? '100%' : '0')};
    height: auto;
  }
`;

const FilterTitle = styled.div`
  color: #ffffff;
  font-size: 18px;
  font-family: 'Source Sans Pro';
  font-weight: 700;
  margin: 10px 20px;
`;

const FilterInput = styled.input`
  width: 85%;
  height: 34px;
  padding: 0 8px;
  border-radius: 24px;
  background-color: #393939;
  color: #bebebe;
  font-size: 16px;
  font-family: 'Source Sans Pro';
  margin: 20px 20px 0;
  border: none;
  outline: none;
`;

const FilterButton = styled.button`
  cursor: pointer;
  width: 119px;
  height: 40px;
  border-radius: 24px;
  background-color: #f7c51c;
  color: #ffffff;
  font-size: 16px;
  font-family: 'Source Sans Pro';
  margin: 30px 20px 0;
  border: none;
  outline: none;
`;

const ShowFilterButton = styled.button`
  border-radius: 10px;
  border: 1px solid #f7c51c;
  background-color: #161616;
  color: white;
  position: absolute;
  top: 26%;
  right: 20px;
  font-size: 16px;
  width: 80px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 8px;
  z-index: 1000;
`;

const AgeText = styled.div`
  color: #ffffff;
  font-family: 'Source Sans Pro';
  font-size: 16px;
  margin-left: 12px;
`;

const ShowAdvancedFiltersButton = styled.a`
  font-size: 16px;
  float: right;
  margin-right: 10%;
  margin-top: 10%;
  cursor: pointer;
`;

// Icon Component
const IconComponent = () => (
  <Icon viewBox="0 0 512 512">
    <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
  </Icon>
);

// Modal Component
const ModalComponent = ({ onClose, user }) => (
  <ModalContainer>
    <ViewArtistProfile user={user} />
    {/* <Button onClick={onClose}>Close</Button> */}
  </ModalContainer>
);

// Custom Hooks
const useFetchData = (url, setData) => {
  useEffect(() => {
    const fetchData = async () => {
      const user_data_str = localStorage.getItem('user_details');
      const user_data = JSON.parse(user_data_str);
      const refreshToken = user_data.data.refresh;

      try {
        const accessToken = await getNewAccessToken(refreshToken);
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        setData(response.data.detail);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [url, setData]);
};

// ProfileViewScreen Component
const ProfileViewScreen = () => {
  const history = useHistory();
  const [showFilter, setShowFilter] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useFetchData(apiEndpoint + '/api/get_artists/', setData);
  useFetchData(apiEndpoint + '/api/dropdowns_for_artist/', setFilterData);

  const fetchFavorites = async () => {
    const user_data_str = localStorage.getItem('user_details');
    const user_data = JSON.parse(user_data_str);
    const refreshToken = user_data.data.refresh;

    try {
      const accessToken = await getNewAccessToken(refreshToken);
      const response = await axios.get(apiEndpoint + '/api/get_related_wishlist/', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      setFavorites(response.data.detail);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleAgeRangeChange = (event, newValue) => {
    setSelectedOptions(prev => ({ ...prev, age: newValue }));
  };

  const handleSearchInputChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === '') {
      useFetchData(apiEndpoint + '/api/get_artists/', setData);
    } else {
      const filteredData = data.filter((user) =>
        user.artist_id.toString().toLowerCase().includes(query)
      );
      setData(filteredData);
    }
  };

  const handleApplyFilters = async () => {
    console.log("applying filters....", selectedOptions);
    try {
      const user_data_str = localStorage.getItem('user_details');
      const user_data = JSON.parse(user_data_str);
      const refreshToken = user_data.data.refresh;

      const accessToken = await getNewAccessToken(refreshToken);
      const response = await axios.post(apiEndpoint + '/api/filter_artists/', selectedOptions, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      console.log(response.data);
      setData(response.data.detail);
    } catch (error) {
      console.error('Error applying filters:', error);
    }
  };

  const handleWishlist = async (user) => {
    try {
      const user_data_str = localStorage.getItem('user_details');
      const user_data = JSON.parse(user_data_str);
      const refreshToken = user_data.data.refresh;
      const producer_id = user_data.data.data.id;
      const artist_id = user.id;

      const accessToken = await getNewAccessToken(refreshToken);
      await axios.post(apiEndpoint + '/api/add_to_wishlist/', { producer_id, artist_id }, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      fetchFavorites();
    } catch (error) {
      console.error('Error handling wishlist:', error);
    }
  };

  return (
    <Screen>
      <InputContainer>
        <Input
          placeholder="Search by Castmee ID"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <IconComponent />
      </InputContainer>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          width: '100%',
          maxHeight: 'calc(100vh - 180px)',
          overflowY: 'auto',
        }}
      >
        {data.map((user, index) => (
          <Card key={index} onClick={() => {
            setSelectedUser(user);
            setShowModal(true);
          }}>
            <ImageContainer imageUrl={apiEndpoint + user.headshot_image} />
            <Text>{user.user_name}</Text>
            <CaptionText>{user.current_city}</CaptionText>
            <Button onClick={(e) => {
              e.stopPropagation();
              handleWishlist(user);
            }}>
              {favorites.some((favorite) => favorite.artist_id === user.id)
                ? 'Remove from wishlist'
                : 'Add to wishlist'}
            </Button>
          </Card>
        ))}

        <FilterCard showFilter={showFilter}>
          <FilterTitle>Filter Options</FilterTitle>
          <AgeText>Age range</AgeText>
          <Slider
            value={selectedOptions.age || [0, 100]}
            onChange={handleAgeRangeChange}
            valueLabelDisplay="auto"
            min={0}
            max={100}
            marks={[
              { value: 0, label: '0' },
              { value: 25, label: '25' },
              { value: 50, label: '50' },
              { value: 100, label: '100' },
            ]}
            step={1}
            aria-labelledby="range-slider"
            style={{ width: '80%', marginLeft: '10%', color: '#f7c51c' }}
          />
          <FilterInput placeholder="Location" />
          {!showAdvancedFilters && (
            <FilterButton onClick={handleApplyFilters}>Apply Filters</FilterButton>
          )}
          <ShowAdvancedFiltersButton onClick={() => setShowAdvancedFilters(prev => !prev)}>
            {showAdvancedFilters ? 'Less' : 'More'}
          </ShowAdvancedFiltersButton>
          {showAdvancedFilters && (
            <AdvancedFilters
              filterData={filterData}
              activeFilter={activeFilter}
              handleApplyFilters={handleApplyFilters}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
          )}
        </FilterCard>

        <ShowFilterButton onClick={() => setShowFilter(prev => !prev)}>
          {showFilter ? 'Close' : 'Filters'}
        </ShowFilterButton>
      </div>

      {showModal && (
        <ModalComponent onClose={() => setShowModal(false)} user={selectedUser} />
      )}
    </Screen>
  );
};

export default ProfileViewScreen;
