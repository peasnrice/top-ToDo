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

projectFormBtn.addEventListener("click", () => {
  // toggle display of project form container
  projectFormContainer.classList.toggle("hidden");
});

submitProjectBtn.addEventListener("click", (event) => {
  // prevent submit default behaviour
  event.preventDefault();

  // get target from event
  let target = event.target;

  // create new project from form values
  const projectTitle = document.getElementById("project-title").value;
  const projectDescription = document.getElementById(
    "project-description"
  ).value;
  const newProject = Project(projectTitle, projectDescription);

  // push project to project array
  projectArray.push(newProject);
});
