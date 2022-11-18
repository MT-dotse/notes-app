import fs from 'fs';
import chalk from 'chalk';

const addNote = (title, body) => {
    //load in the existing notes so we don't override it when we push new data
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body,
        });

        saveNotes(notes);
        console.log(chalk.green.inverse('New note added!'));
    } else {
        console.log(chalk.red.inverse('Note title taken!'));
    }
};

const saveNotes = (notes) => {
    //converting the dataJSON to string
    const dataJSON = JSON.stringify(notes);
    // write in the notes.json file and adding the dataJSON
    fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
};

const removeNote = (title) => {
    const notes = loadNotes();
    // filter is called one time for each note in the notes array
    // the title that is passed and matched is the one that I don't want to keep
    const notesToKeep = notes.filter((note) => note.title !== title);

    //comparing the length of the notes and notesToKeep array
    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'));
        saveNotes(notesToKeep);
    } else {
        console.log(chalk.red.inverse('No note found!'));
    }
};

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.inverse.yellow('Your notes'));
    notes.forEach((note) => {
        console.log(note.title);
    });
};

const readNote = (title) => {
    const notes = loadNotes();
    const foundNote = notes.find((note) => note.title === title);
    if (foundNote) {
        console.log(chalk.inverse.green(foundNote.title));
        console.log(foundNote.body);
    } else {
        console.log(chalk.red.inverse('Note not found!'));
    }
};

export { listNotes, addNote, removeNote, readNote };
