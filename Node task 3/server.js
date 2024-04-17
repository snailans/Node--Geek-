"use strict";

const express = require("express");
const fs = require("fs");

const app = express();

let counterData = {};
try {
  counterData = JSON.parse(fs.readFileSync("counter.json", "utf8"));
} catch (err) {
  console.error("Ошибка при чтении файла счетчика:", err);
}

const saveCounterData = () => {
  fs.writeFileSync(
    "counter.json",
    JSON.stringify(counterData),
    "utf8",
    (err) => {
      if (err) {
        console.error("Ошибка при сохранении файла счетчика:", err);
      }
    }
  );
};

app.get("/", (req, res) => {
  counterData["/"] = (counterData["/"] || 0) + 1;
  saveCounterData();
  res.send(
    `<h1>Домашняя страница.</h1><p>Просмотров: ${counterData["/"]}</p><a href="/about">Страница "About"</a>`
  );
});

app.get("/about", (req, res) => {
  counterData["/about"] = (counterData["/about"] || 0) + 1;
  saveCounterData();
  res.send(
    `<h1>Страница "About".</h1><p>Просмотров: ${counterData["/about"]}</p><a href="/">Домашняя страница</a>`
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});