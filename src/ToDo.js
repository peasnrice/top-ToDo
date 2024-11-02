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

export { ToDo };
