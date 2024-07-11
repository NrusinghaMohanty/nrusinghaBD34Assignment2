import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
let PORT = 3000;


// Exercise 1
let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 }
];

const addToCart = (tasks, taskId, text, priority) => {
  tasks.push({taskId, text, priority})
  return tasks
}

app.get('/tasks/add',(req, res) => {
  let taskId = parseInt(req.query.taskId)
  let text = req.query.text
  let priority = parseFloat(req.query.priority)
  let result = addToCart(tasks, taskId, text, priority)
  res.json({ tasks: result })
})


//Exercise 2
app.get('/tasks',(req, res) => {
  res.json( tasks )
})


//Exercise 3
app.get('/tasks/sort-by-priority',(req, res) => {
  let taskCopy = tasks.slice()
  let result = taskCopy.sort((item1,item2) => item1.priority - item2.priority)
  res.json({ tasks:  result})
})


//Exercise 4
const editByPriority = (tasks, taskId, priority) => {
  for(let i=0; i < tasks.length; i++){
    if(tasks[i].taskId === taskId) {
      tasks[i].priority = priority;
    }
  }
  return tasks
}

app.get('/tasks/edit-priority',(req, res) => {
  let taskId = parseInt(req.query.taskId)
  let priority = parseInt(req.query.priority)
  let result = editByPriority(tasks, taskId, priority)
  res.json({ tasks:  result})
})


//Exercise 5
const editText = (tasks, taskId, text) => {
  for(let i=0; i < tasks.length; i++){
    if(tasks[i].taskId === taskId) {
      tasks[i].text = text;
    }
  }
  return tasks
}

app.get('/tasks/edit-text',(req, res) => {
  let taskId = parseInt(req.query.taskId)
  let text = req.query.text
  let result = editText(tasks, taskId, text)
  res.json({ tasks:  result})
})


//Exercise 6
app.get('/tasks/delete',(req, res) => {
  let taskId = parseInt(req.query.taskId)
  let result = tasks.filter((item) => item.taskId != taskId)
  res.json({ tasks:  result})
})


//Exercise 7
app.get('/tasks/filter-by-priority',(req, res) => {
  let priority = parseInt(req.query.priority)
  let result = tasks.filter((item) => item.priority === priority)
  res.json({ tasks:  result})
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});