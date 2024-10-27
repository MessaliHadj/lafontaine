const express = require('express')
const Menu = require('../models/menu')
let router = express.Router()

router.get('/menu', (req, res)=> {
  Menu.findAll({raw: true})
    .then( menu => res.json({data: menu}) )
    .catch( err => res.status(500).json({ message: 'Database Error', error: err}))
})

router.get('/menu/:id', (req, res)=> {
  let menuId = parseInt(req.params.id)

  if(!menuId) return res.status(400).json({ message: 'Missing paramater' })

  Menu.findOne({ where: {id: menuId}, raw: true })
    .then( menu => {
      return !menu ? res.status(404).json({ message: 'This menu does not exist !' }) : res.json({ data: menu }) 
    })
    .catch( err => res.status(500).json({ message: 'Database Error', error: err}))
})

router.put('/menu', async (req, res) => {
  const { name, description, price } = req.body;
  if (!name || !price) return res.status(400).json({ message: 'Missing data' });

  const newMenu = { name, description, price };
  try {
    const menu = await Menu.findOne({ where: { name: name } });
    if (menu) return res.status(400).json({ message: 'This menu already exists' })

    const createdMenu = await Menu.create(newMenu);
    res.json({ message: 'Menu successfully created', data: createdMenu })
  } catch (err) {
    res.status(500).json({ message: 'Database Error', error: err });
  }
});

router.patch('/menu/:id', async (req, res) => {
  const menuId = parseInt(req.params.id);

  if (!menuId) return res.status(400).json({ message: 'Missing parameter' });

  try {
    const menu = await Menu.findOne({ where: { id: menuId } });
    if (!menu) return res.status(404).json({ message: 'This menu does not exist!' });

    await Menu.update(req.body, { where: { id: menuId } });

    const updatedMenu = await Menu.findOne({ where: { id: menuId }, raw: true });

    res.json({ message: 'menu successfully updated', data: updatedMenu });
  } catch (err) {
    res.status(500).json({ message: 'Database Error', error: err });
  }
});


router.post('/menu/untrash/:id', (req, res)=> {
  let menuId = parseInt(req.params.id)

  if(!menuId) return res.status(400).json({ message: 'Missing paramater' })

  Menu.restore({ where: {id: menuId} })
    .then( menu => {
      return !menu ? res.status(404).json({ message: 'This menu does not exist !' }) : 
      res.status(204).json({}) 
    })
    .catch( err => res.status(500).json({ message: 'Database Error', error: err}))
})

router.delete('/menu/trash/:id', (req, res) => {
  let menuId = parseInt(req.params.id);

  if (!menuId) return res.status(400).json({ message: 'Missing parameter' });

  Menu.destroy({ where: { id: menuId } })
    .then(menu => {
      return !menu ? res.status(404).json({ message: 'This menu does not exist!' }) : 
      res.status(204).json({});
    })
    .catch(err => res.status(500).json({ message: 'Database Error', error: err }));
});

router.delete('/menu/:id', (req, res)=> {
  let menuId = parseInt(req.params.id)

  if(!menuId) return res.status(400).json({ message: 'Missing paramater' })

  Menu.destroy({ where: {id: menuId}, force: true })
    .then( menu => {
      return !menu ? res.status(404).json({ message: 'This menu does not exist !' }) : 
      res.status(204).json({}) 
    })
    .catch( err => res.status(500).json({ message: 'Database Error', error: err}))
})

module.exports = router