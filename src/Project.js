// Project.js
import { ToDo, swapPriority } from "./ToDo.js";
import { drawProject } from "./UI.js";

// Create some sample todos
const sampleTodos = [
  new ToDo(
    "Create Wireframes",
    "Design wireframes for the homepage and key pages.",
    "2024-11-01",
    "2024-11-10",
    "blue",
    "Use Figma for wireframing.",
    false
  ),
  new ToDo(
    "Backend API Development",
    "Develop RESTful APIs for user authentication and data handling.",
    "2024-11-02",
    "2024-11-20",
    "green",
    "Ensure proper documentation with Swagger.",
    false
  ),
  new ToDo(
    "Derpin About",
    "did a derp.",
    "2024-11-02",
    "2024-11-20",
    "green",
    "Ensure proper documentation with Swagger.",
    false
  ),
];

// pre-populated projects for testing
const projects = [
  new Project(
    "Website Redesign",
    "Redesign the company website to improve user experience and mobile responsiveness."
  ),
  new Project(
    "Mobile App Launch",
    "Develop and launch the new mobile app for iOS and Android."
  ),
  new Project(
    "Marketing Campaign",
    "Plan and execute the Q4 marketing campaign for the new product release."
  ),
  new Project(
    "Customer Feedback System",
    "Implement a system to collect and analyze customer feedback in real-time."
  ),
  new Project(
    "Internal Dashboard",
    "Create an internal dashboard for tracking key business metrics."
  ),
];

// Add dummy todo content to all projects
projects.forEach((project, index) => {
  sampleTodos.forEach((todo, index) => {
    project.addToDoToProject(todo);
  });
});

// define project factory
function Project(title, description) {
  let todos = [];

  function addToDoToProject(todo) {
    todos.push(todo);
  }

  function getToDos() {
    return todos;
  }

  function swapToDos(indexA, indexB) {
    let temp = todos[indexA];
    todos[indexA] = todos[indexB];
    todos[indexB] = temp;
  }

  function toggleCheckbox(index) {
    console.log(todos[index]);
    todos[index].complete = !todos[index].complete;
    console.log(todos[index]);
  }

  function deleteToDoAtIndex(index) {
    console.log(todos.length);

    todos = todos.slice(0, index).concat(todos.slice(index + 1));

    console.log(todos.length);
  }

  return {
    title,
    description,
    addToDoToProject,
    getToDos,
    swapToDos,
    toggleCheckbox,
    deleteToDoAtIndex,
  };
}

// find key elements on the page to watch
const projectCards = document.getElementById("project-cards");
const projectFormBtn = document.getElementById("create-project-btn");
const projectFormContainer = document.getElementById(
  "project-create-form-container"
);

projectFormBtn.addEventListener("click", () => {
  // toggle display of project form container

  setElementVisibility(projectFormContainer, true);
  setElementVisibility(projectFormBtn, false);
});

function setElementVisibility(element, visibility) {
  visibility
    ? element.classList.remove("hidden")
    : element.classList.add("hidden");
}

function toggleElementVisibility(element) {
  element.classList.toggle("hidden");
}

const cancelProjectBtn = document.getElementById("cancel-project-btn");
const projectTitleInput = document.getElementById("project-title");
const projectDescriptionInput = document.getElementById("project-description");
const constprojectForm = document.getElementById("project-form");

cancelProjectBtn.addEventListener("click", () => {
  // setElementVisibility(projectFormContainer, false);
  // setElementVisibility(projectFormBtn, true);
  setElementVisibility(constprojectForm, false);
  setElementVisibility(cancelProjectBtn, false);
  projectTitleInput.value = "";
  projectDescriptionInput.value = "";
});

const projectContainer = document.getElementById("project-container");
projectContainer.addEventListener("click", (e) => {
  console.log(e.target.id);
  const createToDoFormContainer = document.getElementById(
    "todo-create-form-container"
  );
  const todoTitle = document.getElementById("todo-title");
  const todoDescription = document.getElementById("todo-description");
  const todoCreateDate = document.getElementById("todo-create-date");
  const todoDueDate = document.getElementById("todo-due-date");
  const projectIndex = document.getElementById("todo-project-index");
  const toDoCancel = document.getElementById("todo-cancel");

  if (e.target && e.target.id === "create-to-do-btn") {
    e.preventDefault();
    setElementVisibility(createToDoFormContainer, true);
    setElementVisibility(e.target, false);
    setElementVisibility(toDoCancel, true);
  }

  if (e.target && e.target.id === "todo-cancel") {
    e.preventDefault();
    setElementVisibility(createToDoFormContainer, false);
    setElementVisibility(document.getElementById("create-to-do-btn"), true);
    document.getElementById("todo-title").value = "";
    document.getElementById("todo-description").value = "";
    document.getElementById("todo-create-date").value = "";
    document.getElementById("todo-due-date").value = "";
    setElementVisibility(e.target, false);
  }

  if (e.target && e.target.id === "todo-create") {
    e.preventDefault();

    if (todoTitle.value.length <= 20 && todoTitle.value.length > 0) {
      const newToDo = ToDo(
        todoTitle.value,
        todoDescription.value,
        todoCreateDate.value || new Date().toISOString().split("T")[0], // Default to today's date if empty
        todoDueDate.value,
        null, // Color can remain null if not provided
        "", // Default notes to an empty string
        false // Default complete status
      );

      console.log(newToDo);

      projects[projectIndex.value].addToDoToProject(newToDo);
      setElementVisibility(projectFormContainer, false);
      setElementVisibility(projectFormBtn, true);
      projectTitleInput.value = "";
      projectDescriptionInput.value = "";
      drawProject(projects[projectIndex.value], projectIndex.value);
    } else {
      alert("ToDo Title cannot be blank!");
    }
  }

  if (e.target && e.target.id.includes("priority-up")) {
    // Handle priority up click
    console.log("Priority Up button clicked:", e.target.id);
    // You can also extract the index from the id, if needed
    const index = parseInt(e.target.id.split("-")[2]);
    console.log(index);

    projects[projectIndex.value].swapToDos(index, index - 1);
    console.log("Item index:", index);
    drawProject(projects[projectIndex.value], projectIndex.value);
    // Call function to increase priority for the item at this index
  }

  if (e.target && e.target.id.includes("priority-down")) {
    // Handle priority down click
    console.log("Priority Down button clicked:", e.target.id);
    const index = parseInt(e.target.id.split("-")[2]);
    console.log(index);

    projects[projectIndex.value].swapToDos(index, index + 1);

    console.log("Item index:", index);
    drawProject(projects[projectIndex.value], projectIndex.value);
    // Call function to decrease priority for the item at this index
  }

  if (e.target && e.target.id.includes("todo-complete")) {
    const index = parseInt(e.target.id.split("-")[2]);
    console.log(index);
    projects[projectIndex.value].toggleCheckbox(index);
    drawProject(projects[projectIndex.value], projectIndex.value);
  }

  // delete todo
  if (e.target && e.target.id.includes("todo-delete")) {
    const index = parseInt(e.target.id.split("-")[2]);
    projects[projectIndex.value].deleteToDoAtIndex(index);
    drawProject(projects[projectIndex.value], projectIndex.value);
  }
});

const projectToDos = document.getElementById("project-todos");
// projectToDos.addEventListener("click", (e) => {
//   let target = e.target;
// });

export { Project, projects, setElementVisibility, toggleElementVisibility };
