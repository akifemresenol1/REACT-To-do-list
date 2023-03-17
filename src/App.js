import './App.css';
import Header from "./components/Header";
import { useState } from "react";

function App() {
  
  const [todos, setTodos] = useState([
	{
		label: "Learn JavaScript",
		isChecked: true,
	},
	{
		label: "Learn React",
		isChecked: false,
	},
	{
		label: " Have a life!",
		isChecked: false,
	},
  ]);
  
  const [statusFilter, setStatusFilter] = useState("All");

  const changeCheckBox = (todo) => {
	const myTodo = todos.find((td) => td == todo);
	myTodo.isChecked = !todo.isChecked;
	setTodos([...todos]);
  };

  const clearCompletedTodo = () => {
	const activeTodos = todos.filter((todo) => todo.isChecked === false);
	setTodos(activeTodos);
  };

	const removeTodo = (todo) => {
    const myTodoIndex = todos.indexOf(todo);
    const newTodos = [...todos];

    newTodos.splice(myTodoIndex, 1);
    setTodos(newTodos);
  };

  const filterFunction = (statusFilter) => {
	if (statusFilter === "All") {
		return [...todos];
	}else if (statusFilter === "Active") {
		return todos.filter((todo) => todo.isChecked === false);
	}
	return todos.filter((todo) => todo.isChecked === true);
  };

  const filteredTodos = filterFunction(statusFilter);
  const activeTodosLength = todos.filter((t) => !t.isChecked).length;

  return (
    <div>
    <section className="todoapp">
    
	<Header></Header>
	
	<section className="main">
		<input className="toggle-all" type="checkbox" />
		<label htmlFor="toggle-all">
			Mark all as complete
		</label>

		<ul className="todo-list">
			{filteredTodos.map((todo, i) => {
				return (
			<li key={i} className={todo.isChecked ? "completed" : ""}>
				<div className="view">
					<input className="toggle" type="checkbox"  checked={todo.isChecked} onChange={() =>{
						changeCheckBox(todo);
					}} />
					<label>{todo.label}</label>
					<button className="destroy" onClick={() => removeTodo(todo)}></button>
				</div>
			</li>
				);
			})}
			
			
		</ul>
	</section>

	<footer className="footer">
		<span className="todo-count">
			<strong>{activeTodosLength}</strong>
			items left
		</span>

		<ul className="filters">
			<li>
				<a href="#/" className={statusFilter==="All" ? "selected" : ""}
				onClick={() => setStatusFilter("All")}>All</a>
			</li>
			<li>
				<a href="#/" className={statusFilter === "Active" ? "selected" : ""}
                onClick={() => setStatusFilter("Active")}>Active</a>
			</li>
			<li>
				<a href="#/"  className={statusFilter === "Completed" ? "selected" : ""}
                onClick={() => setStatusFilter("Completed")}>Completed</a>
			</li>
		</ul>

		<button className="clear-completed" onClick={clearCompletedTodo}>
			Clear completed
		</button>
	</footer>
</section>
<footer className="info">
        <p>Click to edit a todo</p>
        <p>
          Created by <a href="https://d12n.me/">Dmitry Sharabin</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
      </div>
  );
}

export default App;
