import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import { Note } from "./note";
import { useEffect, useState } from "react";
import { marked } from "marked";

export default function NotesAppModalUpdate({
  title,
  content,
  markdown,
  createdDate,
  onClose,
}: Note & {
  onClose: () => void;
}) {
  const [rawHTML, setRawHtml] = useState("");

  useEffect(() => {
    const parseContent = async () => {
      if (!markdown) return setRawHtml(content);

      return setRawHtml(await marked.parse(content));
    };

    parseContent();
  }, [content, markdown]);

  return (
    <>
      <Modal isOpen={!!title} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="prose">
          <ModalHeader>
            <h1>{title}</h1>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody dangerouslySetInnerHTML={{ __html: rawHTML }}></ModalBody>
          <ModalFooter>{createdDate.toDateString()}</ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
