// @flow

import React, { Component } from 'react';

import {
	StyleSheet,
	Text,
	View,
	FlatList,
	TouchableOpacity,
} from 'react-native';

import {
	Icon,
	Card,
	CardItem,
	Content,
} from 'native-base';

export default class List extends Component {
	state = {
		isRefreshing: false,
	};
	constructor(props) {
		super(props);

		this.fetch = this.fetch.bind(this);
		this.renderItem = this.renderItem.bind(this);
	}
	fetch() {
		this.setState({ isRefreshing: true });

		this.props.onFetch()
			.then(response => {
				this.setState({ isRefreshing: false });
			});
	}
	componentWillMount() {
		this.fetch();
	}
	renderItem({ item }) {
		return (
			<CardItem key={item._id}>
				<TouchableOpacity onPress={() => this.props.listPress && this.props.listPress(item)}>
					{this.props.renderItem(item)}
				</TouchableOpacity>
			</CardItem>
		)
	}
	render() {
		return (
			<Card>
				<FlatList data={this.props.data} renderItem={this.renderItem} refreshing={this.state.isRefreshing} onRefresh={this.fetch} />
			</Card>
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