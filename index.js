const express = require("express");

const server = express();

server.use(express.json());

const projects = [{ id: "1", title: "Novo projeto", tasks: [] }];
//Consulta lista de projetos
server.get("/projects", (req, res) => {
  return res.json(projects);
});
//Cria novo projeto
server.post("/projects", (req, res) => {
  const { id, title } = req.body;
  const { tasks } = req.body;

  projects.push({ id, title, tasks });
  return res.json(projects);
});
//Cria task para projeto específico
server.post("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects[id - 1].tasks.push(title);
  return res.json(projects);
});
//Edita projeto
server.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const { tasks } = req.body;

  projects[id - 1] = { id, title, tasks };

  return res.json(projects);
});

//Deleta projeto
server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  projects.splice(id - 1, 1);

  return res.json(projects);
});

server.listen(3000);
