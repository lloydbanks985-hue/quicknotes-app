# QuickNotes

QuickNotes is a small note-taking web app built with plain HTML, CSS and JavaScript. You can write short notes, file them under Personal, Work or Study, search through them and delete the ones you no longer need. Everything is saved in your browser, so your notes are still there after you refresh the page.

## Features

- Add notes (up to 200 characters) with a category: Personal, Work or Study
- Each note shows its text, a category label, the date and time, and a Delete button
- Validation messages for empty or too-long notes
- Live search (not case-sensitive) with a "No notes match your search." message
- Note counter: no notes, 1 note, or N notes
- Notes saved with localStorage, so they survive a refresh
- Colour-coded category cards and a responsive layout for small screens
- "Clear all" button with a confirmation prompt <!-- BONUS -->

## How to run locally

1. Clone the repository: `git clone https://github.com/your-username/quicknotes-app.git`
2. Open the `quicknotes-app` folder.
3. Double-click `index.html` to open it in your browser. No installation or server is needed.

## What I learned

- How to build the page with `createElement` and `textContent` instead of `innerHTML`, so user text can never be run as HTML.
- How to keep data in an array of objects and use `JSON.stringify` and `JSON.parse` to save and load it with localStorage.
- How Flexbox and a `@media (max-width: 600px)` rule make a form switch from a row to a column on small screens.
- How small, focused Git commits make a project easier to follow.
