import { Note } from "./note";

const LOCAL_STORAGE_KEY_NAME = "notes";

export async function getLocalNotes() {
  const localNotesString = await localStorage.getItem(LOCAL_STORAGE_KEY_NAME);

  if (!localNotesString) return [];

  const { notes } = JSON.parse(localNotesString);

  const parsedNotes: Note[] = notes.map((note: Note) => ({
    ...note,
    createdDate: new Date(note.createdDate),
  }));

  return parsedNotes;
}

export async function setLocalNotes(notes: Note[]) {
  const newNotesString = JSON.stringify({ notes });

  await localStorage.setItem(LOCAL_STORAGE_KEY_NAME, newNotesString);
}
