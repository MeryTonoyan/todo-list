import 'dotenv/config'
import express, { urlencoded } from 'express'
import { readFile, writeFile } from 'fs/promises'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(cors())
app.use(urlencoded({ extended: true }))

let todos = [
    {   id: "1",
        title: "Սովորել Express",
        status: "Pending",
        createdAt: Date.now() },
    {   id: "2",
        title: "Սարքել Todo App",
        status: "In Progress",
        createdAt: Date.now() }
];

app.get('/lists', (req, res) => {
    res.json(todos);
});


app.get('/lists/search', (req, res) => {
    let q = req.query.q || "";
    let filtered = todos.filter(val => val.title.toLowerCase().includes(q.toLowerCase()));
    res.json(filtered);
});

app.get('/lists/:id', (req, res) => {
    let id = req.params.id;
    let item = todos.find(val => val.id === id);
    res.json(item);
});

app.todos('/add', (req, res) => {
    const newTodo = {
        id: String(Date.now()),
        title: req.body.title,
        status: req.body.status || "Pending",
        createdAt: Date.now()
    };
    todos.push(newTodo);
    res.json(newTodo);
});

app.delete('/lists/:id', (req, res) => {
    const id = req.params.id;
    todos = todos.filter(t => t.id !== id);
    res.json(todos);
});











const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});