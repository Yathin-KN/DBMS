const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: String,
    description: String,
    roles:[String],
    applicants:[String],
    id: Number,
    maxSize: Number,
  });


 const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
