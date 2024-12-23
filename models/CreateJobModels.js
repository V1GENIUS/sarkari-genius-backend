const mongoose = require('mongoose')

const CreatejobSchema = new mongoose.Schema({
    postName: { type: String, required: true },
    organization: { type: String, required: true },
    // importantDates: [
    //   {
    //     label: { type: String, required: true },
    //     date: { type: String, required: true },
    //   },
    // ],
    fees: [
      {
        category: { type: String, required: true },
        amount: { type: String, required: true },
      },
    ],
    ageLimit: {
      min: { type: String,  },
      max: { type: String,  },
      relaxation: { type: String,  },
    },
    eligibility: [
      {
        postName: { type: String, required: true },
        posts: { type: String, required: true },
        qualification: { type: String, required: true },
      },
    ],
  });
  
  module.exports = mongoose.model("CreateJob", CreatejobSchema);