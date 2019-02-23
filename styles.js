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
		backgroundColor: 'whitesmoke',
		justifyContent: 'center',
		alignItems: 'center'
	},

	cardPlaceholder: {
		height: window.height - (topBar.height + topBar.margin + 50),
		width: window.width,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
	},

	cardView: {
		width: '90%',
		height: '90%',
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center'
	},

	animatedContainer: {
		height: 500,
		width: window.width,
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',

	}	
});