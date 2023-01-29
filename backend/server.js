const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//importing models here :-
const UserProjects = require('./models/userProjects');
const Project = require('./models/createProject');


const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/DBMS', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(error => console.error('Could not connect to MongoDB', error));

const db = mongoose.connection;


const PORT=5000;
app.get('/',(req,res)=>{
    res.send("hello");
})

app.get("/projects", (req, res) => {
  Project.find({}, (err, projects) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(projects);
    }
  });
});

app.post('/', (req, res) => {
  const data=req.body;
  console.log(data);
  const project = new Project({
    name: data.name,
    description: data.description,
    roles: data.roles,
    applicants:data.applicants,
    id: data.id,
    maxSize: data.maxSize,
  });
  project.save((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send('Project saved successfully.');
    }
  });
  
});


//user projects post function:-
app.post('/user_projects', async (req, res) => {
  const { userID, projects } = req.body;
  const userProject = new UserProjects({ userID, projects });
  try {
    await userProject.save();
    res.status(201).send(userProject);
  } catch (error) {
    res.status(400).send(error);
  }
});


//listening
app.listen(PORT, () => {
    
    console.log(`Server is running on port ${PORT}`);
});