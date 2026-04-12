const express = require("express");
const validateToken = require("../middleware/validateToken");
const { addNote, getNote, deleteNote, updateNote, getAllNotes } = require("../controller/notesController");
const router = express.Router();


router.use(validateToken);
router.post("/addNote", validateToken, addNote);
router.get("/getNote", getNote);
router.delete("/deleteNote", deleteNote);
router.put("/updateNote", updateNote);
router.get("/getAllNotes",getAllNotes);


module.exports = router;