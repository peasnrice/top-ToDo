// ToDo.js

function ToDo(
  title,
  description,
  create_date,
  due_date,
  color,
  priority,
  notes,
  complete
) {
  return {
    getPriority: function () {
      return priority;
    },
    setPriority: function (newPriority) {
      priority = newPriority;
    },
    title,
    description,
    create_date,
    due_date,
    color,
    priority,
    notes,
    complete,
  };
}

function swapPriority(toDo1, toDo2) {
  const tempPriority = toDo1.getPriority();
  toDo1.setPriority(toDo2.getPriority());
  toDo2.setPriority(tempPriority);
}
export { ToDo, swapPriority };
