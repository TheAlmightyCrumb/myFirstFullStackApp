const express = require('express');
const app = express();
app.use(express.json());

let products = [
    {
        id: 'Pizza',
        author: 'Maggie',
        notes: 'NO VEGAN CHEESE!!!'
    },
    {
        id: 'Tortillas',
        author: 'Ben',
        notes: 'Get the burrito-sized ones'
    },
    {
        id: 'Black Rum',
        author: 'Ben',
        notes: 'It goes well with the burrito'
    }
];

app.get('/products', (req, res) => {
    res.send(products);
});

app.get('/products/:productId', (req, res) => {
    for (let product of products) {
        if (product.id === req.params.productId) {
            res.send(product);
        }
    }
});

app.post('/addProduct', (req, res) => {
    products.push(req.body);
    res.send(req.body);
});


app.listen(3002);