const express = require("express");

const server = express();

server.use(express.json());

const projects = [];
//Middleware que checa se projeto existe

function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);
  if (!project) {
    return res.status(400).json({ error: "Project not found" });
  }
  return next();
}
let countRequests = 0;
//Middleware de log de requisições
function logRequest(req, res, next) {
  countRequests++;
  console.log(`Número de requisições: ${countRequests}`);

  return next();
}
//Cria novo projeto
server.post("/projects", logRequest, (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };
  projects.push(project);
  return res.json(projects);
});
//Cria task para projeto específico
server.post(
  "/projects/:id/tasks",
  logRequest,
  checkProjectExists,
  (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(p => p.id == id);

    project.tasks.push(title);

    return res.json(projects);
  }
);
//Consulta lista de projetos
server.get("/projects", logRequest, (req, res) => {
  return res.json(projects);
});
//Edita projeto
server.put("/projects/:id", logRequest, checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
});

//Deleta projeto
server.delete("/projects/:id", logRequest, checkProjectExists, (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex(index => index.id == id);

  projects.splice(projectIndex, 1);

  return res.json(projects);
});

server.listen(3000);
