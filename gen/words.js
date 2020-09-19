const axios = require('axios');
const dotenv = require('dotenv');
const fileSystem = require('fs');

const englishWords = fileSystem.readFileSync('data/english.txt').toString().split(', ');
const spanishArray = fileSystem.readFileSync('data/spanish.txt').toString().split(', ');

const request = async (word) => {

    dotenv.config();

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

const createWord = async (word, index) => {

    const englishPronunciation = await request(word);

    if (englishPronunciation === undefined) {
        return createWord(word, index);
    }

    const url = `https://dqu1bnbv3o0a6.cloudfront.net/${word}.mp3`;
    
    return {
        english: word,
        englishPronunciation: url,
        spanish: spanishArray[index]
    }
}

const createArray = async () => {
    return await Promise.all(englishWords.map(async(singleWord, index) => {
        return await createWord(singleWord, index);
    }));
}

const writeQuestionsFile = (content) => {
    fileSystem.writeFile("adjective.json", JSON.stringify(content), (err) => {
        if (err) {
            console.log('There was an error:', err);
        } else {
            console.log('New words created');
        }
    });
}


(async () => {

    // const words = await createArray();

    // writeQuestionsFile(words);

    const adjectives = JSON.parse(fileSystem.readFileSync('adjective.json', 'utf8'));

    console.log(adjectives);
})();