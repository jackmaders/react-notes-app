import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/react";
import { Note } from "./note";
import { marked } from "marked";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

const purify = DOMPurify();

export default function NotesAppNotePreview({
  title,
  content,
  markdown,
  createdDate,
}: Note) {
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
      <Card>
        <CardHeader className="text-2xl uppercase font-semibold">
          {title}
        </CardHeader>
        <CardBody
          dangerouslySetInnerHTML={{ __html: purify.sanitize(rawHTML) }}
          className="line-clamp-3"
        ></CardBody>
        <CardFooter className="text-sm italic">
          {createdDate.toDateString()}
        </CardFooter>
      </Card>
    </>
  );
}
