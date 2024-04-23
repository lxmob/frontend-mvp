export default class TodoModel {
  constructor () {
    this.todoText = '';
    this.todoList = [
      {
        id: 1,
        content: 'Hello',
        completed: true
      },
      {
        id: 2,
        content: 'MVP Presenters',
        completed: false
      }
    ]
  }

  setTodoText (text) {
    this.todoText = text;
  }

  addTodo (text, cb) {
    const todo = {
      id: Date.now(),
      content: text,
      completed: false
    }
    this.todoList.push(todo);
    doCallback(cb, todo);
    this.setTodoText('');
  }

  toggleTodo (id, cb) {
    this.todoList = this.todoList.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    })
    doCallback(cb, id);
  }

  removeTodo (id, cb) {
    this.todoList = this.todoList.filter(todo => todo.id !== id);
    doCallback(cb, id);
  }

  static create () {
    if (!TodoModel.instance) {
      TodoModel.instance = new TodoModel();
    }
    return TodoModel.instance;
  }
}

function doCallback (cb, arg) {
  typeof cb === 'function' && cb(arg);
}