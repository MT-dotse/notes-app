// Import modules from node package manager
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { listNotes, addNote, removeNote, readNote } from './notes.js';

// call yargs() to get an instance of yargs at which point the API is identical
const y = yargs(hideBin(process.argv));

// Customize yargs version
y.version('1.1.0');

//Add command
y.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true, //requiring a title
            type: 'string', //specifying the type
        },
        body: { describe: 'Note body', demandOption: true, type: 'string' },
    },
    handler(argv) {
        addNote(argv.title, argv.body);
    },
});

//Remove command
y.command({
    command: 'remove',
    describe: 'Removing the note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
    }, // by passing the argv we get access to the argument in our handler
    handler(argv) {
        removeNote(argv.title);
    },
});

//List command
y.command({
    command: 'list',
    describe: 'Listing your notes',
    handler() {
        listNotes();
    },
});

//Read command
y.command({
    command: 'read',
    describe: 'Read the notes',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        readNote(argv.title);
    },
});

y.parse();
