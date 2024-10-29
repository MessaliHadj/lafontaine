const express = require('express')
const Family = require('../models/family')
let router = express.Router()

router.get('', (req, res)=> {
  Family.findAll({attributes: ['id', 'name'], raw: true})
    .then( families => res.json({data: families}) )
    .catch( err => res.status(500).json({ message: 'Database Error', error: err}))
})

router.get('/:id', (req, res)=> {
  let familyId = parseInt(req.params.id)

  if(!familyId) return res.status(400).json({ message: 'Missing paramater' })

  Family.findOne({ where: {id: familyId}, attributes: ['id', 'name'], raw: true })
    .then( family => {
      return !family ? res.status(404).json({ message: 'This Family does not exist !' }) : res.json({ data: family }) 
    })
    .catch( err => res.status(500).json({ message: 'Database Error', error: err}))
})

router.put('', async (req, res) => {
  const name = req.body.name;
  if (!name) return res.status(400).json({ message: 'Missing data' });

  const newFamily = { name };
  try {
    const family = await Family.findOne({ where: { name: name } });
    if (family) return res.status(400).json({ message: 'This family already exists' })

    const createdFamily = await Family.create(newFamily);
    res.json({ message: 'Family successfully created', data: createdFamily })
  } catch (err) {
    res.status(500).json({ message: 'Database Error', error: err });
  }
});

router.patch('/:id', async (req, res) => {
  const familyId = parseInt(req.params.id);

  if (!familyId) return res.status(400).json({ message: 'Missing parameter' });

  try {
    const family = await Family.findOne({ where: { id: familyId } });
    if (!family) return res.status(404).json({ message: 'This Family does not exist!' });

    await Family.update(req.body, { where: { id: familyId } });

    const updatedFamily = await Family.findOne({ where: { id: familyId }, raw: true });

    res.json({ message: 'Family successfully updated', data: updatedFamily });
  } catch (err) {
    res.status(500).json({ message: 'Database Error', error: err });
  }
});


router.post('/untrash/:id', (req, res)=> {
  let familyId = parseInt(req.params.id)

  if(!familyId) return res.status(400).json({ message: 'Missing paramater' })

  Family.restore({ where: {id: familyId} })
    .then( family => {
      return !family ? res.status(404).json({ message: 'This family does not exist !' }) : 
      res.status(204).json({}) 
    })
    .catch( err => res.status(500).json({ message: 'Database Error', error: err}))
})

router.delete('/trash/:id', (req, res) => {
  let familyId = parseInt(req.params.id);

  if (!familyId) return res.status(400).json({ message: 'Missing parameter' });

  Family.destroy({ where: { id: familyId } })
    .then(family => {
      return !family ? res.status(404).json({ message: 'This family does not exist!' }) : 
      res.status(204).json({});
    })
    .catch(err => res.status(500).json({ message: 'Database Error', error: err }));
});

router.delete('/:id', (req, res)=> {
  let familyId = parseInt(req.params.id)

  if(!familyId) return res.status(400).json({ message: 'Missing paramater' })

  Family.destroy({ where: {id: familyId}, force: true })
    .then( family => {
      return !family ? res.status(404).json({ message: 'This family does not exist !' }) : 
      res.status(204).json({}) 
    })
    .catch( err => res.status(500).json({ message: 'Database Error', error: err}))
})

module.exports = router