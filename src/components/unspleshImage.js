import axios from "axios";

const UNSPLASH_ACCESS_KEY = "ArGjKVarPVTu-lLoXbEXBY6Ww07I0mEuKyrkqWFduEI";
const BASE_URL = "https://api.unsplash.com";

const unspleshKey = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
    },
});

export const serchPhoto = async (query, page = 1, per_page = 12, orientation = "landscape") => {
    try {
        const response = await unspleshKey.get("/search/photos", {
            params: { query, page, per_page, orientation },
        });
        console.log('Request URL:', response.config.url);
        console.log('Request Headers:', response.config.headers);
        return response.data.results;
    } catch (error) {
        console.error("ERROR FETCH PHOTO", error);
        throw error;
    }
};
