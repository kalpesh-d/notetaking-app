import { useState } from "react";

function Note({ note, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({
    title: note.title,
    content: note.content,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(note._id, editedNote);
    setIsEditing(false);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  if (isEditing) {
    return (
      <div className="p-4 border rounded-lg bg-white shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={editedNote.title}
            onChange={(e) => setEditedNote({ ...editedNote, title: e.target.value })}
            className="w-full p-2 border-b focus:border-blue-500 focus:outline-none"
            required
          />
          <textarea
            value={editedNote.content}
            onChange={(e) => setEditedNote({ ...editedNote, content: e.target.value })}
            className="w-full p-2 border-b focus:border-blue-500 focus:outline-none min-h-[100px]"
            required
          />
          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-1.5 text-gray-600 text-sm hover:text-gray-900"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium">{note.title}</h3>
        <div className="text-xs text-gray-500">{formatDate(note.createdAt)}</div>
      </div>
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{note.content}</p>
      <div className="flex gap-3 text-sm">
        <button
          onClick={() => setIsEditing(true)}
          className="text-blue-600 hover:text-blue-800"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note._id)}
          className="text-red-600 hover:text-red-800"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Note; 