// @flow

import React, { Component } from 'react';

import {
	StyleSheet,
	Text,
	View,
} from 'react-native';

import List from './List';

import { getItems } from '../api';

export default class ItemList extends Component {
	constructor(props) {
		super(props);
	}
	async onFetch() {
		return await getItems();
	}
	renderItem({ item }) {
		return <View key={item._id}><Text>{item.itemType.name}</Text></View>
	}
	render() {
		return (
			<List onFetch={this.onFetch} renderItem={this.renderItem} />
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