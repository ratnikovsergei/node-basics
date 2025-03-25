const fs = require('fs/promises'); // file system
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');

async function addNote(title) {
  // const notes = require('./db.json');
  // const notes = Buffer.from(buffer).toString('utf-8');
  // const notes = await fs.readFile(notesPath, { encoding: 'utf-8' });
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  /* fs.writeFile(__filepath, JSON.stringify(данные_для_записи)) -- запись в файл */
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreen('Note was added!'));
}

async function removeNote(id) {
  const notes = await getNotes();
  const filteredNotes = notes.filter((note) => note.id !== id);

  if (filteredNotes.length === notes.length) {
    console.log(chalk.red(`Note with id ${id} was not found!`));
    return;
  }

  await fs.writeFile(notesPath, JSON.stringify(filteredNotes));
  console.log(chalk.bgRed(`Note with id ${id} was successfully removed from list!`));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: 'utf-8' });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();

  console.log(chalk.bgBlue('Here is the list of notes:'));
  notes.forEach((note) => {
    console.log(chalk.blue(note.id, note.title));
  });
}

module.exports = {
  addNote,
  printNotes,
  removeNote,
};
