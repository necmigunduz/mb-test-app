import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    userID: {
		type: String
	},
	brand: {
		type: String,
		required: true
	},
	productName: {
		type: String,
		required: true
	},
	color: {
		type: String
	},
    description: {
        type: String,
        min: 10,
        max: 300
    },
    price: {
        type: Int
    },
    amount: {
        type: Int
    }
})