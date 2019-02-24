const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser'); 

const API_PORT = process.env.PORT || 6357;

const app = express();
const router = express.Router();

const FrenchCard = require('./models/French');

const {mongoURL} = require('./config/keys');
console.log('mongoURL ',mongoURL );
mongoose.connect(
	mongoURL,
	{ useNewUrlParser: true}
);

const db = mongoose.connection;

db.once("open", () => console.log('connected to database'));

db.on("error", () => console.log('error with mongoDb'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());




router.get('/cards/:amount', (req, res) => {
	const amount = parseInt(req.params.amount);
	FrenchCard.aggregate([{$sample: {size: amount}}], (err, docs) => {
		console.log('got request!');
		if (err) return res.json({success: false, err});
		res.json({success: true, data: docs});
	});
});

router.post('/update/:id', (req, res) => {
	const {id} = req.params;
	const {isCorrect} = req.body;
if (!id) return res.json({success: false, err: "wrong id", data: {id, ...req.body}});
	FrenchCard.findById(id, (err, doc) => {
		if (err) return res.json({success: false, err, data: {id, ...req.body}});
		if (isCorrect) doc.answeredCorrectly += 1; else doc.answeredIncorrectly += 1;
		doc.save(err => {
			if (err) return res.json({success: false, err, data: {id, ...req.body}});
			return res.json({success: true, data: doc});
		});
	});
})


router.post('/newcard', (req, res) => {
	const {cardText, answer, wrongAnswer, englishWrongAnswer} = req.body;

	if (!cardText || !answer || !wrongAnswer || !englishWrongAnswer) return res.json({success: false, err: "wrong input", data: req.body});
	const newCard = new FrenchCard();
	const reverseCard = new FrenchCard();

	newCard.cardText = cardText;
	newCard.answer = answer;
	newCard.wrongAnswer = englishWrongAnswer;
	newCard.answeredCorrectly = 0;
	newCard.answeredIncorrectly = 0;
	newCard.learned = false;


	reverseCard.cardText = answer;
	reverseCard.answer = cardText;
	reverseCard.wrongAnswer = wrongAnswer;
	reverseCard.answeredCorrectly = 0;
	reverseCard.answeredIncorrectly = 0;
	reverseCard.learned = false;
	

	newCard.save(err => {
		if (err) return res.json({success: false, err, data: req.body});
		reverseCard.save(err => {
			if (err) return res.json({success: false, err, data: req.body});
				return res.json({success: true, data: {newCard, reverseCard}});
		});
	});

})





app.use('/api', router);






app.listen(API_PORT, () => console.log('starting server\n', `listening on ${API_PORT} port`));
