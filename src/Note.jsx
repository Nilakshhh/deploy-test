import React, { useEffect } from "react";
import "./Note.css";

function Notes({ notes }) {
  useEffect(() => {
    const noteContainers = [];

    if (Array.isArray(notes)) {
      notes.forEach(note => {
        const targetElement = document.getElementById(note.div_id);
        if (targetElement && note.text.trim()) {
          const noteContainer = document.createElement("div");
          noteContainer.className = "note-container";
          noteContainer.innerHTML = `<p class="note-text"><span class="note-label">Note: </span>${note.text}</p>`;

          targetElement.parentNode.insertBefore(noteContainer, targetElement);
          noteContainers.push(noteContainer);
        }
      });
    }

    // Cleanup function
    return () => {
      noteContainers.forEach(noteContainer => {
        if (noteContainer.parentNode) {
          noteContainer.parentNode.removeChild(noteContainer);
        }
      });
    };
  }, [notes]);

  return null;
}

export default Notes;
