// index.js
import "./styles-reset.css";
import "./styles.css";
import { Project, projects, setElementVisibility } from "./Project";
import { drawProjects, drawProject } from "./UI";

let selectedProjectIndex = 0;

function updateSelectedIndex(newIndex) {
  selectedProjectIndex = newIndex;
}

console.log("loaded");

// Initial rendering
drawProjects(projects, selectedProjectIndex, updateSelectedIndex);
drawProject(projects[selectedProjectIndex], selectedProjectIndex);

const projectTitleInput = document.getElementById("project-title");
const projectDescriptionInput = document.getElementById("project-description");
const submitProjectBtn = document.getElementById("submit-project-btn");
const projectFormBtn = document.getElementById("create-project-btn");
const projectForm = document.getElementById("project-form");
const cancelProjectBtn = document.getElementById("cancel-project-btn");

const projectFormContainer = document.getElementById(
  "project-create-form-container"
);

submitProjectBtn.addEventListener("click", (event) => {
  // prevent submit default behaviour
  event.preventDefault();

  if (
    projectTitleInput.value.length <= 20 &&
    projectTitleInput.value.length > 0
  ) {
    // create new project from form values
    const projectTitle = document.getElementById("project-title").value;
    const projectDescription = document.getElementById(
      "project-description"
    ).value;
    const newProject = Project(projectTitle, projectDescription);

    // push project to project array
    projects.push(newProject);
    setElementVisibility(projectFormBtn, true);
    setElementVisibility(projectForm, false);
    setElementVisibility(cancelProjectBtn, false);
    projectTitleInput.value = "";
    projectDescriptionInput.value = "";

    console.log(`project index: ${projects.length - 1}`);

    updateSelectedIndex(projects.length - 1);

    drawProjects(projects, projects.length - 1, updateSelectedIndex);
    drawProject(projects[projects.length - 1], selectedProjectIndex);
  } else {
    alert("Project Title cannot be blank!");
  }
});
