import * as TodoTpl from '../views';
import TodoModel from '../models/todoList';

;(function () {
  const oApp = document.getElementById('app');
  const todoModel = TodoModel.create();

  const nodes = {
    oForm: null,
    oText: null,
    oAddBtn: null,
    oList: null
  }

  const init = function () {
    render();
    bindEvent();
  }

  function render () {
    const frag = document.createDocumentFragment();
    frag.appendChild(TodoTpl.TodoForm());
    frag.appendChild(TodoTpl.TodoList(todoModel.todoList));
    oApp.appendChild(frag);
  }

  function bindEvent () {
    nodes.oForm = document.querySelector('.todo-form');
    nodes.oText = document.querySelector('.todo-text');
    nodes.oAddBtn = document.querySelector('.todo-add-btn');
    nodes.oList = document.querySelector('.todo-list');
    
    nodes.oText.addEventListener('input', handleTodoInput, false);
    nodes.oForm.addEventListener('click', handleSubmit, false);
    nodes.oAddBtn.addEventListener('click', handleSubmit, false);
    nodes.oList.addEventListener('click', handleListClick, false);
  }

  function handleTodoInput (e) {
    todoModel.setTodoText(e.target.value);
  }

  function handleSubmit (e) {
    e.preventDefault();
    const text = todoModel.todoText;
    if (!text.length) return;

    todoModel.addTodo(text, (todo) => appendItem(TodoTpl.TodoItem(todo)));
  }

  function handleListClick (e) {
    const tar = e.target;
    const tagName = tar.tagName.toLowerCase();

    switch (tagName) {
      case 'input':
        handleToggleTodo(tar);
        break;
      case 'button':
        handleRemoveTodo(tar);
        break;
      default:
        break;
    }
  }

  function appendItem (item) {
    nodes.oList.appendChild(item);
    nodes.oText.value = '';
  }

  function handleToggleTodo (e) {
    const id = e.dataset.id;
    todoModel.toggleTodo(id, () => toggleItem(e));
  }

  function toggleItem (e) { 
    const oSpan = e.parentNode.querySelector('span')
    oSpan.style.textDecoration = target.checked ? 'line-through' : '';
  }

  function handleRemoveTodo (e) {
    const id = e.dataset.id;
    todoModel.removeTodo(id, () => removeItem(e));
  }

  function removeItem (e) {
    e.parentNode.remove();
  }

  init();
})()