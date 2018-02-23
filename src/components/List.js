// @flow

import React, { Component } from 'react';

import {
	StyleSheet,
	Text,
	View,
	FlatList,
} from 'react-native';

export default class List extends Component {
	state = {
		data: [],
		isRefreshing: false,
	};
	constructor(props) {
		super(props);

		this.fetch = this.fetch.bind(this);
	}
	fetch() {
		this.setState({ isRefreshing: true });

		this.props.onFetch()
			.then(response => {
				this.setState({ data: response, isRefreshing: false });
			});
	}
	componentWillMount() {
		this.fetch();
	}
	render() {
		return (
			<FlatList data={this.state.data} renderItem={this.props.renderItem} refreshing={this.state.isRefreshing} onRefresh={this.fetch} />
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