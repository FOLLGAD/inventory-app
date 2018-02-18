// @flow

import React, { Component } from 'react';

import {
	Platform,
	StyleSheet,
	Text,
	View,
	ToastAndroid,
} from 'react-native';

import { getItem } from '../api';

import List from './List';

export default class Inventory extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<List />
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});