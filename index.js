const express = require("express");
const app = express();
const dotenv = require("dotenv");
const TodoTask = require("./models/ToDoObject");
const mongoose = require("mongoose");

dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    TodoTask.find({}, (err, tasks) => {
      res.render("todo.ejs", { todoTasks: tasks });
    });
});

mongoose.connect("mongodb+srv://fatimasabouneh:098.zztkt@cluster0.xjok9.mongodb.net/todo?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true,})
    .then(() => {
        console.log("Connected to database ");
        app.listen(8000, () => console.log("Server Up and running"));
    })
    .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
    });

app.post("/", async (req, res) => {
    const todoTask = new TodoTask({
        description: req.body.description,
        isComplete: req.body.isComplete,
    });
    try {
        await todoTask.save();
        res.redirect("/");
    } catch (err) {
        res.redirect("/");
    }
});

app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
    if (err) return res.send(500, err);
    res.redirect("/");
    });
});

app.route("/edit/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.find({}, (err, tasks) => {
    res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
    });
})
.post((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndUpdate(id, { isComplete: req.body.isComplete }, (err) => {
    if (err) return res.send(500, err);
    res.redirect("/");
    });
});

