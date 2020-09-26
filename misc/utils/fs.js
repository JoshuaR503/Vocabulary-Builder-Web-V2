const fileSystem = require('fs');

// This function is in charge of getting the name of all the files from 
// an specifc directory in the file syste.
const filesAvailable = (path) => {
    return fileSystem
    .readdirSync(path)
    .map((file) => `${path}/${file}`)
}

// This function is in charge of creating a new JSON file into the file system.
const createFile = (path, content) => {
    fileSystem.writeFile(path, JSON.stringify(content), (err) => {
        if (err) {
            console.log('There was an error:', err);
        } else {
            console.log('File created successfuly.', path);
        }
    });
}

// This function is in charge of opening a JSON file and then parse. 
// The file must be JSON in order for this to work.
const openJSONFile = (name) => {
    const rawContent = fileSystem.readFileSync(name, 'utf8');
    const jsonContent = JSON.parse(rawContent);
    return jsonContent;
}

// This function is in charge of opening any file and then create an array.
const openRawFile = (fileName) => {
    return fileSystem
    .readFileSync(fileName)
    .toString()
    .split(', ');
}

module.exports = {
    filesAvailable,
    createFile,
    openJSONFile,
    openRawFile,
}