const fileSystem = require('fs');
const animals = JSON.parse(fileSystem.readFileSync('openemoji.animal-mamal.json', 'utf8'));

const containsKeywordArray = (array, keyword) => {
    return array
    .split(', ')
    .includes(keyword);
}

const containsKeywordString = (string, keyword) => {
    return string.includes(keyword);
}

const removeKeyword = (items, keyword) => {
    return items.filter((item) => {

        const hasKeywordTwice  = 
            containsKeywordArray(item.tags, keyword) && 
            containsKeywordString(item.annotation, keyword);

        if (!hasKeywordTwice) {
            return item;
        }

        console.log('\n =============')
        console.log(item.tags);
        console.log(item.annotation);
        console.log(hasKeywordTwice);
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

const generateQuestions = (items) => {

    const questions = [];

    items.forEach((item) => {

        const shuffledItems = items
        .sort(() => 0.4 - Math.random())
        .slice(0,4);

        questions.push({
            question: item.code,
            correct_answer: item.name,
            incorrect_answers: [
                shuffledItems[1].name,
                shuffledItems[2].name,
                shuffledItems[3].name,
            ]
        });
    })

    return questions;
}

const cleanArray = removeKeyword(animals, 'face');
const cleanedArray = cleanItems(cleanArray);
const questions = generateQuestions(cleanedArray);

fileSystem.writeFile("questions.json", JSON.stringify(questions), (err, result) => {
    if (err) {
        console.log('There was an error:', err);
    } else {
        console.log('New words created');
    }
});
