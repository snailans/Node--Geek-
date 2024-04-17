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

const generateHomePageHTML = (counter) => {
  return `<h1>Домашняя страница</h1><p>Просмотров: ${counter}</p><a href="/about">About</a>`;
};

const generateAboutPageHTML = (counter) => {
  return `<h1>About</h1><p>Просмотров: ${counter}</p><a href="/">Домашняя страница</a>`;
};

app.get("/", (req, res) => {
  counterData["/"] = (counterData["/"] || 0) + 1;
  saveCounterData();
  const html = generateHomePageHTML(counterData["/"]);
  res.send(html);
});

app.get("/about", (req, res) => {
  counterData["/about"] = (counterData["/about"] || 0) + 1;
  saveCounterData();
  const html = generateAboutPageHTML(counterData["/about"]);
  res.send(html);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});