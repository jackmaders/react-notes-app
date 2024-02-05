import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
} from "@chakra-ui/react";
import { Note } from "./note";
import { marked } from "marked";
import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";

const purify = DOMPurify();

export default function NotesAppNotePreview({
  id,
  title,
  content,
  markdown,
  createdDate,
  deleteNote,
  updateNote,
  viewNote,
}: Note & {
  deleteNote: (id: string) => void;
  updateNote: (id: string) => void;
  viewNote: (id: string) => void;
}) {
  const [rawHTML, setRawHtml] = useState("");
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const cancelRef = React.useRef(null);

  useEffect(() => {
    const parseContent = async () => {
      if (!markdown) return setRawHtml(content);

      return setRawHtml(await marked.parse(content));
    };

    parseContent();
  }, [content, markdown]);

  return (
    <>
      <Card>
        <CardHeader className="flex justify-between">
          <h3 className="text-2xl uppercase font-semibold">{title}</h3>
          <div className="flex gap-4">
            <IconButton
              colorScheme="red"
              aria-label="Delete Note"
              onClick={() => {
                setDeleteAlertOpen(true);
              }}
              icon={<DeleteIcon />}
            />
            <IconButton
              colorScheme="blue"
              aria-label="Update Note"
              onClick={() => {
                updateNote(id);
              }}
              icon={<EditIcon />}
            />
            <IconButton
              colorScheme="green"
              aria-label="View Note"
              onClick={() => {
                viewNote(id);
              }}
              icon={<ViewIcon />}
            />
          </div>
        </CardHeader>
        <CardBody className={markdown ? "prose" : ""}>
          <div
            dangerouslySetInnerHTML={{ __html: purify.sanitize(rawHTML) }}
            className={`line-clamp-3 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0`}
          ></div>
        </CardBody>
        <CardFooter className="text-sm italic">
          {createdDate.toDateString()}
        </CardFooter>
      </Card>
      <AlertDialog
        isOpen={deleteAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => {
          setDeleteAlertOpen(false);
        }}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Note
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => {
                  setDeleteAlertOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  setDeleteAlertOpen(false);
                  deleteNote(id);
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
