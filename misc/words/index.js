const { loadExamples } = require('./utils/dom');
const { createAudioFile } = require('./utils/http');
const { filesAvailable, openJSONFile, openRawFile, createFile } = require('../utils/fs');

const englishWords = openJSONFile('words/words.json');
// const spanishArray = openRawFile('words/spanish.txt'); 

const mergeFiles = () => {
    const files = filesAvailable('nouns');

    return openJSONFile(files[0])
    .concat(openJSONFile(files[1]))
    .concat(openJSONFile(files[2]))
    .concat(openJSONFile(files[3]))
    .concat(openJSONFile(files[4]));

}

const createAudioFiles = async () => {
    return await Promise.all(englishWords.map(async(word) => {
        return await createAudioFile(word.english, false);
    }));
}

const createWord = async (word, index, examples) => {
    return {
        english: word.english,
        englishPronunciation: `https://dqu1bnbv3o0a6.cloudfront.net/${word.english.trim()}.mp3`,
        example: examples[index] ? examples[index] : [],
        spanish: word.spanish
    }
}

const createLinks = () => {
    return englishWords.map((word) => `https://www.spanishdict.com/translate/${word.english}`);
}

const createArray = async () => {
    const links = createLinks();
    const examples = await loadExamples(links);

    return await Promise.all(englishWords.map(async(singleWord, index) => {
        return await createWord(singleWord, index, examples);
    }));
}

(async () => {
    // Audio file Creation.
    // await createAudioFiles();

    // Word Creation
    // createFile('nouns4.json', await createArray());

    createFile('nouns.json', await mergeFiles());

    
})();