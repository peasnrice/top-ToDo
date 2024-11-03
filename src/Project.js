// Project.js

// define project factory
function Project(title, description) {
  let todoArray = [];

  return { title, description, todoArray };
}

// define projectArray
const projectArray = [Project];

// find key elements on the page to watch
const projectFormBtn = document.getElementById("create-project-btn");
const projectFormContainer = document.getElementById(
  "project-create-form-container"
);
const submitProjectBtn = document.getElementById("submit-project-btn");
const projectDescriptionInput = document.getElementById("project-description");
const projectTitleInput = document.getElementById("project-title");

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

submitProjectBtn.addEventListener("click", (event) => {
  // prevent submit default behaviour
  event.preventDefault();

  // get target from event
  let target = event.target;

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
    projectArray.push(newProject);
    setElementVisibility(projectFormContainer, false);
    setElementVisibility(projectFormBtn, true);
    projectTitleInput.value = "";
    projectDescriptionInput.value = "";
  }
});

const cancelProjectBtn = document.getElementById("cancel-project-btn");

cancelProjectBtn.addEventListener("click", () => {
  setElementVisibility(projectFormContainer, false);
  setElementVisibility(projectFormBtn, true);
  projectTitleInput.value = "";
  projectDescriptionInput.value = "";
});

function drawProjects() {
  // hid project card container
}
