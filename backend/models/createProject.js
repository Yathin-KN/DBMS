const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  creatorId: { type: String, default: "" },
  projectName: { type: String, default: "" },
  projectId: { type: String, default: "" },
  creatorName: { type: String, default: "" },
  Description: { type: String, default: "" },
  Team: [{ type: String, default: "" }],
  MaxSize: { type: Number, default: 0 },
  Duration: { type: Number, default: 0 },
  Technology: [{ type: String, default: "" }],
  Applicants: [{ type: String, default: "" }],
  Time: { type: Date, default: Date.now }
});
 const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
