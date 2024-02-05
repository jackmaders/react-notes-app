import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Textarea,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

import { useEffect, useState } from "react";
import { Note } from "./note";

type NotesAppModalCreate = {
  isOpen: boolean;
  onClose: () => void;
  createNote: (note: Note) => void;
};

export default function NotesAppModalCreate({
  isOpen,
  onClose,
  createNote,
}: NotesAppModalCreate) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [markdown, setMarkdown] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  useEffect(() => {
    setTitleError("");
  }, [title]);

  useEffect(() => {
    setContentError("");
  }, [content]);

  function onSubmit(event: React.FormEvent): void {
    event.preventDefault();

    // title validation
    let newTitleError = "";
    if (!title) newTitleError = "Note title is required";
    setTitleError(newTitleError);

    // content validation
    let newContentError = "";
    if (!content) newContentError = "Note content is required";
    setContentError(newContentError);

    if (newTitleError !== "" || newContentError !== "") return;

    const note: Note = {
      id: uuidv4(),
      title,
      content,
      markdown,
      createdDate: new Date(),
    };

    createNote(note);

    setTitle("");
    setContent("");
    setMarkdown(false);

    onClose();
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={onSubmit}>
          <ModalContent>
            <ModalHeader>Create a new note</ModalHeader>
            <ModalCloseButton />
            <ModalBody className="flex flex-col gap-4">
              <FormControl as="fieldset" isInvalid={titleError !== ""}>
                <FormLabel>Title *</FormLabel>
                <Input
                  type="text"
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                />
                <FormErrorMessage>{titleError}</FormErrorMessage>
              </FormControl>
              <FormControl as="fieldset" isInvalid={contentError !== ""}>
                <FormLabel>Content *</FormLabel>
                <Textarea
                  value={content}
                  onChange={(event) => {
                    setContent(event.target.value);
                  }}
                />
                <FormErrorMessage>{contentError}</FormErrorMessage>
              </FormControl>
              <FormControl as="fieldset">
                <FormLabel>Markdown</FormLabel>
                <Switch
                  checked={markdown}
                  onChange={(event) => {
                    setMarkdown(event.target.checked);
                  }}
                />
                <FormErrorMessage>{contentError}</FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" type="submit">
                Create
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
