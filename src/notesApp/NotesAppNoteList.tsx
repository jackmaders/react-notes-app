import NotesAppNotePreview from "./NotesAppNotePreview";
import { Note } from "./note";

export default function NotesAppNoteList({ notes }: { notes: Note[] }) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {notes.map((note, index) => (
          <NotesAppNotePreview key={index} {...note} />
        ))}
      </div>
    </>
  );
}
