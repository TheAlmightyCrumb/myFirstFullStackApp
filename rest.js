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

// Gets the full grocery-shopping list.
app.get('/products', (req, res) => {
    res.send(products);
});

// Gets a specific item by its id.
app.get('/product/:productId', (req, res) => {
    for (let product of products) {
        if (product.id === req.params.productId) {
            res.send(product);
        }
    }
});

// Add (or post) a new item to the list.
app.post('/product', (req, res) => {
    products.push(req.body);
    res.send(req.body);
});


// Edit an item from the list.
app.put('/product/:productId', (req, res) => {
    products.forEach((product, index) =>{
        if(product.id === req.params.productId) {
            products[index] = req.body;
            res.send(req.body);
        }
    });
});

// Delete an item from the list.
app.delete('/product/:productId', (req, res) => {
    products.forEach((product, index) => {
        if (product.id === req.params.productId) {
            products.splice(index, 1);
            res.send(`${req.params.productId} has been deleted`);
        }
    });
});


app.listen(3002);