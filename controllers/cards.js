const Card = require('../models/card');
const mongoose = require('mongoose');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong' });
  }
};

const addCard = async (req, res) => {
  console.log(req.user._id);
  const { name, link } = req.body;
  const owner = {_id:req.user._id}
  const likes =[];
  const createdAt = Date.now();
   await Card.create({ name, link, owner, likes, createdAt })
    .then(card =>{ res.send({ data: card })
  }
    )
    .catch(() => res.status(500).send({ message: 'An error has occurred on the server' }));
};

const deleteCard = async (req, res) => {
  await Card.deleteOne({ id: req.params.cardId })
   .then(card => res.send({ data: card }))
   .catch(() => res.status(500).send({ message: 'An error has occurred on the server' }))
}

const likeCard = async (req, res) =>{
  await Card.findByIdAndUpdate( req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
  { new: true },
  )
  .then(card => res.send({ data: card }))
  .catch(() => res.status(500).send({ message: 'An error has occurred on the server' }))
};

const dislikeCard = async (req, res) =>  await Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // remove _id from the array
  { new: true },
)
.then(card => res.send({ data: card }))
  .catch(() => res.status(500).send({ message: 'An error has occurred on the server' }));

module.exports = { getCards, addCard, deleteCard, likeCard , dislikeCard };


