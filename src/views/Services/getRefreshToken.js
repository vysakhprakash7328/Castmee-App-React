import axios from 'axios';
import apiEndpoint from './ApiConfig';

const getNewAccessToken = async (refreshToken) => {
    try {
        const response = await axios.post(
            apiEndpoint + '/api/token/refresh/',
            { refresh: refreshToken }
        );


        const newAccessToken = response.data.access;
        return newAccessToken;
    } catch (error) {
        console.error('Error fetching new access token:', error);
        throw error;
    }
};

export default getNewAccessToken;
