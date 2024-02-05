import NotesAppNoteCard from "./NotesAppNoteCard";
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {notes.length > 0
          ? notes.map((note, index) => (
              <NotesAppNoteCard
                key={index}
                {...note}
                deleteNote={deleteNote}
                updateNote={updateNote}
                viewNote={viewNote}
              />
            ))
          : "No notes..."}
      </div>
    </>
  );
}
