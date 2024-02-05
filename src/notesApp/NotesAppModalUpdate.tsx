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

import { useEffect, useState } from "react";
import { Note } from "./note";

export default function NotesAppModalUpdate({
  id,
  title: initialTitle,
  content: initialContent,
  markdown: initialMarkdown,
  createdDate,
  onClose,
  updateNote,
}: Note & {
  onClose: () => void;
  updateNote: (note: Note) => void;
}) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [markdown, setMarkdown] = useState(initialMarkdown);
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
      id,
      title,
      content,
      markdown,
      createdDate,
    };

    updateNote(note);

    onClose();
  }

  return (
    <>
      <Modal isOpen={!!title} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={onSubmit}>
          <ModalContent>
            <ModalHeader>Update an existing note</ModalHeader>
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
                  isChecked={markdown}
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
                Update
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
