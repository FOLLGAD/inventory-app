// @flow

import React, { Component } from 'react';

import {
	StyleSheet,
	Text,
	View,
	Right,
	TouchableOpacity,
} from 'react-native';

import {
	Fab,
	Content,
	Icon,
	Container,
} from 'native-base';

import { connect } from 'react-redux';

import List from '../components/List';

import { fetchItemTypes } from '../fetchers'

class ItemTypeList extends Component {
	constructor(props) {
		super(props);
	}
	async onFetch() {
		let data = await fetchItemTypes();
		return data;
	}
	componentDidMount() {
		this.onFetch();
	}
	renderItem(itemType) {
		return (
			<View>
				<Text style={styles.header}>
					{itemType.name}
				</Text>
				<Text>
					{itemType.propertyTypes.length} {itemType.propertyTypes.length === 1 ? 'property' : 'properties'}
				</Text>
			</View>
		)
	}
	render() {
		return (
			<Container>
				<Content>
					<List
						listPress={itemType => {
							console.log(itemType)
							this.props.navigation.navigate('ItemType', { itemType })
						}}
						onFetch={this.onFetch.bind(this)}
						renderItem={this.renderItem}
						data={this.props.itemTypes}
					/>
				</Content>
				<View>
					<Fab
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
	},
});