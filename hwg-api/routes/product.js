const express = require('express')
const Product = require('../models/product')
const Family = require('../models/family')
let router = express.Router()

router.get('', (req, res)=> {
  Product.findAll({
    include: [{ 
      model: Family, 
      attributes: [['id', 'familyId'], 'name'] 
    }],
    raw: true,
    nest: true
  })
    .then(products => {
      const formattedData = products.map(product => ({
        id: product.id,
        name: product.name,
        family: {
          familyId: product.Family.familyId,
          name: product.Family.name
        },
        description: product.description,
        price: product.price,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        deletedAt: product.deletedAt
      }));

      return res.json({ data: formattedData });
    })
    .catch( err => res.status(500).json({ message: 'Database Error', error: err}))
})

router.get('/:id', (req, res) => {
  let productId = parseInt(req.params.id);

  if (!productId) return res.status(400).json({ message: 'Missing parameter' });

  Product.findOne({
    where: { id: productId },
    include: [{ 
     model: Family, 
     attributes: [['id', 'familyId'], 'name'] 
    }],
    raw: true,
    nest: true
  })
    .then(product => {
      if (!product) return res.status(404).json({ message: 'This product does not exist!' });

      const formattedData = {
        id: product.id,
        name: product.name,
        family: {
          familyId: product.Family.familyId,
          name: product.Family.name
        },
        description: product.description,
        price: product.price,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        deletedAt: product.deletedAt
      };

      return res.json({ data: formattedData });
    })
    .catch(err => res.status(500).json({ message: 'Database Error', error: err }));
});

router.put('', async (req, res) => {
  const { name, familyId, description, price } = req.body;
  if (!name || !familyId || !price) return res.status(400).json({ message: 'Missing data' });

  const newProduct = { name, familyId, description, price };
  try {
    const product = await Product.findOne({ where: { name: name } });
    if (product) return res.status(400).json({ message: 'This product number already exists' })

    const createdProduct = await Product.create(newProduct);
    res.json({ message: 'Product successfully created', data: createdProduct })
  } catch (err) {
    res.status(500).json({ message: 'Database Error', error: err });
  }
});

router.patch('/:id', async (req, res) => {
  const productId = parseInt(req.params.id);

  if (!productId) return res.status(400).json({ message: 'Missing parameter' });

  try {
    const product = await Product.findOne({ where: { id: productId } });
    if (!product) return res.status(404).json({ message: 'This product does not exist!' });

    await Product.update(req.body, { where: { id: productId } });

    const updatedProduct = await Product.findOne({ where: { id: productId }, raw: true });

    res.json({ message: 'product successfully updated', data: updatedProduct });
  } catch (err) {
    res.status(500).json({ message: 'Database Error', error: err });
  }
});


router.post('/untrash/:id', (req, res)=> {
  let productId = parseInt(req.params.id)

  if(!productId) return res.status(400).json({ message: 'Missing paramater' })

  Product.restore({ where: {id: productId} })
    .then( product => {
      return !product ? res.status(404).json({ message: 'This product does not exist !' }) : 
      res.status(204).json({}) 
    })
    .catch( err => res.status(500).json({ message: 'Database Error', error: err}))
})

router.delete('/trash/:id', (req, res) => {
  let productId = parseInt(req.params.id);

  if (!productId) return res.status(400).json({ message: 'Missing parameter' });

  Product.destroy({ where: { id: productId } })
    .then(product => {
      return !product ? res.status(404).json({ message: 'This product does not exist!' }) : 
      res.status(204).json({});
    })
    .catch(err => res.status(500).json({ message: 'Database Error', error: err }));
});

router.delete('/:id', (req, res)=> {
  let productId = parseInt(req.params.id)

  if(!productId) return res.status(400).json({ message: 'Missing paramater' })

  Product.destroy({ where: {id: productId}, force: true })
    .then( product => {
      return !product ? res.status(404).json({ message: 'This product does not exist !' }) : 
      res.status(204).json({}) 
    })
    .catch( err => res.status(500).json({ message: 'Database Error', error: err}))
})

module.exports = router