const card = require('../models/card');

const createCard = async (req, res) => {
  try {
    const { cardName , linksName } = req.body;

    const newCard = new card({
        cardName , linksName
      
    });

    const savedCard = await newCard.save();
    res.status(201).json(savedCard);
  } catch (error) {
    res.status(500).json({ message: 'Error creating card', error: error.message });
  }
};

const getCardById = async (req, res) => {
  try {
    const cardId = req.params.id;

    // Find the card by ID
    const newCard = await card.findById(cardId); // Ensure the model is correctly referenced as 'Card'

    if (!newCard) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.status(200).json(newCard);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching card', error: error.message });
  }
};


// Get all jobs
const getAllCard = async (req, res) => {
  try {
    const cards = await card.find();
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cards', error: error.message });
  }
};

const updateCard = async (req, res) => {
  try {
    const cardId = req.params.id;
    const updatedData = req.body;

    // Find the card by ID and update it with the new data
    const updatedCard = await card.findByIdAndUpdate(
      cardId,
      { $set: updatedData }, 
      { new: true, runValidators: true } 
    );

    if (!updatedCard) {
      return res.status(404).json({ message: 'card not found' });
    }

    res.status(200).json({ message: 'card updated successfully', card: updatedCard });
  } catch (error) {
    res.status(500).json({ message: 'Error updating card', error: error.message });
  }
};



const deleteCard = async (req, res) => {
  try {
    const cardId = req.params.id;

    const deletedCard = await card.findByIdAndDelete(cardId);

    if (!deletedCard) {
      return res.status(404).json({ message: 'card not found' });
    }

    res.status(200).json({ message: 'card deleted successfully', card: deletedCard });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting card', error: error.message });
  }
};


module.exports = { createCard, getAllCard, deleteCard ,updateCard ,getCardById};