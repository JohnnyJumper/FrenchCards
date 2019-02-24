import {StyleSheet} from 'react-native';
import dimensions from './constants/Layout';
const {window, topBar} = dimensions;


module.exports = StyleSheet.create({
	container: {
		backgroundColor: 'rgb(40,40,40)',
		flex: 1 
	},

	homeStyle: {
		flex: 1,
		backgroundColor: 'rgb(40,40,40)',
		justifyContent: 'center',
		alignItems: 'center'
	},

	topBar: {
		height: topBar.height,
		width: topBar.width,
		margin: topBar.margin,
		marginTop: 20,
		backgroundColor: 'whitesmoke',
		justifyContent: 'center',
		alignItems: 'center'
	},

	topBarText: {
		textAlign: 'center',
		width: '100%',
		fontSize: 35,
		fontWeight: '800'
	},

	cardPlaceholder: {
		height: window.height - (topBar.height + topBar.margin + 50),
		width: window.width,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
	},

	cardView: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 20,
	},

	cardText: {
		fontSize: 85
	},

	cardLeftText: {
		position: 'absolute',
		top: 50,
		left: 40,
		zIndex: 1000
	},


	animatedContainer: {
		height: 500,
		width: window.width,
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
	},
	left: {
		padding: 10,
		justifyContent: 'center',
		fontSize: 50
	}
});