const express = require('express')
const { Op } = require('sequelize')
const OrderProduct = require('../models/order.product.product')
let router = express.Router()

router.get('/order-product', (req, res)=> {
  OrderProduct.findAll({raw: true})
    .then( order => res.json({data: order}) )
    .catch( err => res.status(500).json({ message: 'Database Error', error: err}))
})

router.get('/order-product/:id', (req, res)=> {
  let orderId = parseInt(req.params.id)

  if(!orderId) return res.status(400).json({ message: 'Missing paramater' })

  OrderProduct.findOne({ where: {id: orderId}, raw: true })
    .then( order => {
      return !order ? res.status(404).json({ message: 'There is no commande with this id !' }) : res.json({ data: Family }) 
    })
    .catch( err => res.status(500).json({ message: 'Database Error', error: err}))
})

router.put('/order-product', async (req, res) => {
  const userId = req.body.userId;
  if (!userId) return res.status(400).json({ message: 'Missing data' });

  const newOrder = { userId };
  try {
    const order = await OrderProduct.findOne({ where: { userId: userId }, status: { [Op.not]: 'in progress' } });
    if (order) return res.status(400).json({ message: 'There is an order in progress for this user. Do you want to change it ?' })

    const createdOrder = await OrderProduct.create(newOrder);
    res.json({ message: 'Order successfully created', data: createdOrder })
  } catch (err) {
    res.status(500).json({ message: 'Database Error', error: err });
  }
});

router.patch('/order-product/:id', async (req, res) => {
  const orderId = parseInt(req.params.id);

  if (!orderId) return res.status(400).json({ message: 'Missing parameter' });

  try {
    const order = await OrderProduct.findOne({ where: { id: orderId } });
    if (!order) return res.status(404).json({ message: 'This order does not exist!' });

    await OrderProduct.update(req.body, { where: { id: orderId } });

    const updatedOrder = await OrderProduct.findOne({ where: { id: orderId }, raw: true });

    res.json({ message: 'Order successfully updated', data: updatedOrder });
  } catch (err) {
    res.status(500).json({ message: 'Database Error', error: err });
  }
});


router.post('/order-product/untrash/:id', (req, res)=> {
  let orderId = parseInt(req.params.id)

  if(!orderId) return res.status(400).json({ message: 'Missing paramater' })

  OrderProduct.restore({ where: {id: orderId} })
    .then( order => {
      return !order ? res.status(404).json({ message: 'This order does not exist !' }) : 
      res.status(204).json({}) 
    })
    .catch( err => res.status(500).json({ message: 'Database Error', error: err}))
})

router.delete('/order-product/trash/:id', (req, res) => {
  let orderId = parseInt(req.params.id);

  if (!orderId) return res.status(400).json({ message: 'Missing parameter' });

  OrderProduct.destroy({ where: { id: orderId } })
    .then(order => {
      return !order ? res.status(404).json({ message: 'This order does not exist!' }) : 
      res.status(204).json({});
    })
    .catch(err => res.status(500).json({ message: 'Database Error', error: err }));
});

router.delete('/order-product/:id', (req, res)=> {
  let orderId = parseInt(req.params.id)

  if(!orderId) return res.status(400).json({ message: 'Missing paramater' })

  OrderProduct.destroy({ where: {id: orderId}, force: true })
    .then( order => {
      return !order ? res.status(404).json({ message: 'This order does not exist !' }) : 
      res.status(204).json({}) 
    })
    .catch( err => res.status(500).json({ message: 'Database Error', error: err}))
})

module.exports = router