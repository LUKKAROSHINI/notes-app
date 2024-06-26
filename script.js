document.addEventListener('DOMContentLoaded', () => {
    const noteForm = document.getElementById('note-form');
    const noteInput = document.getElementById('note-input');
    const notesContainer = document.getElementById('notes-container');

    // Load notes from local storage
    const loadNotes = () => {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notesContainer.innerHTML = '';
        notes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.innerHTML = `
                <span class="note-text">${note}</span>
                <div class="note-buttons">
                    <button onclick="editNote(${index})">Edit</button>
                    <button onclick="deleteNote(${index})">Delete</button>
                    <button onclick="sendNoteEmail('${note}')">Email</button>
                </div>
            `;
            notesContainer.appendChild(noteElement);
        });
    };

    // Function to send email for a note
    const sendNoteEmail = (noteContent) => {
        const recipientEmail = 'lukkaroshini@outlook.com'; // Replace with recipient email
        sendEmail(recipientEmail, noteContent);
    };

    // Add a new note
    noteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const noteText = noteInput.value.trim();
        if (noteText) {
            const notes = JSON.parse(localStorage.getItem('notes')) || [];
            notes.push(noteText);
            localStorage.setItem('notes', JSON.stringify(notes));
            noteInput.value = '';
            loadNotes();
        }
    });

    // Edit a note
    window.editNote = (index) => {
        const notes = JSON.parse(localStorage.getItem('notes'));
        const newNote = prompt('Edit your note:', notes[index]);
        if (newNote !== null) {
            notes[index] = newNote;
            localStorage.setItem('notes', JSON.stringify(notes));
            loadNotes();
        }
    };

    // Delete a note
    window.deleteNote = (index) => {
        const notes = JSON.parse(localStorage.getItem('notes'));
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes();
    };

    // Initial load
    loadNotes();
});
