import TodoItem from './TodoItem';

export default function TodoList (todoList) {
  const oList = document.createElement('ul');
  oList.className = 'todo-list';

  todoList.forEach(todo => {
    oList.appendChild(TodoItem(todo));
  })
  return oList;
}