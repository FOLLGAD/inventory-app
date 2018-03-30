// @flow

import React, { Component } from 'react';

import {
	StyleSheet,
	Text,
	View,
	FlatList,
	TouchableOpacity,
	RefreshControl,
} from 'react-native';

import {
	Icon,
	Card,
	CardItem,
	Content,
	ListItem,
	List,
	Body,
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
			<Content refreshControl={this.props.onFetch ?
				<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.fetch} />
				: null}>
				<List>
					{
						this.props.data.length == 0 ?
							<Text style={styles.textComponent}>There is nothing to show</Text> :
							this.props.data.map(this.renderItem)
					}
				</List>
			</Content>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	textComponent: {
		textAlign: 'center',
		padding: 20,
	},
});