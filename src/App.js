import { useState } from "react";

const initialtasks = [
  {
    id: 1,
    done: false,
    description: "Washing your clothes",
    editing: false,
  },
  { id: 2, done: false, description: "Study for 2 hours", editing: false },
  {
    id: 3,
    done: false,
    description: "Enjoy playing for an hour",
    editing: false,
  },
];

export default function App() {
  const [tasks, setTasks] = useState(initialtasks);
  function handleadd(task) {
    setTasks((tasks) => [...tasks, task]);
  }
  function handleDelete(id) {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  }
  function toggle(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }
  function edittodo(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, editing: !task.editing } : task
      )
    );
  }
  function editTask(value, id) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, description: value, editing: !task.editing }
          : task
      )
    );
  }

  function clearList() {
    const co = window.confirm("Are you sure you want to clear the list");
    if (co) setTasks([]);
    else return;
  }
  return (
    <div className="main">
      <h1>Welcome to Todolist App</h1>
      <p>Please add tasks to the list</p>
      <div className="content">
        <AddForm onAdd={handleadd} />

        <Tasklist
          tasks={tasks}
          onDelete={handleDelete}
          onToggle={toggle}
          onEdit={edittodo}
          onEditTask={editTask}
        />
      </div>
      <footer className="footer">
        <Button onClick={clearList}>Clear List</Button>
      </footer>
    </div>
  );
}
function AddForm({ onAdd }) {
  const [description, setdescription] = useState("");
  function handlesubmit(e) {
    e.preventDefault();
    if (!description) return;
    const id = Date.now();
    const newTask = {
      id,
      done: false,
      description,
    };
    onAdd(newTask);
    setdescription("");
  }
  return (
    <form className="form" onSubmit={handlesubmit}>
      <input
        type="text"
        placeholder="Add Task..."
        value={description}
        onChange={(e) => setdescription(e.target.value)}
      />
      <Button>ADD</Button>
    </form>
  );
}
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
function Tasklist({ tasks, onDelete, onToggle, onEdit, onEditTask }) {
  return (
    <ul className="list">
      {tasks.map((task) =>
        task.editing ? (
          <EditTodoForm task={task} onEditTask={onEditTask} />
        ) : (
          <Task
            key={task.id}
            task={task}
            onDelete={onDelete}
            onToggle={onToggle}
            onEdit={onEdit}
          />
        )
      )}
    </ul>
  );
}
function Task({ task, onDelete, onToggle, onEdit }) {
  return (
    <li>
      <input
        type="checkbox"
        value={task.done}
        onClick={() => onToggle(task.id)}
      />

      <span style={task.done ? { textDecoration: "line-through" } : {}}>
        {task.description}
      </span>
      <Button onClick={() => onEdit(task.id)}>edit</Button>
      <Button onClick={() => onDelete(task.id)}>❌</Button>
    </li>
  );
}
function EditTodoForm({ task, onEditTask }) {
  const [value, setValue] = useState(task.description);
  function handleedit(e) {
    e.preventDefault();
    onEditTask(value, task.id);
  }
  return (
    <form className="form" onSubmit={handleedit}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button onClick={() => onEditTask(task.id)}>ADD</Button>
    </form>
  );
}
