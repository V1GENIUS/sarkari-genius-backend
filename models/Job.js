const mongoose = require('mongoose');

const feeSchema = mongoose.Schema({
  category: { type: String,  },
  amount: { type: Number, },
});


const ageLimitSchema = mongoose.Schema({
  min: { type: Number,  },
  max: { type: Number, },
  relaxation: { type: String },
});

const QualificationSchema = mongoose.Schema({
  eligibility: { type: String,  },
  Note:{ type: String,  }
});

// Sub-schema for important dates
const importantDateSchema = mongoose.Schema({
  notificationDate: { type: String,  },
  startDate: { type: String,},
  lastDate: { type: String,},
 
});


const jobLocationSchema = mongoose.Schema({
  location:{type: String , }
})


const jobSchema = mongoose.Schema({
  postName: { type: String, },
  organization: { type: String,  },
  vacancy :{type: Number,},
  salary:  { type: String, },
  importantDates: [importantDateSchema], 
  fees: [feeSchema],
  ageLimit: ageLimitSchema,
  selectionProcess:{ type: String, },
  Qualification:QualificationSchema,
  jobLocation:jobLocationSchema,
  documentDetails:{ type: String, } , 
  officialPdfLink: { type: String,  },
  websiteLink: { type: String,  }
}, {
  timestamps: true,
});


module.exports = mongoose.model('Job', jobSchema);
