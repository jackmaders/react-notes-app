import NotesAppNotePreview from "./NotesAppNotePreview";
import { Note } from "./note";

export default function NotesAppNoteList({
  notes,
  deleteNote,
  updateNote,
  viewNote,
}: {
  notes: Note[];
  deleteNote: (id: string) => void;
  updateNote: (id: string) => void;
  viewNote: (id: string) => void;
}) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {notes.map((note, index) => (
          <NotesAppNotePreview
            key={index}
            {...note}
            deleteNote={deleteNote}
            updateNote={updateNote}
            viewNote={viewNote}
          />
        ))}
      </div>
    </>
  );
}
