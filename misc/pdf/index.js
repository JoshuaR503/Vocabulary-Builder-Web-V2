const { createFile } = require('../utils/fs');

const pdfreader = require("pdfreader");
const rimraf = require('rimraf');

const cellPadding = 40;
const columnQuantitizer = (item) => parseFloat(item.x) >= 20;
 
const padColumns = (array, nb) => Array
  .apply(null, {length: nb })
  .map((val, i) => array[i] || []);
 
const mergeCells = (cells) => (cells || [])
    .map((cell) => {
        return `${cell.text
            .replace(/-/g, " ")
            .replace(/[0-9]/g, '')
            .replace(/\./g, "")
            .replace(/\b[A-Z]{2,}\b/g, '')
            .replace(/\s\s+/g, ' ')
        }`;
    })
    .join("") // merge cells
    .substr(0, cellPadding)
    .padEnd(cellPadding, " ");

const renderMatrix = (matrix) => (matrix || [])
    .map((row, y) => padColumns(row, 2).map(mergeCells).join('\n-'))
    .join("\n-");


rimraf.sync('*.json');


const createContent = (content) => {
    const splitedContent = content
    .split('-')
    .map((item) => {
        const word = item.split(' ');
        const english = word[0];
        const spanish = word[1];

        if (english && spanish) {
            return {
                english: english,
                spanish: spanish
            }
        }
        
    });

    splitedContent.splice(0, 2);
    splitedContent.pop();
    splitedContent.pop();

    return splitedContent;
}

let table = new pdfreader.TableParser();

new pdfreader.PdfReader().parseFileItems('nouns.pdf', function (err, item) {

    if (!item || item.page) {

        const content = renderMatrix(table.getMatrix())
        const words = createContent(content);

        createFile(`words-${ new Date().getTime()+ Math.random()}.json`, words);        
        
        table = new pdfreader.TableParser();

    } else if (item.text) {
        table.processItem(item, columnQuantitizer(item));
    }
});

