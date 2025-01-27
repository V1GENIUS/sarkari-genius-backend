const mongoose = require("mongoose");


const LinkSchema = mongoose.Schema({
  linkName: { type: String,  },
  linkURL: { type: String,  }
 
});

const cardSchema = new mongoose.Schema({
  cardName: { type: String,  },
  linksName: [LinkSchema]
 
  
}, {
  timestamps: true,
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
