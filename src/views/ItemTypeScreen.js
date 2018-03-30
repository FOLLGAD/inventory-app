// @flow

import React, { Component } from 'react';

import {
	Platform,
	StyleSheet,
	View,
	ToastAndroid,
	DatePickerAndroid,
	TouchableOpacity,
} from 'react-native';

import {
	Icon,
	Card,
	CardItem,
	Text,
	Content,
	Button,
	Container,
} from 'native-base';

import { deleteItemType } from '../api'
import { fetchItemTypes } from '../fetchers'

export default class ItemTypeScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		let { params } = navigation.state
		return {
			title: params ? params.itemType.name : 'Item type',
			headerRight: (
				<Button iconRight onLongPress={() => toast('Delete')} transparent onPress={() => {
					deleteItemType(params.itemType._id)
						.then(() => {
							fetchItemTypes()
							navigation.goBack()
						})
						.catch(err => {
							ToastAndroid.show(err.toString(), ToastAndroid.LONG)
						})
				}}>
					<Icon name='trash' />
				</Button>
			),
		}
	}
	delete = () => {
		deleteItemType(this.props.itemType._id)
	}
	render() {
		let itemType = this.props.navigation.state.params.itemType
		return (
			<Container>
				{itemType.propertyTypes.map(d => (
					<Text style={styles.bigText}>
						<Text style={styles.bold}>
							{d.name}:
						</Text> {d.type}
					</Text>
				))}
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		flex: 1,
		backgroundColor: '#F5FCFF',
	},
	bold: {
		fontWeight: 'bold',
	},
	bigText: {
		fontSize: 18,
	}
});
