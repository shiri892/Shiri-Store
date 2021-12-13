const express = require('express');
const app = express();
const path = require("path")
let cors = require('cors');
let port = 3001;

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json());
app.use(cors());

app.use( (req , res , next)  => {
    console.log(req.url + " " + (new Date().toTimeString()))
    next()
})

app.use('/api/users',require('./data-access-layer/users-dal'))

app.use('/api/products',require('./data-access-layer/products-dal'))

app.use('/api/carts', require('./data-access-layer/carts-dal'))

app.listen(port, () => { console.log(`server open on port ${3001}`) })