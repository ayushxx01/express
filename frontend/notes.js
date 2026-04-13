const newNoteBtn = document.getElementById("new-note-btn");
const noteForm = document.getElementById("note-form");
const cancelBtn = document.getElementById("cancel-btn");
const notesGrid = document.getElementById("notes-grid");
const emptyState = document.getElementById("empty-state");
const token = localStorage.getItem("token");
const payload = JSON.parse(atob(token.split(".")[1]));
const username = document.getElementById("user-name");
const logoutBtn = document.getElementById("logout-btn");    
username.textContent = payload.username;


// Toggle open/close when clicking New Note
newNoteBtn.addEventListener("click", () => {
  noteForm.classList.toggle("open");
});

// Close when clicking Cancel
cancelBtn.addEventListener("click", () => {
  noteForm.classList.remove("open");
});





const createNote = async () => {
    const heading = document.getElementById("note-title").value.trim();
    const note = document.getElementById("note-content").value.trim();

    if(!heading || !note){
        alert("All fields are mandatory");
        return;
    }

    const response = await fetch('http://localhost:2341/note/addNote', {
        method: "POST",
        headers: {
            'Content-type': "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({heading, note})
    });

    const data = await response.json();
        getNotes();
    noteForm.classList.remove("open");

    console.log(data);

}

document.getElementById("save-note-btn").addEventListener('click', createNote);


const getNotes = async() => {
    const response = await fetch('http://localhost:2341/note/getAllNotes', {
        method: "GET",
        headers: {
            'Content-type': "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });
    notesGrid.innerHTML = "";

    const data = await response.json();

    if (data.length === 0){
        emptyState.style.display = "block";
        notesGrid.style.display = "none";
        return;
    }
    else{
        emptyState.style.display = "none";
        notesGrid.style.display = "grid";
        renderNotes(data);
    }
    console.log(data);
}

const renderNotes = (notes) => {
    notes.forEach(note => {
        const noteCard = document.createElement("div");
        noteCard.classList.add("note-card");
        noteCard.innerHTML = `
            <h3>${note.heading}</h3>
            <p>${note.note}</p>
        `;
        notesGrid.appendChild(noteCard);
    });

}

const logout = () =>{
    localStorage.removeItem("token");
    window.location.href = "index.html";
}

logoutBtn.addEventListener("click", logout);
getNotes();