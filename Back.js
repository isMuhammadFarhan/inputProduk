// backend/server.js

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

let products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 }
];

app.get('/products', (req, res) => {
    res.json(products);
});
/* Sudah diperbaiki pak */

app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(product => product.id === id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

app.post('/products', (req, res) => {
    const newProduct = req.body;
    if (!newProduct.name || newProduct.name.trim() === '') {
        res.status(400).json({ message: 'Product name is required' });
        return;
    }
    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedProduct = req.body;
    const index = products.findIndex(product => product.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        res.json(products[index]);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

app.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    products = products.filter(product => product.id !== id);
    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
