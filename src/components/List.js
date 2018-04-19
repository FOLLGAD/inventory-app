// @flow

import React, { Component } from 'react';

import {
	RefreshControl,
} from 'react-native';

import {
	Text,
	Icon,
	Card,
	CardItem,
	Container,
	Content,
	ListItem,
	List,
	Body,
	Header,
} from 'native-base';

export default class MyList extends Component {
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
		this.props.onFetch && this.fetch();
	}
	renderItem(item) {
		return (
			<ListItem key={item._id} onPress={() => this.props.listPress && this.props.listPress(item)}>
				{this.props.renderItem(item)}
			</ListItem>
		)
	}
	render() {
		return (
			<List
				dataArray={this.props.data}
				renderRow={this.renderItem}>
			</List>
		)
	}
}