const router = require('express').Router();
const { getJsonFromFile } = require('../helpers/files')

router.get('/users', async (req,res)=>{
  const users = await getJsonFromFile('./data/users.json');
  res.send(users);
})

router.get('/users/:id', (req,res)=>{
    res.send(`user ${req.params.id}`)
})

module.exports = router;