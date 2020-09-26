const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const createAudioFile = async (word) => {

    const data = {word: word}; 
    const url = process.env.AWS_API_URL;

    const kAudioUrlHeaders = {
        'Content-Type': 'application/json',
        'x-api-key': process.env.AWS_KEY,
    }

    const response = await axios.post(url, data, {headers: kAudioUrlHeaders});
    const responseData = response.data.response;

    return responseData;
}

module.exports = {
    createAudioFile
}