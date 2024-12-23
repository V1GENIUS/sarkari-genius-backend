const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    jobName: {
      type: String,
      required: [true, 'Job name is required'],
    },
    jobLink: {
      type: String,
      required: [true, 'Job link is required'],
      validate: {
        validator: function (v) {
          return /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(v);
        },
        message: 'Invalid URL format',
      },
    },
  },
  { timestamps: true }
);



module.exports = mongoose.model('Job', jobSchema);
