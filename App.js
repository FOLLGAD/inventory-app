// @flow

import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	ToastAndroid,
	AsyncStorage,
} from 'react-native';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import Main from './src/views/Main';

import reducers from './src/reducers';


const store = createStore(reducers, applyMiddleware(thunkMiddleware));

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Main />
			</Provider>
		);
	}
}

export default App;

const styles: object = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});