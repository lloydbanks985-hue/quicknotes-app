const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const clearAllBtn = document.querySelector("#clear-all"); // BONUS START
// BONUS END

const STORAGE_KEY = "quicknotes"; // T5 START
// T5 END
let notes = [];

// T5 START
function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function loadNotes() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved)) notes = saved;
  } catch (err) {
    notes = [];
  }
}
// T5 END

function render() {
  notesList.textContent = "";
  let visible = notes;

  // T5 START
  const words = searchInput.value.toLowerCase().split(/\s+/).filter(Boolean);
  visible = notes.filter(function (note) {
    const text = note.text.toLowerCase();
    return words.every(function (word) { return text.includes(word); });
  });
  if (notes.length > 0 && visible.length === 0) {
    const empty = document.createElement("li");
    empty.className = "no-results";
    empty.textContent = "No notes match your search.";
    notesList.appendChild(empty);
  }
  // T5 END

  visible.forEach(function (note) {
    const li = document.createElement("li");
    li.className = "note category-" + note.category;

    const text = document.createElement("p");
    text.textContent = note.text;

    const meta = document.createElement("div");
    meta.className = "note-meta";

    const label = document.createElement("span");
    label.className = "label";
    label.textContent = note.category.charAt(0).toUpperCase() + note.category.slice(1);

    const date = document.createElement("span");
    date.textContent = note.createdAt;

    meta.append(label, date);

    // T4 START
    const del = document.createElement("button");
    del.type = "button";
    del.className = "btn";
    del.textContent = "Delete";
    del.addEventListener("click", function () { deleteNote(note.id); });
    meta.appendChild(del);
    // T4 END

    li.append(text, meta);
    notesList.appendChild(li);
  });

  // T4 START
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = "You have " + notes.length + " notes.";
  }
  // T4 END
}

// T4 START
function deleteNote(id) {
  notes = notes.filter(function (note) { return note.id !== id; });
  saveNotes(); // T5
  render();
}
// T4 END

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const text = noteInput.value.trim();

  // T4 START
  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }
  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }
  errorMessage.textContent = "";
  // T4 END

  notes.unshift({
    id: Date.now(),
    text: text,
    category: categorySelect.value,
    createdAt: new Date().toLocaleString()
  });
  noteInput.value = "";
  saveNotes(); // T5
  render();
});

searchInput.addEventListener("input", render); // T5

// BONUS START
clearAllBtn.addEventListener("click", function () {
  if (notes.length > 0 && confirm("Delete all notes?")) {
    notes = [];
    saveNotes();
    render();
  }
});
// BONUS END

loadNotes(); // T5
render();
