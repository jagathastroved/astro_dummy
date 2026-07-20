import axios from 'axios';

export const fetchCitySuggestions = async (country: string, city: string) => {
    try {
        const response = await axios.get(`https://webservice.astroved.com/Api/Panchang/PopulateCityBycountry/${encodeURIComponent(country)}/${encodeURIComponent(city)}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch city suggestions');
    }
};

export const fetchPanchangData = async (timezone: string, lat: number, lng: number, localISOTime: string) => {
    try {
        const encodedTz = btoa(timezone).replace(/=/g, '');
        const url = `https://api.astroved.com/node/newpanchangam/${encodedTz}/${lat}/${lng}/${localISOTime}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch panchang data');
    }
};

export const fetchTodayContent = async (timezone: string, lat: number, lng: number, localISOTime: string) => {
    try {
        const encodedTz = btoa(timezone).replace(/=/g, '');
        const url = `https://api.astroved.com/node/todaycontent/${encodedTz}/${lat}/${lng}/${localISOTime}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch today content');
    }
};

export const fetchSpecialEvents = async (currency: string) => {
    try {
        const response = await axios.get(`https://phplexus.astroved.com/wp-json/api/v1/new-home-slider/${currency}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch special events');
    }
};

