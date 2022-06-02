const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Notes = mongoose.model("Notes", NoteSchema);

module.exports = Notes;
