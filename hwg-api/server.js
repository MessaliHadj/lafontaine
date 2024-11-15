const express = require('express');
const cors = require('cors');

const DB = require('./db.config')
const refreshTask = require('./tasks/refresh')
const user_router = require('./routes/user')
const family_router = require('./routes/family')
const order_router = require('./routes/order')
const product_router = require('./routes/product')
const menu_router = require('./routes/menu')
const auth_router = require('./routes/auth')
const signup_router = require('./routes/signup')
const logMiddleware = require('./middleware/logMiddleware')
const errorMiddleware = require('./middleware/errorMiddleware')

const app = express();
const port = process.env.SERVER_PORT;

const routers = [
  { path: '/api/v1/user', route: user_router },
  { path: '/api/v1/family', route: family_router },
  { path: '/api/v1/order', route: order_router },
  { path: '/api/v1/product', route: product_router },
  { path: '/api/v1/menu', route: menu_router },
  { path: '/api/v1/login', route: auth_router },
  { path: '/api/v1/signup', route: signup_router }
];

app.use(cors({
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(logMiddleware)

app.get('/api/v1', (req, res) => {
  res.send('Hello world');
});

routers.forEach(({ path, route }) => app.use(path, route));

app.get('*', (req, res) => {
  res.status(404).send('Resource not found.');
});

app.use(errorMiddleware)

DB.authenticate()
  .then(()=> console.log('The connection to database well done.'))
  .then(()=> app.listen(port, err => err ? 
    console.error('Api-Server startup error:', err)
     : 
    console.log(`Api-Server listening on port ${port}`)
  ))
  .catch(err => console.error('Database error : ', err))