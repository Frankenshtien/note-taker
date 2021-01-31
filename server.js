const express = require("express");
const path = require("path");
const fs = require("fs");
const PORT = process.env.PORT || 3001;
const app = express();
const notes = require("./db/db.json");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.post("api/notes", (req, res) => {
  const newNote = req.body;
  notes.push(newNote);
  console.log(newNote);
  fs.writeFileSync(notes, 2);
  res.json(notes);
});

app.listen(PORT, () => {
  console.log(`Server now live on port ${PORT}!`);
});
