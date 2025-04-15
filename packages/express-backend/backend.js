// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;


const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspiring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    },
    {
        "id": "qwe123",
        "job": "Zookeeper",
        "name": "Cindy"
    }
  ]
};

const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
  };
  
const findUsersByNameJob = (name, job) => {
    return users["users_list"].filter(
      (user) => user["name"] === name && user["job"] === job
    );
  };

  const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);
  
  app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(result);
    }
  });

  const addUser = (user) => {
    users["users_list"].push(user);
    return user;
  };

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
    const {name, job} = req.query;
    if (name !== undefined && job !== undefined) {
        const result = findUsersByNameJob(name, job);
        res.send({ users_list: result });
      } else if (name !== undefined) {
        const result = findUserByName(name);
        res.send({ users_list: result });
      } else {
        res.send(users);
      }
  });

  app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.send();
  });

  app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    const index = users["users_list"].findIndex(user => user.id === id);

    if (index !== -1) {
        users["users_list"].splice(index, 1);
        res.status(204).send({message: 'User with id ${id} deleted.'});
    } else {
        res.status(404).send({message: "User not found."});
    };
  });

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});