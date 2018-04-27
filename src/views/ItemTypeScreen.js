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
					if (params.itemType.n_items === 0) {
						deleteItemType(params.itemType._id)
							.then(() => {
								fetchItemTypes()
								navigation.goBack()
							})
							.catch(err => {
								ToastAndroid.show(err.toString(), ToastAndroid.LONG)
							})
					} else {
						ToastAndroid.show("Can't delete an Item type with items bound to it", ToastAndroid.LONG)
					}
				}}>
					<Icon name='trash' style={params.itemType.n_items === 0 ? {} : { color: 'grey' }} />
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
				<Content>
					<Card>
						<Text></Text>
						{itemType.propertyTypes.map(d => (
							<CardItem key={d.name}>
								<Text style={styles.bold}>{d.name}: </Text><Text style={styles.bigText}>{d.type}</Text>
							</CardItem>
						))}
					</Card>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	bold: {
		fontWeight: 'bold',
	},
	bigText: {
		fontSize: 18,
	}
});
