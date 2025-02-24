import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import Note from "../components/Note";

function Home() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [error, setError] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      const response = await axiosInstance.get("/notes");
      setNotes(response.data);
    } catch (error) {
      setError("Failed to fetch notes");
      if (error.response?.status === 401) {
        localStorage.removeItem("user");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/notes", newNote);
      setNotes([response.data, ...notes]);
      setNewNote({ title: "", content: "" });
      setIsCreating(false);
      setError(null);
    } catch (error) {
      setError("Failed to create note");
    }
  };

  const handleUpdateNote = async (id, updatedNote) => {
    try {
      const response = await axiosInstance.put(`/notes/${id}`, updatedNote);
      setNotes(notes.map((note) => (note._id === id ? response.data : note)));
      setError(null);
    } catch (error) {
      setError("Failed to update note");
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await axiosInstance.delete(`/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
      setError(null);
    } catch (error) {
      setError("Failed to delete note");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-medium">Notes</h1>
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-gray-900"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 text-red-600 text-sm">{error}</div>
        )}

        {!isCreating ? (
          <button
            onClick={() => setIsCreating(true)}
            className="mb-8 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            New Note
          </button>
        ) : (
          <div className="mb-8 bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Create New Note</h2>
              <button
                onClick={() => setIsCreating(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleCreateNote} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                className="w-full p-2 border-b focus:border-blue-500 focus:outline-none text-lg"
                required
              />
              <textarea
                placeholder="Write your note..."
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                className="w-full p-2 border-b focus:border-blue-500 focus:outline-none min-h-[150px] text-gray-700"
                required
              />
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Save Note
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <Note
              key={note._id}
              note={note}
              onUpdate={handleUpdateNote}
              onDelete={handleDeleteNote}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;
