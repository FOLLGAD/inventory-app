// @flow

import React, { Component } from 'react';

import {
	StyleSheet,
	View,
	Right,
	TouchableOpacity,
	RefreshControl,
	Text,
} from 'react-native';

import {
	Fab,
	Content,
	Icon,
	Container,
	Card,
	CardItem,
	Body,
} from 'native-base';

import { connect } from 'react-redux';

import List from '../components/List';

import { fetchItemTypes } from '../fetchers'

class ItemTypeList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isRefreshing: false,
		}
	}
	onFetch = async () => {
		this.setState({ isRefreshing: true })
		let data = await fetchItemTypes();
		this.setState({ isRefreshing: false })
		return data;
	}
	componentDidMount() {
		this.onFetch();
	}
	renderItem(itemType) {
		return (
			<Body>
				<Text style={styles.header}>
					{itemType.name}
				</Text>
				<Text style={{ color: "grey", fontSize: 12 }}>
					{itemType.n_items} items | {itemType.propertyTypes.length} {itemType.propertyTypes.length === 1 ? 'property' : 'properties'}
				</Text>
			</Body>
		)
	}
	render() {
		return (
			<Container>
				<Content refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.onFetch} />}>
					<Card>
						<List
							listPress={itemType => {
								this.props.navigation.navigate('ItemType', { itemType })
							}}
							onFetch={this.onFetch}
							renderItem={this.renderItem}
							data={this.props.itemTypes}
						/>
					</Card>
				</Content>
				<View>
					<Fab
						style={{ backgroundColor: "#ff000f" }}
						position='bottomRight'
						onPress={() => this.props.navigation.navigate('NewItemType')}
					>
						<Icon name='add' />
					</Fab>
				</View>
			</Container>
		)
	}
}

const mapStateToProps = ({ itemTypes }) => ({
	itemTypes
})
const mapDispatchToProps = dispatch => ({
	dispatchItemTypes: itemTypes => dispatch(setItemTypes(itemTypes)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemTypeList)

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