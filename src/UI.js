//UI.js
import { differenceInCalendarDays } from "date-fns";

// Initial setup for UI elements
const projectContainer = document.getElementById("project-container");
const projectCards = document.getElementById("project-cards");

// drawProjects function
function drawProjects(projects, selectedProjectIndex, updateSelectedIndex) {
  projectCards.innerHTML = "";
  projects.forEach((project, index) => {
    const projectCard = document.createElement("div");
    projectCard.setAttribute("id", `project-card-${index}`);
    projectCard.classList.add("project-card");
    console.log(`in loop: ${selectedProjectIndex}`);
    if (selectedProjectIndex === index) {
      projectCard.classList.add("selected");
    }
    projectCard.innerText = project.title;
    projectCard.addEventListener("click", () => {
      const oldSelectedProjectCard = document.getElementById(
        `project-card-${selectedProjectIndex}`
      );
      oldSelectedProjectCard.classList.remove("selected");
      projectCard.classList.add("selected");
      selectedProjectIndex = index;
      updateSelectedIndex(index);
      drawProject(projects[index], selectedProjectIndex);
    });
    projectCards.appendChild(projectCard);
  });
}

// drawProject function
function drawProject(project, selectedProjectIndex) {
  // Clear the project container
  projectContainer.innerHTML = "";

  // Create and append project details

  const projectHeaderWrapper = document.createElement("div");
  projectHeaderWrapper.setAttribute("id", "project-header-wrapper");

  const projectDetailsContainer = document.createElement("div");
  projectDetailsContainer.setAttribute("id", "project-details-container");
  const projectDeleteContainer = document.createElement("div");
  projectDeleteContainer.setAttribute("id", "project-delete-container");

  const projectDetails = document.createElement("div");
  projectDetails.classList.add("project-details");

  const projectTitle = document.createElement("h3");
  projectTitle.innerText = project.title;

  const projectDescription = document.createElement("p");
  projectDescription.innerText = project.description;

  projectDetailsContainer.appendChild(projectTitle);
  projectDetailsContainer.appendChild(projectDescription);

  const projectDeleteBtn = document.createElement("button");
  projectDeleteBtn.setAttribute(
    "id",
    `project-delete-button-${selectedProjectIndex}`
  );
  projectDeleteBtn.classList.add("project-delete-button");
  projectDeleteBtn.textContent = "Delete Project";
  projectDeleteContainer.appendChild(projectDeleteBtn);

  projectHeaderWrapper.appendChild(projectDetailsContainer);
  projectHeaderWrapper.appendChild(projectDeleteContainer);

  projectContainer.appendChild(projectHeaderWrapper);

  // Create the main project-todos container
  const projectToDos = document.createElement("div");
  projectToDos.setAttribute("id", "project-todos");

  // Iterate over each todo item and create its DOM structure
  project.getToDos().forEach((todo, index) => {
    const todoElement = document.createElement("div");
    todoElement.setAttribute("id", `todo-${index}`);

    // if complete change background
    if (todo.complete) {
      todoElement.classList.add("complete");
    }

    todoElement.classList.add("todo");

    // Create the todo-header
    const todoHeader = document.createElement("div");
    todoHeader.classList.add("todo-header");

    // Create the left section of the header
    const leftSection = document.createElement("div");
    leftSection.classList.add("left");

    const priorityButtons = document.createElement("div");
    priorityButtons.classList.add("priority-buttons");
    const priorityUpBtn = document.createElement("button");
    priorityUpBtn.setAttribute("id", `priority-up-${index}`);
    priorityUpBtn.classList.add("priority-up");
    priorityUpBtn.innerText = "⬆️";
    const priorityDownBtn = document.createElement("button");
    priorityDownBtn.setAttribute("id", `priority-down-${index}`);
    priorityDownBtn.classList.add("priority-down");
    priorityDownBtn.innerText = "⬇️";
    priorityButtons.appendChild(priorityUpBtn);
    priorityButtons.appendChild(priorityDownBtn);

    const todoTitle = document.createElement("p");
    todoTitle.classList.add("todo-title");
    todoTitle.setAttribute("required", "true");

    todoTitle.innerText = todo.title;

    // Append elements to the left section
    leftSection.appendChild(priorityButtons);
    leftSection.appendChild(todoTitle);

    // Create the right section of the header
    const rightSection = document.createElement("div");
    rightSection.classList.add("right");

    const todoDueDate = document.createElement("p");
    todoDueDate.classList.add("todo-due-date");
    if (todo.due_date) {
      todoDueDate.innerText = todo.due_date;
    } else {
      todoDueDate.innerText = "No Due Date";
    }

    const todoPriority = document.createElement("p");
    todoPriority.classList.add("todo-priority");
    todoPriority.classList.add("hidden");
    todoPriority.innerText = todo.priority;

    const dueDateCount = document.createElement("p");
    const date = new Date();
    const daysUntilDue = differenceInCalendarDays(todo.due_date, date);
    if (daysUntilDue < 0) {
      dueDateCount.textContent = `OVERDUE BY ${daysUntilDue}`;
    } else if (daysUntilDue == 0) {
      dueDateCount.textContent = "Due Today!";
    } else {
      dueDateCount.textContent = `Due in ${daysUntilDue} days`;
    }

    // Append elements to the right section
    rightSection.appendChild(dueDateCount);
    rightSection.appendChild(todoDueDate);
    // rightSection.appendChild(todoPriority);

    // Append left and right sections to the header
    todoHeader.appendChild(leftSection);
    todoHeader.appendChild(rightSection);

    // Create the todo-content section
    const todoContent = document.createElement("div");
    todoContent.classList.add("todo-content");

    const contentLeft = document.createElement("div");
    contentLeft.classList.add("content-left");
    const contentRight = document.createElement("div");
    contentRight.classList.add("content-right");

    const todoDescription = document.createElement("p");
    todoDescription.classList.add("todo-descriptions");
    todoDescription.innerText = todo.description;

    const todoNotes = document.createElement("p");
    todoNotes.classList.add("todo-notes");
    todoNotes.innerText = todo.notes;

    const todoDelete = document.createElement("button");
    todoDelete.setAttribute("id", `todo-delete-${index}`);
    todoDelete.classList.add("todo-delete");
    todoDelete.innerText = "Delete ToDo";

    const checkboxContainer = document.createElement("div");
    checkboxContainer.classList.add("checkbox-container");
    const checkboxMessage = document.createElement("p");
    checkboxMessage.textContent = "Complete";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "todo-complete";
    checkbox.id = `todo-complete-${index}`;
    checkbox.checked = todo.complete;

    checkboxContainer.appendChild(checkboxMessage);
    checkboxContainer.appendChild(checkbox);

    // Append elements to the content section
    contentLeft.appendChild(todoDescription);
    contentLeft.appendChild(todoNotes);
    contentRight.appendChild(checkboxContainer);
    contentRight.appendChild(todoDelete);

    todoContent.appendChild(contentLeft);
    todoContent.appendChild(contentRight);

    // Append header and content to the main todo element
    todoElement.appendChild(todoHeader);
    todoElement.appendChild(todoContent);

    // Append the todo element to the project-todos container
    projectToDos.appendChild(todoElement);
  });

  // Append project-todos to the project container
  projectContainer.appendChild(projectToDos);

  // Create and append Create ToDo button
  const createToDoButton = document.createElement("button");
  createToDoButton.setAttribute("id", "create-to-do-btn");
  createToDoButton.innerText = "Create ToDo";
  projectContainer.appendChild(createToDoButton);

  // Create and append form container
  const todoFormContainer = document.createElement("div");
  todoFormContainer.setAttribute("id", "todo-create-form-container");
  todoFormContainer.classList.add("hidden");

  const createToDoTitle = document.createElement("h3");
  createToDoTitle.textContent = "Create new ToDo";
  todoFormContainer.appendChild(createToDoTitle);

  const todoForm = document.createElement("form");
  todoForm.setAttribute("id", "todo-form");
  todoForm.setAttribute("action", "create-todo");

  // Create form title element
  const formTitle = document.createElement("div");
  formTitle.classList.add("form-element", "title");
  const titleLabel = document.createElement("label");
  titleLabel.setAttribute("for", "todo-title");
  titleLabel.innerText = "Title";
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.name = "todo-title";
  titleInput.id = "todo-title";
  formTitle.appendChild(titleLabel);
  formTitle.appendChild(titleInput);

  // Create form description element
  const formDescription = document.createElement("div");
  formDescription.classList.add("form-element");
  const descriptionLabel = document.createElement("label");
  descriptionLabel.setAttribute("for", "todo-description");
  descriptionLabel.innerText = "Description";
  const descriptionInput = document.createElement("input");
  descriptionInput.type = "text";
  descriptionInput.name = "todo-description";
  descriptionInput.id = "todo-description";
  formDescription.appendChild(descriptionLabel);
  formDescription.appendChild(descriptionInput);

  // Create form create date element
  const formCreateDate = document.createElement("div");
  formCreateDate.classList.add("form-element", "hidden");
  const createDateLabel = document.createElement("label");
  createDateLabel.setAttribute("for", "todo-create-date");
  createDateLabel.innerText = "Create Date";
  const createDateInput = document.createElement("input");
  createDateInput.type = "text";
  createDateInput.name = "todo-create-date";
  createDateInput.id = "todo-create-date";
  createDateLabel.classList.add("hidden");
  createDateInput.classList.add("hidden");
  formCreateDate.appendChild(createDateLabel);
  formCreateDate.appendChild(createDateInput);

  // Create form due date element
  const formDueDate = document.createElement("div");
  formDueDate.classList.add("form-element");
  const dueDateLabel = document.createElement("label");
  dueDateLabel.setAttribute("for", "todo-due-date");
  dueDateLabel.innerText = "Due Date";
  const dueDateInput = document.createElement("input");
  dueDateInput.type = "date";
  dueDateInput.name = "todo-due-date";
  dueDateInput.id = "todo-due-date";
  formDueDate.appendChild(dueDateLabel);
  formDueDate.appendChild(dueDateInput);

  // create hidden form input to pass project index
  const formProjectInput = document.createElement("input");
  formProjectInput.setAttribute("id", "todo-project-index");
  formProjectInput.classList.add("hidden");
  formProjectInput.value = selectedProjectIndex;

  // Create form submit button
  const formSubmitButton = document.createElement("button");
  formSubmitButton.setAttribute("id", "todo-create");
  formSubmitButton.innerText = "Create ToDo";

  // Create form cancel button
  const formCancelButton = document.createElement("button");
  formCancelButton.setAttribute("id", "todo-cancel");
  formCancelButton.classList.add("hidden");
  formCancelButton.innerText = "Cancel";

  // Append form elements to the form

  todoForm.appendChild(formTitle);
  todoForm.appendChild(formDescription);
  todoForm.appendChild(formCreateDate);
  todoForm.appendChild(formDueDate);
  todoForm.appendChild(formProjectInput);
  todoForm.appendChild(formSubmitButton);

  // Append form and cancel button to the form container
  todoFormContainer.appendChild(todoForm);

  // Append form container to the project container
  projectContainer.appendChild(todoFormContainer);
  projectContainer.appendChild(formCancelButton);
}

export { drawProjects, drawProject };
