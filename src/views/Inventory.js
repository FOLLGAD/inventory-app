// @flow

import React, { Component } from 'react';

import {
	Platform,
	StyleSheet,
	Text,
	View,
	ToastAndroid,
} from 'react-native';

import InventoryStack from '../components/InventoryStack';

import { lookupItem } from '../api';

export default class App extends Component {
	constructor(props) {
		super(props)

		this.state = { currentItem: null };

		this.handleInput = this.handleInput.bind(this);
	}
	handleInput(input) {
		ToastAndroid.show(`The code is ${input}`, ToastAndroid.LONG);
		lookupItem(input)
			.then(d => {
				this.setState({ currentItem: d });
			})
			.catch(console.error);
	}
	render() {
		return (
			<InventoryStack screenProps={{ onInput: this.handleInput, item: this.state.currentItem }} />
		)
	}
}

const styles: object = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});