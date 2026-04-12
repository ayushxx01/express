const Note = require("../models/noteSchema");
const asyncHandler = require("express-async-handler");



const addNote = asyncHandler(async(req,res)=>{
    const {heading, note} = req.body;

    if(!heading || !note){
        res.status(400);
        throw new Error("All fields are required");
    }
    console.log("stage1")

    const createdNote = await Note.create({
        uid: req.user.id,
        heading,
        note,
    
    });
    console.log("stage2");
    const response = {
    ...createdNote._doc,
    createdAt: createdNote.createdAt.toLocaleString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    })
}

res.status(201).json(response);

});


const getNote = asyncHandler(async(req,res)=>{
    const{heading} = req.body;

    const foundNote = await Note.findOne({heading,
        uid: req.user.id
    });

    if(!foundNote){
        res.status(400);
        throw new Error("note does not exists");
    }

    res.status(200).json(foundNote);
});


const deleteNote = asyncHandler(async(req,res)=>{
    const {heading} =req.body;
    const DeleteNote = await Note.findOneAndDelete({heading,
        uid: req.user.id});

    if(!DeleteNote){
        res.status(400);
        throw new Error(`No note exists with heading: ${heading}`);
    }

    res.status(200).json({message: `${heading} deleted`});
})

const getAllNotes = asyncHandler(async(req,res)=>{
    const notes = await Note.find({uid: req.user.id});
    if(!notes){
        res.status(400);
        throw new Error("No notes to show");
    }

    res.status(200).json(notes);
})

const updateNote = asyncHandler(async(req,res)=>{
    const {heading,body} =req.body;

    const foundNote = await Note.findOne({heading,
        uid: req.user.id
    }
);

    if(!foundNote){
        res.status(400);
        throw new Error("note does not exists");

    }

    const updatedNote = await Note.findByIdAndUpdate(req.user.id, heading, body, {
        new: true
    }
);

    res.status(200).json({message: `Note updated to ${updatedNote}`});
    
})



module.exports = {addNote,getNote,deleteNote,getAllNotes,updateNote}