// Project.js
import { ToDo } from "./ToDo.js";

// Create some sample todos
const sampleTodos = [
  new ToDo(
    "Create Wireframes",
    "Design wireframes for the homepage and key pages.",
    "2024-11-01",
    "2024-11-10",
    "blue",
    "high",
    "Use Figma for wireframing.",
    false
  ),
  new ToDo(
    "Backend API Development",
    "Develop RESTful APIs for user authentication and data handling.",
    "2024-11-02",
    "2024-11-20",
    "green",
    "medium",
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

  return { title, description, addToDoToProject, getToDos };
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

cancelProjectBtn.addEventListener("click", () => {
  setElementVisibility(projectFormContainer, false);
  setElementVisibility(projectFormBtn, true);
  projectTitleInput.value = "";
  projectDescriptionInput.value = "";
});

export { Project, projects, setElementVisibility, toggleElementVisibility };
