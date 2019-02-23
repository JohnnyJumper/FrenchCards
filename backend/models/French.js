const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FrenchCard = new Schema(
	{
		cardText: String,
		answer: String,
		wrongAnswer: String,
		answeredCorrectly: Number,
		answeredIncorrectly: Number,
		learned: Boolean,
		left: String,
		right: String
	},
	{timestamps: true}
);

module.exports = mongoose.model('FrenchCard', FrenchCard);