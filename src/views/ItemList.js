// @flow

import React, { Component } from 'react';

import {
	StyleSheet,
	View,
	Right,
	RefreshControl,
	Text,
} from 'react-native';

import {
	Fab,
	Content,
	Card,
	CardItem,
	Icon,
	Container,
} from 'native-base';

import { connect } from 'react-redux';

import List from '../components/List';

import { fetchItems } from '../fetchers';

class ItemList extends Component {
	constructor(props) {
		super(props);

		this.state = { isRefreshing: false };
	}
	onFetch = async () => {
		this.setState({ isRefreshing: true })
		let data = await fetchItems();
		this.setState({ isRefreshing: false })
		return data;
	}
	componentDidMount() {
		this.onFetch();
	}
	renderItem(item) {
		return (
			<View>
				<Text style={styles.header}>
					{item.itemType ? item.itemType.name : 'Okänd artikeltyp'}
				</Text>
				<Text style={styles.body}>
					{item.container ? item.container.name : 'Inget skåp'}
				</Text>
			</View>
		)
	}
	render() {
		return (
			<Container>
				<Content refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.onFetch} />}>
					<Card>
						<List
							listPress={item => {
								this.props.navigation.navigate('Item', { item })
							}}
							onFetch={this.onFetch.bind(this)}
							renderItem={this.renderItem}
							data={this.props.items}
						/>
					</Card>
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
		color: '#555',
	},
	body: {
		color: '#555',
	},
});