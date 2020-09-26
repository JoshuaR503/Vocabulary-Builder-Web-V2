const Nightmare = require('nightmare');
const cheerio = require('cheerio');
const nightmare = Nightmare();

const processExample = (body) => {
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

const loadExample = async (url) => {
    return await nightmare
    .goto(url)
    .wait(2000)
    .evaluate(() => document.querySelector('body').innerHTML)
	.then((body) => processExample(body));
}

const loadExamples = (links) => {
    return links.reduce((accumulator, url) => {
        return accumulator.then((results) => {
          return loadExample(url)
            .then((data) => {
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

module.exports = {
    loadExamples
}