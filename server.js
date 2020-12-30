const express = require("express");
const path = require("path");
const fs = require("fs");
const nanoId = require("nanoid");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/api/notes", function (req, res) {
    fs.readFile(__dirname + "/db/db.json", "UTF8", (err, data) => {
        if (err) throw error;

        let databaseNotes = JSON.parse(data);
        return res.json(databaseNotes);
    })
});

app.post("/api/notes", function (req, res) {
    let newNote = {
        title: req.body.title,
        text: req.body.text,
        id: nanoId(),
    };

    fs.readFile(__dirname + "/db/db.json", "UTF8", (err, data) => {
        if (err) throw error;

        let allNotes = JSON.parse(data);
        allNotes.push(newNote);
        fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(allNotes));
        return res.json(allNotes);
    })
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});