const { filesAvailable, openFile, createFile } = require('../utils/fs');
const { removeKeyword } = require('../utils/filter');

const bigArray = [];

// This function is in charge of creating the an array of objects.
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
            console.log('Skiped nonoptimel item');
        }        
    });
}

// This function is in charge of formating the given data.
const formatArray = (items) => {
    const cleanedItems = [];

    items.forEach((item) => {

        const name =  item.annotation;
        const path = `/images/${item.hexcode}.svg`;

        cleanedItems.push({
            name: name.charAt(0).toUpperCase() + name.slice(1),
            code: path
        });
    });

    return cleanedItems;
}

const createQuestions = (files) => {
    files.forEach((file) => {
        const content = openFile(file);
        const formatedContent = removeKeyword(content, 'face');
        const cleanedContent = formatArray(formatedContent);

        generateQuestions(cleanedContent)
    });
}

/// Program starts here.
(() => {
    createQuestions(filesAvailable('data'));
    createFile('words.json', bigArray);
})();