
const path = require('path');
const mustacheExpress = require('mustache-express');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let todos = [
  {task: "take out the trash", complete: true},
  {task: "feed the cats", complete: false},
  {task: "elect a different president", complete: false}
];

app.get("/", function (req, res) {
  res.render('index', { todos: todos });
});

app.post("/addItem", function (req, res) {
  req.body.complete = false;
  todos.push(req.body);
  res.redirect('/');
  // console.log(todos);
})

app.post("/complete", (req, res) => {
  // console.log(req.body.task);
  // console.log("Index: " + todos.findIndex((todo) => {
        // return todo.task === req.body.task;
      // }));
  todos[todos.findIndex((todo) => {
    return todo.task === req.body.task })].complete = true;
  res.redirect('/');
})

app.listen(3000, () => console.log('SHOW ME WHAT YOU GOT'));
