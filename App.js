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

import Inventory from './src/views/Inventory';
import AppLogin from './src/views/AppLogin';

import reducers from './src/reducers';

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

class App extends Component {
	render() {
		let isLoggedIn = false;
		console.log(store);
		return (
			<Provider store={store}>
				{isLoggedIn ? <CodeInput screenProps={{ onInput: this.handleInput }} /> : <AppLogin />}
			</Provider>
		);
	}
}

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