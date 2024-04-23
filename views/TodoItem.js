export default function TodoItem (todo) {
  const itemElem = document.createElement('li');
  itemElem.innerHTML = tpl();
  return itemElem;

  function tpl () {
    return (
      `
        <input
          type="checkbox"
          ${ todo.completed ? 'checked' : '' }
          data-id="${ todo.id }"
        />
        <span
          style="text-decoration:${ todo.completed ? 'line-through' : '' }"
        >${ todo.content }</span>
        <button data-id="${ todo.id }">REMOVE</button>
      `
    )
  }
}