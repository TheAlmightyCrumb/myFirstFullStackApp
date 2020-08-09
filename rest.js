const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));
let products = [
    {
        id: 'Pizza',
        author: 'Maggie',
        notes: 'NO VEGAN CHEESE!!!',
        finished: 'true'
    },
    {
        id: 'Tortillas',
        author: 'Ben',
        notes: 'Get the burrito-sized ones',
        finished: 'true'
    },
    {
        id: 'Black Rum',
        author: 'Ben',
        notes: 'It goes well with the burrito',
        finished: 'false'
    }
];

// Gets the full grocery-shopping list.
app.get('/products', (req, res) => {
    res.send(products);
});
// sending html page
app.get('/', (req, res) => {
    res.send('An alligator approaches!');
});

// Gets a specific item by its id.
app.get('/product/:productId', (req, res) => {
    let found = false;
    for (let product of products) {
        if (product.id === req.params.productId) {
            res.send(product);
            found = true;
        }
    }
    if(!found)
    {
        res.send('404 no such product');
    }
});

// Add (or post) a new item to the list.
app.post('/product', (req, res) => {
    products.push(req.body);
    res.send(req.body);
});


// Edit an item from the list.
app.put('/product/:productId', (req, res) => {
    let found = false;
    products.forEach((product, index) =>{
        if(product.id === req.params.productId) {
            products[index].id = req.body.id;
            products[index].author = req.body.author;
            products[index].notes = req.body.notes;
            found = true;
            res.send(req.body);
        }
    });
    if(!found)
    {
        res.send('404 no such product');
    }
});
// make finished true
app.put('/product/:productId/true', (req, res) => {
    let found = false;
    products.forEach((product, index) =>{
        if(product.id === req.params.productId) {
            products[index].finished = 'true';
            found = true;
            res.send(req.body);
        }
    });
    if(!found)
    {
        res.send('404 no such product');
    }
});
// make finish false
app.put('/product/:productId/false', (req, res) => {
    let found = false;
    products.forEach((product, index) =>{
        if(product.id === req.params.productId) {
            products[index].finished = 'false';
            found = true;
            res.send(req.body);
        }
    });
    if(!found)
    {
        res.send('404 no such product');
    }
});

// Delete an item from the list.
app.delete('/product/:productId', (req, res) => {
    let found = false;
    products.forEach((product, index) => {
        if (product.id === req.params.productId) {
            products.splice(index, 1);
            found = true;
            res.send(`${req.params.productId} has been deleted`);
        }
    });
    if(!found)
    {
        res.send('404 no such product');
    }
});


app.listen(3002);