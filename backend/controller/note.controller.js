import { Notes } from "../models/notes.model.js";
import { User } from "../models/user.model.js";

const addNote = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res
        .status(400)
        .json({ success: false, message: "Content Required" });
    }

    const noteDetail = await Notes.create({
      content,
      user: req.user._id,
    });
    // console.log("noteDetail :", noteDetail);

    return res
      .status(200)
      .json({ success: true, message: "Note created", noteDetail });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user._id }).populate(
      "user",
      "fullName email "
    );
    // console.log(notes);

    if (!notes) {
      return res.status(404).json({ message: "Note record is empty!" });
    }

    return res.status(200).json({
      success: true,
      message: "Notes fetched successfully!",
      notes,
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Notes.findOneAndDelete({ _id: id, user: req.user._id });
    // console.log(note);
    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found!" });
    }

    res
      .status(200)
      .json({ success: true, message: "Note deleted successfully!" });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export { addNote, getNotes, deleteNote };
