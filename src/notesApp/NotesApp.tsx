import { Button } from "@chakra-ui/react";
import NotesAppModalCreate from "./NotesAppModalCreate";
import NotesAppModalUpdate from "./NotesAppModalUpdate";
import NotesAppNoteList from "./NotesAppNoteList";
import { Note } from "./note";
import { useEffect, useState } from "react";
import { getLocalNotes, setLocalNotes } from "./localStorage";

export default function NotesApp() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [stagedNote, setStagedNote] = useState<Note | null>(null);
  const [initialLoad, setInitialLoad] = useState(true);

  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    getLocalNotes().then(setNotes);

    setInitialLoad(true);
  }, []);

  useEffect(() => {
    if (initialLoad) return;

    setLocalNotes(notes);
  }, [notes, initialLoad]);

  async function createLocalNote(note: Note) {
    setNotes((notes) => {
      return [...notes, note];
    });
  }

  async function deleteLocalNote(id: string) {
    setNotes((notes) => {
      return notes.filter((note) => note.id !== id);
    });
  }

  async function updateLocalNote(newNote: Note) {
    setNotes((notes) => {
      return notes.map((note) => (note.id === newNote.id ? newNote : note));
    });
  }

  async function updateNote(id: string) {
    const noteToUpdate = notes.find((note) => note.id === id);
    if (!noteToUpdate) return;

    setStagedNote(noteToUpdate);
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
      <NotesAppNoteList
        notes={notes}
        deleteNote={deleteLocalNote}
        updateNote={updateNote}
      />
      <NotesAppModalCreate
        isOpen={createModalOpen}
        onClose={() => {
          setCreateModalOpen(false);
        }}
        createNote={createLocalNote}
      />
      {stagedNote && (
        <NotesAppModalUpdate
          {...stagedNote}
          updateNote={updateLocalNote}
          onClose={() => setStagedNote(null)}
        />
      )}
    </>
  );
}
