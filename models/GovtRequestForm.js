const mongoose = require('mongoose');


const GovtRequestFormSchema = mongoose.Schema({
    name: { type: String,  },
    email: { type: String,  },
    mobile: { type: String, },
    whatsapp: { type: String,  },
    address: { type: String,},
    jobDetails: { type: String, },
    agree: { type: Boolean, default: false } ,
    status: {
      type: String,
      enum: ['Request Received', 'Viewed', 'Waiting for Platform', 'Completed', 'Cancelled'],
      default: 'Request Received',
    },
    
  }, {
    timestamps: true
  });

module.exports = mongoose.model('GovtRequestForm', GovtRequestFormSchema);
