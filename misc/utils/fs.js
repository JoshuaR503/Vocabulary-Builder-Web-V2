const fileSystem = require('fs');

// This function is in charge of getting the name of all the files from 
// an specifc directory in the file syste.
const filesAvailable = (path) => {

    const files = [];

    fileSystem
    .readdirSync(path)
    .forEach(file => files
    .push(`${path}/${file}`));

    return files;
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

// This function is in charge of opening any file and then parse it as JSON. 
// The file must be JSON in order for this to work.
const openFile = (name) => {
    const rawContent = fileSystem.readFileSync(name, 'utf8');
    const jsonContent = JSON.parse(rawContent);
    return jsonContent;
}

module.exports = {
    filesAvailable,
    createFile,
    openFile,
}