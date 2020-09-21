const Nightmare = require('nightmare');
const cheerio = require('cheerio');

const axios = require('axios');
const dotenv = require('dotenv');
const fileSystem = require('fs');
const { clear } = require('console');

const englishWords = fileSystem.readFileSync('data/english.txt').toString().split(', ');
const spanishArray = fileSystem.readFileSync('data/spanish.txt').toString().split(', ');

const nightmare = Nightmare();

dotenv.config();

const request = async (word) => {

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

const processDOM = (body) => {
    const englishExamples = [];
    const spanishExamples = [];

    const $ = cheerio.load(body);

    $('._1f2Xuesa').each((_, element) => englishExamples.push($(element).text().trim()));
    $('._3WrcYAGx').each((_, element) => spanishExamples.push($(element).text().trim()));

    englishExamples.slice(0, 2);
    spanishExamples.slice(0, 2);

    const examples = [
        {
            english: englishExamples[0],
            spanish: spanishExamples[0]
        },
        {
            english: englishExamples[1],
            spanish: spanishExamples[1]
        }
    ];

    console.log(examples);

    return examples;
}

const findExample = async (url) => {
    return await nightmare
    .goto(url)
    .wait(2000)
    .evaluate(() => document.querySelector('body').innerHTML)
	.then((body) => processDOM(body));
}

const getExamples = (links) => {
    return links.reduce((accumulator, url) => {
        return accumulator.then((results) => {
          return findExample(url)
            .then((data) => {

                console.log(data);
                results.push(data);
                return results;
            });
        })
        .catch((err) => {
            throw err;
        });
    }, 
    
    Promise
    .resolve([]))
    .then((data) => data)
    .catch(() => console.log('There was an error'));
}

const createWord = async (word, index, examples) => {

    console.log(word);

    // const englishPronunciation = await request(word);

    // if (englishPronunciation === undefined) {

    //     console.log('Is undefined');
    //     return createWord(word, index);
    // }

    // const url = ;
    
    return {
        english: word,
        englishPronunciation: `https://dqu1bnbv3o0a6.cloudfront.net/${word}.mp3`,
        example: examples[index],
        spanish: spanishArray[index]
    }
}

const createLinks =  () => {
    const links = [];

    englishWords.forEach((word) => links.push(`https://www.spanishdict.com/translate/${word}`));

    return links;
}

const createArray = async () => {
    
    const links = createLinks();
    const examples = await getExamples(links);


    return await Promise.all(englishWords.map(async(singleWord, index) => {
        return await createWord(singleWord, index, examples);
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

   
    const words = await createArray();

    writeQuestionsFile(words);

    // const adjectives = JSON.parse(fileSystem.readFileSync('adjective.json', 'utf8'));

    // console.log(adjectives);
})();