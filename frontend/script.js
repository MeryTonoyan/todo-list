const API_URL = "http://localhost:3000";

const $list = document.querySelector("#list");
const $title = document.querySelector("#title");
const $status = document.querySelector("#status");
const $add = document.querySelector("#add");
const $search = document.querySelector("#search");

let items = [];

function loadTodos() {
    fetch(API_URL + "/lists")
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            items = data;
            render();
        })
        .catch(function(err) {
            console.error("Error loading todos:", err);
        });
}


    function onAdd() {
        let taskTitle = $title.value;
        let taskStatus = $status.value;

        if (taskTitle === "") {
            alert("Խնդրում ենք գրել որևէ բան");
            return;
        }

        let newTodo = {
            title: taskTitle,
            status: taskStatus
        };

        fetch(API_URL + "/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTodo)
        })
            .then(function(res) {
                return res.json();
            })
            .then(function(data) {
                $title.value = "";
                loadTodos();
            });
    }

window.deleteTodo = function(id) {
    fetch(API_URL + "/lists/" + id, { method: 'DELETE' })
        .then(function() {
            loadTodos();
        });
};

function render() {
    $list.innerHTML = items.map(function(t) {
        const statusClass = t.status === "Pending" ? "status-pending" :
            t.status === "In Progress" ? "status-progress" : "status-done";

        return `
            <li class="list-group-item">
                <div class="task-left" style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
                    <span class="task-text" style="font-weight:700;">${t.title}</span>
                    <span class="badge status ${statusClass}">${t.status}</span>
                </div>
                <div class="d-flex gap-2" style="display:flex;">
                    <button class="btn-ghost btn-del" onclick="deleteTodo('${t.id}')">Delete</button>
                </div>
            </li>
        `;
    }).join("");
}

$add.addEventListener("click", onAdd);

$search.addEventListener("input", function(e) {
    const q = e.target.value;
    fetch(API_URL + "/lists/search?q=" + q)
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            items = data;
            render();
        });
});

loadTodos();