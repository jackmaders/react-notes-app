import { Button } from "@chakra-ui/react";
import NotesAppModalCreate from "./NotesAppModalCreate";
import NotesAppModalEdit from "./NotesAppModalEdit";
import NotesAppModalRead from "./NotesAppModalRead";
import NotesAppNoteList from "./NotesAppNoteList";
import { Note } from "./note";
import { useState } from "react";

export default function NotesApp() {
  const [notes] = useState<Note[]>([
    {
      title: "title",
      content: "content",
      markdown: false,
      createdDate: new Date(),
    },
  ]);

  return (
    <>
      <div className="flex justify-end">
        <Button>New Note</Button>
      </div>
      <NotesAppNoteList notes={notes} />
      <NotesAppModalCreate />
      <NotesAppModalRead />
      <NotesAppModalEdit />
    </>
  );
}
