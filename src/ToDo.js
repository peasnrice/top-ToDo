// ToDo.js

function ToDo(
  title,
  description,
  create_date,
  due_date,
  color,
  notes,
  complete
) {
  return {
    title,
    description,
    create_date,
    due_date,
    color,
    notes,
    complete,
  };
}

export { ToDo };
