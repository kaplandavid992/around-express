const Cards = require('../models/card')

const getCards = async (req, res) => {
  try {
    const cards = await Cards.find({});
    res.send(cards);
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong' });
  }
};

const addCard = async (req, res) => {
  const { name, link, owner, likes, createdAt } = req.body;
   await Cards.create({ name, link, owner, likes, createdAt })
    .then(card => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Error' }));
};

const deleteCard = async (req, res) => {
  await Cards.deleteOne({ id: req.params.cardId })
   .then(card => res.send({ data: card }))
   .catch(() => res.status(500).send({ message: 'Error' }))
}

module.exports.addCard = (req, res) => {
  console.log(req.user._id); // _id will become accessible
};
module.exports = { getCards, addCard, deleteCard };


//module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
//   req.params.cardId,
//   { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
//   { new: true },
// )

// module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
//   req.params.cardId,
//   { $pull: { likes: req.user._id } }, // remove _id from the array
//   { new: true },
// )