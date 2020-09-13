const fileSystem = require('fs');
const bigArray = [];

// Utils
const openFile = (name) => {
    return JSON.parse(fileSystem.readFileSync(name, 'utf8'));
}

const containsKeywordArray = (array, keyword) => {
    return array
    .split(', ')
    .includes(keyword);
}

const containsKeywordString = (string, keyword) => {
    return string.includes(keyword);
}

// Heavy lifting
const removeKeyword = (items, keyword) => {
    return items.filter((item) => {

        const hasKeywordTwice  = 
            containsKeywordArray(item.tags, keyword) && 
            containsKeywordString(item.annotation, keyword);

        if (!hasKeywordTwice) {
            return item;
        }

        // console.log('\n =============')
        // console.log(item.tags);
        // console.log(item.annotation);
        // console.log(hasKeywordTwice);
    });
}

const cleanItems = (items) => {
    const cleanedItems = [];

    items.forEach((item) => {

        const emojiName =  item.annotation;
        const emojiDirectory = `/open_emoji/${item.hexcode}.svg`;

        cleanedItems.push({
            name: emojiName.charAt(0).toUpperCase() + emojiName.slice(1),
            code: emojiDirectory
        });
    });

    return cleanedItems;
}

// Init
const generateQuestions = (items) => {
    items.forEach((item) => {

        const uniqueItems = items
        .sort(() => 0.6 - Math.random())
        .slice(0,6)
        .filter((v) => v.name !== item.name);
        
        if (uniqueItems.length > 4) {
            bigArray.push({
                question: item.code,
                correct_answer: item.name,
                incorrect_answers: [
                    uniqueItems[1].name,
                    uniqueItems[2].name,
                    uniqueItems[3].name,
                ]
            });
        } else {
            console.log('skiped nonoptimel item');
        }        
    });
}

const createQuestions = (files) => {
    files.forEach((file) => {

        const array = openFile(file);
        const cleanArray = removeKeyword(array, 'face');
        const cleanedArray = cleanItems(cleanArray);

        generateQuestions(cleanedArray)
    });
}

const writeQuestionsFile = (content) => {
    fileSystem.writeFile("questions.json", JSON.stringify(content), (err, result) => {
        if (err) {
            console.log('There was an error:', err);
        } else {
            console.log('New words created');
        }
    });
}

/// Program starts here.
(() => {
    const root = 'open_emoji_json';
    const files = [
        `${root}/animal-bird.json`,
        `${root}/animal-mamal.json`,
        `${root}/animal-reptile.json`,
        `${root}/animal-marine.json`,
    ];

    createQuestions(files);
    writeQuestionsFile(bigArray);
})();
