const express = require('express');
const cors = require('cors');
const DB = require('./db.config')
const user_router = require('./routes/user')
const family_router = require('./routes/family')
const order_router = require('./routes/order')
const product_router = require('./routes/product')
const menu_router = require('./routes/menu')

const app = express();
const port = process.env.SERVER_PORT;

const routers = [
  user_router, 
  family_router, 
  order_router, 
  product_router, 
  menu_router
]

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.get('/api/v1', (req, res) => {
  res.send('Hello world');
});

routers.forEach(router => {
  app.use('/api/v1', router)
});

app.get('*', (req, res) => {
  res.status(404).send('Resource not found.');
});

DB.authenticate()
  .then(()=> console.log('The connection to database well done.'))
  .then(()=> {
    app.listen(port, (err) => {
      if (err) {
        console.error('Api-Server startup error:', err);
      } else {
        console.log(`Api-Server listening on port ${port}`);
      }
    });
  })
  .catch(err => console.log('Database error : ', err))