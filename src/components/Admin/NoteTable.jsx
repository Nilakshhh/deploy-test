import { useEffect, useState } from "react";
import axios from "axios";

const NotesTable = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []); // Run only once on component mount

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${apiUrl}/admins/note`);
      setNotes(response.data);
    } catch (error) {
      console.error("There was an error fetching the notes!", error);
    }
  };

  const handleEdit = (id) => {
    const noteToEdit = notes.find((note) => note._id === id);
    setCurrentNote(noteToEdit);
    setEditedText(noteToEdit.text);
    setShowModal(true);
  };

  const closeModal = () => {
    setCurrentNote(null);
    setShowModal(false);
  };

  const updateNote = async (event) => {
    event.preventDefault(); // Prevent form submission
    try {
      const response = await axios.put(`${apiUrl}/admins/note`, {
        _id: currentNote._id,
        div_id: currentNote.div_id,
        text: editedText,
      });

      console.log("Note updated successfully:", response.data);
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === currentNote._id ? response.data : note
        )
      );
      closeModal(); // Close modal after successful update
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleTextChange = (event) => {
    setEditedText(event.target.value);
  };

  return (
    <div className="notes-container">
      <table className="notes-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Section</th>
            <th>Note Text</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr key={note._id}>
              <td className="border px-4 py-2" data-label="ID">
                {note._id}
              </td>
              <td className="border px-4 py-2" data-label="Div ID">
                {note.div_id}
              </td>
              <td className="border px-4 py-2" data-label="Text">
                {note.text}
              </td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleEdit(note._id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && currentNote && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Edit Note</h3>
              <button className="modal-close" onClick={closeModal}>
                X
              </button>
            </div>
            <form onSubmit={updateNote}>
              <div className="modal-body">
                <div className="input-group">
                  <label>Section</label>
                  <p>{currentNote.div_id}</p>
                </div>
                <div className="input-group">
                  <label>Text</label>
                  <textarea
                    name="text"
                    value={editedText}
                    onChange={handleTextChange}
                    rows="4"
                    cols="50"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-save">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesTable;
