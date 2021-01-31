const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
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

app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  let id = uuidv4();
  console.log(id);
  newNote.id = id;
  notes.push(newNote);
  console.log(newNote);
  fs.writeFileSync("db/db.json", JSON.stringify(notes));
  res.json(notes);
});

app.delete("/api/notes:id", (req, res) => {
  console.log(req.body);
  // for (i = 0; i < notes.length; i++) {
  //   if (req.body.id === notes[i].id) {
  //     res.send("file deletes");
  //     }
  //   }
});

app.listen(PORT, () => {
  console.log(`Server now live on port ${PORT}!`);
});
