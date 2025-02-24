import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from '../controller/noteController.js';

const noteRouter = express.Router();

noteRouter.use(protect);

noteRouter.route('/')
  .get(getNotes)
  .post(createNote);

noteRouter.route('/:id')
  .get(getNoteById)
  .put(updateNote)
  .delete(deleteNote);

export default noteRouter; 