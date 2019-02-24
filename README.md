# FrenchCards

Demo application for learning french words. A card swiping system with french-English and english-french words. Swipe to right or left. ! mistake and scores are zeroed out.

# Installation
 you will need a mongo db connected to it. create a file keys at ./backend/config/keys.js and put there 

module.exports = {
	mongoURL: "${YOUR_MONGO_DBLINK}"
}

# Launch

 to start the server you can cd backend && yarn start. 
 to start the client you need cd client && yarn start It will open a development server with expo giving you the QR code you will need to  scan inside the expo app on your phone

Connect with expo to see what is what.
