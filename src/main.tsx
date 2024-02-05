import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import NotesApp from "./notesApp/NotesApp";
import "./tailwind.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider>
    <React.StrictMode>
      <main className=" container space-y-8 pt-8">
        <h1 className="text-2xl font-semibold">Notes App</h1>
        <NotesApp />
      </main>
    </React.StrictMode>
  </ChakraProvider>
);
