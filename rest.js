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