const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

const filePath = path.join(__dirname, "users.json");

function readUsersFromFile() {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    } else {
      throw error;
    }
  }
}

function writeUsersToFile(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf8");
}

app.use(express.json());

app.get("/", (req, res) => {
  const users = readUsersFromFile();
  res.json(users);
});

app.get("/users", (req, res) => {
  const users = readUsersFromFile();
  res.json(users);
});

app.post("/users", (req, res) => {
  const users = readUsersFromFile();
  const newUser = req.body;
  users.push(newUser);
  writeUsersToFile(users);
  res.json(newUser);
});

app.put("/users/:id", (req, res) => {
  const users = readUsersFromFile();
  const userId = req.params.id;
  const updatedUser = req.body;

  const index = users.findIndex((user) => user.id === userId);
  if (index !== -1) {
    users[index] = updatedUser;
    writeUsersToFile(users);
    res.json(updatedUser);
  } else {
    res.status(404).send("User not found");
  }
});

app.get("/users/:id", (req, res) => {
  const users = readUsersFromFile();
  const userId = req.params.id;

  const user = users.find((user) => user.id === userId);

  if (!user) {
    return res.status(404).send("User not found");
  }

  res.json(user);
});

app.delete("/users/:id", (req, res) => {
  const users = readUsersFromFile();
  const userId = req.params.id;

  const filteredUsers = users.filter((user) => user.id !== userId);

  if (filteredUsers.length < users.length) {
    writeUsersToFile(filteredUsers);
    return res.send("User deleted successfully");
  } else {
    return res.status(404).send("User not found");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});