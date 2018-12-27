import React, { Component } from "react";
import "./App.css";
import PropTypes from "prop-types";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastId: 3,
      showIt: true,
      todos: [
        { id: 0, title: "Learn React", complete: false },
        { id: 1, title: "Learn redux", complete: false },
        { id: 2, title: "Learn meteor", complete: false },
        { id: 3, title: "Learn react native", complete: false }
      ]
    };
    this.toDoInput = React.createRef();
  }

  componentDidMoun() {
    this.toDoInput.current.focus();
  }

  toggleComplete = item => {
    const todos = this.state.todos.map(todo => {
      if (todo.id === item.id) {
        todo.complete = !todo.complete;
      }

      return todo;
    });
    this.setState({ todos });
  };

  removeToDo = item => {
    const todos = this.state.todos.filter(todo => todo.id !== item.id);
    this.setState({ todos });
  };

  removeCompleted = () => {
    const todos = this.state.todos.filter(todo => !todo.complete);
    this.setState({ todos });
  };

  hasCompleted = () => {
    const todos = this.state.todos.filter(todo => todo.complete);
    return todos.length > 0 ? true : false;
  };

  addToDo = event => {
    event.preventDefault();
    let toDoInput = this.toDoInput.current;

    if (toDoInput.value) {
      const nextID = this.state.lastId + 1;
      const todos = [
        ...this.state.todos,
        { id: nextID, title: toDoInput.value, complete: false }
      ];
      this.setState({ todos, lastId: nextID });
      toDoInput.value = "";
    }
  };

  render() {
    return (
      <div className="todo-list">
        <h1>So Much Todo</h1>
        <div className="add-todo">
          <form name="addTodo" onSubmit={this.addToDo}>
            <input type="text" ref={this.toDoInput} />
            <span>(press enter to add)</span>
          </form>
        </div>
        <ul>
          {this.state.todos.map(todo => (
            <TodoItem
              item={todo}
              toggleComplete={this.toggleComplete}
              removeToDo={this.removeToDo}
            />
          ))}
        </ul>

        <div className="todo-admin">
          <ToDoCount number={this.state.todos.length} />
          {this.hasCompleted() && (
            <ClearButton removeCompleted={this.removeCompleted} />
          )}
        </div>
      </div>
    );
  }
}

const TodoItem = ({ item, toggleComplete, removeToDo }) => {
  return (
    <li>
      {item.title}
      <input
        type="checkbox"
        id={item.id}
        checked={item.complete}
        onChange={() => toggleComplete(item)}
      />
      <label htmlFor={item.id} />
      <button onClick={() => removeToDo(item)}>
        <i className="fa fa-trash" />
      </button>
    </li>
  );
};

const ToDoCount = ({ number }) => {
  return (
    <p>
      {number} {number >= 1 ? "todo" : "todos"}
    </p>
  );
};

const ClearButton = ({ removeCompleted }) => {
  return <button onClick={() => removeCompleted()}>Clear completed</button>;
};

ToDoCount.propTypes = {
  number: PropTypes.number
};

ToDoCount.defaultProps = {
  number: 10
};

TodoItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired
};

ClearButton.propTypes = {
  removeCompleted: PropTypes.func.isRequired
};

export default App;
