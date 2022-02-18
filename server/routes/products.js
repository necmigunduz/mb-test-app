import express from "express";

const router = express.Router();
// Import product model
import Product from '../models/Product'; 

// Create a product
router.post('/:uid', async(req, res) => {
    const product = new Product({
        userID: req.params.uid,
        brand: req.body.brand,
        productName: req.body.productName,
        color: req.body.color,
        description: req.body.description,
        price: req.body.price,
        amount: req.body.amount
    });

    try {
        const savedProduct = await product.save();
        res.json({savedProduct});
    } catch(err) {
        res.json({message: err});
    }
});

// Get all products for a specific user
router.get('/:uid/', async(req, res) => {
    try {
        const products = await Product.find({userID: {$eq: req.params.uid}});
        console.log(products);
        res.json({products});
    } catch(err) {
        res.json({message: err});
    }
});

// Get specific product of a user
router.get('/:uid/:productID', async(req, res) => {
    try {
        const product = await Product.findById(req.params.productID);
        if(product.userID === req.params.uid) {
            res.json(product)
        } else {
            res.json({message: "Incorrect user!"})
        }
    } catch(err) {
        res.json({message: err});
    }
});

// Update a specific product of a user
router.patch('/:uid/:productID', async (req, res) => {
    try {
        const updateProduct = await Product.updateOne({
            _id: req.params.productID,
            userID: { $eq: req.params.uid }
        },{
            $set: {
                brand: req.body.brand,
                productName: req.body.productName,
                color: req.body.color,
                description: req.body.description,
                price: req.body.price,
                amount: req.body.amount
            }
        });
        res.json(updateProduct);
    } catch(err) {
        res.json({message: err});
    }
});

// Delete a specific product of a user
router.delete('/:uid/:productID', async (req, res) => {
    try {
        const removedProduct = await Product.remove({_id: req.params.productID, userID: req.params.uid});
        res.json(removedProduct);
    } catch(err) {
        res.json({message: err})
    }
});

export default router;