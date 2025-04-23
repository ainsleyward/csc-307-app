// backend.js
import express from "express";
import cors from "cors";
import userService from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const { name, job } = req.query;
  userService.getUsers(name, job)
    .then(users => res.send({ users_list: users }))
    .catch(err => res.status(500).send(err));
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  userService.findUserById(id)
    .then(user => {
      if (!user) {
        res.status(404).send("User not found.");
      } else {
        res.send(user);
      }
    })
    .catch(err => res.status(500).send(err));
});

  app.post("/users", (req, res) => {
    const user = req.body;
    userService.addUser(user)
      .then(savedUser => res.status(201).send(savedUser))
      .catch(err => res.status(400).send(err.message));
  });
   

  app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
  
    userService.deleteUserById(id)
      .then(deletedUser => {
        if (!deletedUser) {
          res.status(404).send({ message: "User not found." });
        } else {
          res.status(204).send(); // success, no content
        }
      })
      .catch(err => res.status(500).send(err.message));
  });  
  
  
app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});