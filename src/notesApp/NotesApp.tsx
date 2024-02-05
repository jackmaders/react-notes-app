import { Button } from "@chakra-ui/react";
import NotesAppModalCreate from "./NotesAppModalCreate";
import NotesAppModalEdit from "./NotesAppModalEdit";
import NotesAppModalRead from "./NotesAppModalRead";
import NotesAppNoteList from "./NotesAppNoteList";
import { Note } from "./note";
import { useState } from "react";

const LOCAL_STORAGE_KEY_NAME = "notes";

export default function NotesApp() {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [notes, setNotes] = useState<Note[]>(() => {
    const localNotesString = localStorage.getItem(LOCAL_STORAGE_KEY_NAME);

    if (!localNotesString) return [];

    const { notes } = JSON.parse(localNotesString);

    const parsedNotes = notes.map((note: Note) => ({
      ...note,
      createdDate: new Date(note.createdDate),
    }));

    return parsedNotes;
  });

  function createNote(newNote: Note) {
    const localNoteString = localStorage.getItem(LOCAL_STORAGE_KEY_NAME);

    const notes: Note[] = [newNote];

    if (localNoteString) {
      const localNoteObject = JSON.parse(localNoteString);

      const localNotes: Note[] = localNoteObject.notes;

      notes.push(...localNotes);
    }

    const newNotesString = JSON.stringify({ notes });

    localStorage.setItem(LOCAL_STORAGE_KEY_NAME, newNotesString);
    const parsedNotes = notes.map((note) => ({
      ...note,
      createdDate: new Date(note.createdDate),
    }));

    setNotes(parsedNotes);
  }

  return (
    <>
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setCreateModalOpen(true);
          }}
        >
          New Note
        </Button>
      </div>
      <NotesAppNoteList notes={notes} />
      <NotesAppModalCreate
        isOpen={createModalOpen}
        onClose={() => {
          setCreateModalOpen(false);
        }}
        createNote={createNote}
      />
      <NotesAppModalRead />
      <NotesAppModalEdit />
    </>
  );
}
