const express = require('express')
const { Op } = require('sequelize')
const Order = require('../models/order')
let router = express.Router()

router.get('', (req, res)=> {
  Order.findAll({raw: true})
    .then( order => res.json({data: order}) )
    .catch( err => res.status(500).json({ message: 'Database Error', error: err}))
})

router.get('/:id', (req, res)=> {
  let orderId = parseInt(req.params.id)

  if(!orderId) return res.status(400).json({ message: 'Missing paramater' })

  Order.findOne({ where: {id: orderId}, raw: true })
    .then( order => {
      return !order ? res.status(404).json({ message: 'There is no commande with this id !' }) : res.json({ data: Family }) 
    })
    .catch( err => res.status(500).json({ message: 'Database Error', error: err}))
})

router.put('', async (req, res) => {
  const userId = req.body.userId;
  if (!userId) return res.status(400).json({ message: 'Missing data' });

  const newOrder = { userId };
  try {
    const order = await Order.findOne({ where: { userId: userId }, status: { [Op.is]: 'in progress' } });
    if (order) return res.status(400).json({ message: 'There is an order in progress for this user. Do you want to change it ?' })

    const createdOrder = await Order.create(newOrder);
    res.json({ message: 'Order successfully created', data: createdOrder })
  } catch (err) {
    res.status(500).json({ message: 'Database Error', error: err });
  }
});

router.patch('/:id', async (req, res) => {
  const orderId = parseInt(req.params.id);

  if (!orderId) return res.status(400).json({ message: 'Missing parameter' });

  try {
    const order = await Order.findOne({ where: { id: orderId } });
    if (!order) return res.status(404).json({ message: 'This order does not exist!' });

    await Order.update(req.body, { where: { id: orderId } });

    const updatedOrder = await Order.findOne({ where: { id: orderId }, raw: true });

    res.json({ message: 'Order successfully updated', data: updatedOrder });
  } catch (err) {
    res.status(500).json({ message: 'Database Error', error: err });
  }
});


router.post('/untrash/:id', (req, res)=> {
  let orderId = parseInt(req.params.id)

  if(!orderId) return res.status(400).json({ message: 'Missing paramater' })

  Order.restore({ where: {id: orderId} })
    .then( order => {
      return !order ? res.status(404).json({ message: 'This order does not exist !' }) : 
      res.status(204).json({}) 
    })
    .catch( err => res.status(500).json({ message: 'Database Error', error: err}))
})

router.delete('/trash/:id', (req, res) => {
  let orderId = parseInt(req.params.id);

  if (!orderId) return res.status(400).json({ message: 'Missing parameter' });

  Order.destroy({ where: { id: orderId } })
    .then(order => {
      return !order ? res.status(404).json({ message: 'This order does not exist!' }) : 
      res.status(204).json({});
    })
    .catch(err => res.status(500).json({ message: 'Database Error', error: err }));
});

router.delete('/:id', (req, res)=> {
  let orderId = parseInt(req.params.id)

  if(!orderId) return res.status(400).json({ message: 'Missing paramater' })

  Order.destroy({ where: {id: orderId}, force: true })
    .then( order => {
      return !order ? res.status(404).json({ message: 'This order does not exist !' }) : 
      res.status(204).json({}) 
    })
    .catch( err => res.status(500).json({ message: 'Database Error', error: err}))
})

module.exports = router