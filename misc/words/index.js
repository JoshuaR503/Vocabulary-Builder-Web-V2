const { loadExamples } = require('./utils/dom');
const { createAudioFile } = require('./utils/http');
const { filesAvailable, openJSONFile, openRawFile, createFile } = require('../utils/fs');

const englishWords = openRawFile('words/english.txt'); 
const spanishArray = openRawFile('words/spanish.txt'); 

const mergeFiles = () => {
    const files = filesAvailable('nouns');

    return openJSONFile(files[0])
    .concat(openJSONFile(files[1]))
    .concat(openJSONFile(files[2]));
}

const createAudioFiles = async () => {
    return await Promise.all(englishWords.map(async(word) => {

        return await createAudioFile(word, false);
    }));
}

const createWord = async (word, index, examples) => {
    return {
        english: word,
        englishPronunciation: `https://dqu1bnbv3o0a6.cloudfront.net/${word.trim()}.mp3`,
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

const init = async () => {
    const words = await createAudioFiles();
    const didWord = words.length == englishWords.length;

    if (didWord) {
        createFile('nouns2.json', await createArray());
    } else {
        console.log('Assistance required.');
    }    
}

(async () => {
    createFile('nouns.json', await mergeFiles());

    
})();