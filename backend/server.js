const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//importing models here :-
const UserProjects = require('./models/userProjects');
const Project = require('./models/createProject');
const User = require('./models/userInfo');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/DBMS', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(error => console.error('Could not connect to MongoDB', error));

const db = mongoose.connection;


const PORT=5000;
//post user information :-
app.post('/user',(req,res)=>{
  const {userID,name,email,password} =req.body;
  const user=new User({userID,name,email,password});
  console.log(req.body);
  user.save((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send('Project saved successfully.');
    }
  });
})

//to find all project id of a userId
app.get('/projects/:userID', (req, res) => {
  const userID = req.params.userID;
  UserProjects.findOne({ userID: userID }, (err, userProjects) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!userProjects) {
      return res.status(404).send('No user found with that ID');
    }
    res.send(userProjects.projects);
  });
});



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
  const {creatorId,projectName,projectId,creatorName,Description,Team,MaxSize,Duration,Technology,Applicants}=req.body.data;
  console.log("recieved data ",req.body.data);
  const project = new Project({creatorId,projectName,projectId,creatorName,Description,Team,MaxSize,Duration,Technology,Applicants});
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