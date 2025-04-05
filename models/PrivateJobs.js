const mongoose = require('mongoose');


const PrivatejobSchema = mongoose.Schema({
  JobDegination: { type: String, },
  organization: { type: String,  },
  salary:  { type: String, },
  experience: { type: String, },
  batch: { type: String, },
  Qualification:{ type: String,  },
  location:{ type: String,  },
  applyLink: { type: String, }
}, {
  timestamps: true,
});


module.exports = mongoose.model('PrivateJob', PrivatejobSchema);
