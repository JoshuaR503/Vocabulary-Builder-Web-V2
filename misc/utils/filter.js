// This function is in charge of converting an array into a string 
// and see if it inclues a certain keyword.
const containsKeywordArray = (array, keyword) => {
    return array
    .split(', ')
    .includes(keyword);
};

// This function is in charge of looking a string to see if 
// the string includes a certain keyword.
const containsKeywordString = (string, keyword) => {
    return string.includes(keyword);
};

// This function is in charge of removing a keyword from an array of strings.
const removeKeyword = (items, keyword) => {
    return items.filter((item) => {

        const hasKeywordTwice  = 
            containsKeywordArray(item.tags, keyword) && 
            containsKeywordString(item.annotation, keyword);

        if (!hasKeywordTwice) {
            return item;
        }
    });
};

module.exports = {
    containsKeywordArray,
    containsKeywordString,
    removeKeyword,
}
