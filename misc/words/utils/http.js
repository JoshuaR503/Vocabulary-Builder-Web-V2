const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const createAudioFile = async (word, alreadyTried) => {

    const data = {word: word}; 
    const url = process.env.AWS_API_URL;

    const kAudioUrlHeaders = {
        'Content-Type': 'application/json',
        'x-api-key': process.env.AWS_KEY,
    }

    const response = await axios.post(url, data, {headers: kAudioUrlHeaders});
    const responseData = response.data.response;

    if (alreadyTried && responseData === undefined) {
        console.log('There was an error, trying again.');
        createAudioFile(word, true);
    }

    console.log(responseData);

    return responseData;
}

module.exports = {
    createAudioFile
}