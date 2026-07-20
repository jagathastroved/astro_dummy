import axios from 'axios';

export const fetchCountries = async () => {
    try {
        const response = await axios.get('https://www.astroved.com/new/json/Countries.json');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch countries');
    }
};

export const searchLocation = async (query: string) => {
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to search location');
    }
};

export const reverseGeocode = async (lat: number, lng: number) => {
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to reverse geocode');
    }
};
