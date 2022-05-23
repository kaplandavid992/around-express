const router = require('express').Router();
const { getCards, addCard, deleteCard } = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', addCard);
router.delete('/cards/:cardId', deleteCard);
module.exports = router;

