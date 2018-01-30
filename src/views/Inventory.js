// @flow

import React, { Component } from 'react';

import {
	Platform,
	StyleSheet,
	Text,
	View,
	ToastAndroid,
} from 'react-native';

export default class App extends Component {
	handleInput(input) {
		ToastAndroid.show(`The code is ${input}`, ToastAndroid.LONG);
	}
	render() {
		return (
			<View>
				<CodeInput screenProps={{ onInput: this.handleInput }} />
			</View>
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
