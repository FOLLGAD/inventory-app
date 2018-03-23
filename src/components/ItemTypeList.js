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
} from 'native-base';

import { connect } from 'react-redux';

import List from './List';

import { getItemTypes } from '../api';

import { setItemTypes } from '../actions';

class ItemTypeList extends Component {
	constructor(props) {
		super(props);
	}
	async onFetch() {
		let itemTypes = await getItemTypes();
		this.props.dispatchItemTypes(itemTypes);
		return itemTypes;
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
					{itemType.propertyTypes.length} {itemType.propertyTypes.length === 1 ? 'attribut' : 'attributer'}
				</Text>
			</View>
		)
	}
	render() {
		return (
			<Container>
				<Content>
					<List
						listPress={item => {
							// this.props.navigation.navigate('Item', { item })
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
						<Icon name="share" />
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