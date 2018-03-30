// @flow

import React, { Component } from 'react';

import {
	StyleSheet,
	Text,
	View,
	Right,
} from 'react-native';

import {
	Fab,
	Content,
	Icon,
	Container,
	Body,
} from 'native-base';

import { connect } from 'react-redux';

import List from '../components/List';

import { fetchItems } from '../fetchers';

class ItemList extends Component {
	constructor(props) {
		super(props);

		this.onFetch = this.onFetch.bind(this)
	}
	async onFetch() {
		let data = await fetchItems();
		return data;
	}
	componentDidMount() {
		this.onFetch();
	}
	renderItem(item) {
		return (
			<Body>
				<Text style={styles.header}>
					{item.itemType ? item.itemType.name : 'Unknown itemtype'}
				</Text>
				<Text>
					{item.container ? item.container.name : 'No container'}
				</Text>
			</Body>
		)
	}
	render() {
		return (
			<Container>
				<Content>
					<List
						listPress={item => {
							this.props.navigation.navigate('Item', { item })
						}}
						onFetch={this.onFetch.bind(this)}
						renderItem={this.renderItem}
						data={this.props.items}
					/>
				</Content>
				<View>
					<Fab
						position='bottomRight'
						onPress={() => this.props.navigation.navigate('NewItem')}
					>
						<Icon name='add' />
					</Fab>
				</View>
			</Container>
		)
	}
}

const mapStateToProps = ({ items }) => ({
	items,
})

export default connect(mapStateToProps)(ItemList)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	header: {
		fontSize: 18,
	},
});