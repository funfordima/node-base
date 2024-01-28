import path from 'node:path';
import { readFile, writeFile } from 'node:fs';

import { getPath, checkFileExists } from '../utils/index.js';

const FILE_NAME = 'notes.json';
const sourcePath = path.resolve(getPath(import.meta.url), FILE_NAME);
const isSourceFileExists = await checkFileExists(sourcePath);

const errorCallback = (err) => {
  if (err) {
    return console.error(err.message);
  }
};

if (!isSourceFileExists) {
  writeFile(sourcePath, JSON.stringify([]), errorCallback);
}

const create = (title, content) => {
  readFile(sourcePath, (err, data) => {
    errorCallback(err);

    const notes = JSON.parse(data);
    notes.push({ title, content });
    const json = JSON.stringify(notes);

    writeFile(sourcePath, json, (err) => {
      errorCallback(err);
  
      console.log('Note has been created successfully!');
    });
  });
};

const list = () => {
  readFile(sourcePath, (err, data) => {
    errorCallback(err);

    const notes = JSON.parse(data);
    notes.forEach((note, index) => console.log(`${index + 1} ${note.title}`));

    if (!notes.length) {
      console.log('Note list is empty.');
    }
  });
};

const view = (title) => {
  readFile(sourcePath, (err, data) => {
    errorCallback(err);

    const notes = JSON.parse(data);
    const note = notes.find((note) => note.title === title);

    if (!note) {
      console.error('Note not found.');
    }

    console.log(note.content);
  });
};

const remove = (title) => {
  readFile(sourcePath, (err, data) => {
    errorCallback(err);

    const notes = JSON.parse(data).filter((note) => note.title !== title);
    const json = JSON.stringify(notes);

    writeFile(sourcePath, json, (err) => {
      errorCallback(err);

      console.log('Note has been successfully deleted.');
    });
  });
};

const notesApp = async () => {
  const [command, title, content] = process.argv.slice(2);
  switch(command) {
    case 'list': {
      list();
      break;
    }
    case 'view': {
      view(title);
      break;
    }
    case 'create': {
      create(title, content);
      break;
    }
    case 'remove': {
      remove(title);
      break;
    }
    default: {
      console.error('Unknown command!');
    }
  }
};

await notesApp();
