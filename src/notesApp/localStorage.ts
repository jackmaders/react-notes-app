import { Note } from "./note";

const LOCAL_STORAGE_KEY_NAME = "notes";

export function getLocalNotes() {
  const localNotesString = localStorage.getItem(LOCAL_STORAGE_KEY_NAME);

  if (!localNotesString) return [];

  const { notes } = JSON.parse(localNotesString);

  const parsedNotes: Note[] = notes.map((note: Note) => ({
    ...note,
    createdDate: new Date(note.createdDate),
  }));

  return parsedNotes;
}

export function setLocalNotes(notes: Note[]) {
  const newNotesString = JSON.stringify({ notes });

  localStorage.setItem(LOCAL_STORAGE_KEY_NAME, newNotesString);
}
