//UI.js

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
      drawProject(projects[index]);
    });
    projectCards.appendChild(projectCard);
  });
}

// drawProject function
function drawProject(project) {
  projectContainer.innerHTML = "";

  const projectDetails = document.createElement("div");
  projectDetails.classList.add("project-details");
  const projectTitle = document.createElement("h3");
  projectTitle.innerText = project.title;
  const projectDescription = document.createElement("p");
  projectDescription.innerText = project.description;

  projectDetails.appendChild(projectTitle);
  projectDetails.appendChild(projectDescription);
  projectContainer.appendChild(projectDetails);

  // draw todos
  const projectToDos = document.createElement("div");
  projectToDos.setAttribute("id", "project-todos");

  project.getToDos().forEach((todo) => {
    const todoElement = document.createElement("div");
    todoElement.classList.add("todo");

    const priorityButtons = document.createElement("div");
    priorityButtons.classList.add("priority-buttons");
    priorityButtons.innerHTML = "<button>U</button><button>D</button>";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "todo-complete";
    checkbox.id = "todo-complete";
    checkbox.checked = todo.complete;

    const todoTitle = document.createElement("p");
    todoTitle.classList.add("todo-title");
    todoTitle.innerText = todo.title;

    const todoDescription = document.createElement("p");
    todoDescription.classList.add("todo-descriptions");
    todoDescription.innerText = todo.description;

    const todoDueDate = document.createElement("p");
    todoDueDate.classList.add("todo-due-date");
    todoDueDate.innerText = todo.due_date;

    const todoPriority = document.createElement("p");
    todoPriority.classList.add("todo-priority");
    todoPriority.innerText = todo.priority;

    const todoNotes = document.createElement("p");
    todoNotes.classList.add("todo-notes");
    todoNotes.innerText = todo.notes;

    todoElement.appendChild(priorityButtons);
    todoElement.appendChild(checkbox);
    todoElement.appendChild(todoTitle);
    todoElement.appendChild(todoDescription);
    todoElement.appendChild(todoDueDate);
    todoElement.appendChild(todoPriority);
    todoElement.appendChild(todoNotes);

    projectToDos.appendChild(todoElement);
  });

  projectContainer.appendChild(projectToDos);
}

export { drawProjects, drawProject };
