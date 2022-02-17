import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: {
		type: String,
		required: true,
		min: 6,
		max: 35
	},
	email: {
		type: String,
		required: true,
		min: 6,
		max: 35
	},
	password: {
		type: String,
		required: true,
		min: 6,
		max: 18
	},
	date: {
		type: Date,
		default: Date.now
	}
})

export default UserSchema;