const mongoose = require('mongoose');

const userProjectsSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  projects: [{ type: String, required: true }]
});


const UserProjects = mongoose.model('UserProjects', userProjectsSchema);

module.exports = UserProjects;
