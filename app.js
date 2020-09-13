const fileSystem = require('fs');
const items = JSON.parse(fileSystem.readFileSync('openemoji.animal-mamal.json', 'utf8'));

const removeKeyword = (items, keyword) => {
    return items.filter((item) => {
        const containsKeyword = item.tags
        .split(', ')
        .includes(keyword);

        if (!containsKeyword) {
            return item;
        }
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

        console.log(shuffledItems);

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

const cleanArray = removeKeyword(items, 'face');
const cleanedArray = cleanItems(cleanArray);
const questions = generateQuestions(cleanedArray);

fileSystem.writeFile("questions.json", JSON.stringify(questions), (err, result) => {
    if (err) {
        console.log('error', err);
    }
});
