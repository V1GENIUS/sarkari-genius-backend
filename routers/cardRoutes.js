const express = require('express');
const { createCard, getAllCard, deleteCard,updateCard ,getCardById} = require('../controllers/cardController');
const router = express.Router();

router.post('/create', createCard);
router.get('/', getAllCard);
router.delete('/:id', deleteCard);
router.put('/cards/:id', updateCard);
router.get('/:id', getCardById);


module.exports = router;
