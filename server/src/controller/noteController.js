import Note from '../models/noteModel.js';

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user._id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notes' });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, userId: req.user._id });
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching note' });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'Please provide title and content' });
    }

    const note = await Note.create({
      userId: req.user._id,
      title,
      content,
    });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error creating note' });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.findOne({ _id: req.params.id, userId: req.user._id });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    note.title = title || note.title;
    note.content = content || note.content;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: 'Error updating note' });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, userId: req.user._id });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    await note.deleteOne();
    res.json({ message: 'Note removed' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting note' });
  }
}; 