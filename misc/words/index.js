const { loadExamples } = require('./utils/dom');
const { createAudioFile } = require('./utils/http');
const { filesAvailable, openJSONFile, openRawFile, createFile } = require('../utils/fs');

const englishWords = openRawFile('words/english.txt'); 
const spanishArray = openRawFile('words/spanish.txt'); 

const mergeFiles = () => {
    const files = filesAvailable('data');
    const bigArray = openJSONFile(files[0]).concat(openJSONFile(files[1]));

    return bigArray;
}

const createAudioFiles = async () => {
    return await Promise.all(englishWords.map(async(word) => {
        return await createAudioFile(word, false);
    }));
}

const createWord = async (word, index, examples) => {
    return {
        english: word,
        englishPronunciation: `https://dqu1bnbv3o0a6.cloudfront.net/${word}.mp3`,
        example: examples[index] ? examples[index] : [],
        spanish: spanishArray[index]
    }
}

const createLinks =  () => {
    return englishWords.map((word) => `https://www.spanishdict.com/translate/${word}`);
}

const createArray = async () => {
    const links = createLinks();
    const examples = await loadExamples(links);

    return await Promise.all(englishWords.map(async(singleWord, index) => {
        return await createWord(singleWord, index, examples);
    }));
}

(async () => {
    const content = await createArray();    
    createFile('nouns.json', content);
})();