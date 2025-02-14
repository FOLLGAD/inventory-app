// @flow

import React, { Component } from 'react';

import {
	Platform,
	StyleSheet,
	View,
	ToastAndroid,
	DatePickerAndroid,
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

import { borrowItem, deleteItem } from '../api'
import { fetchItems } from '../fetchers'

import { toast } from '../utils'

export default class ItemScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		let { params } = navigation.state
		return {
			title: params ? params.item.itemType.name : 'Item',
			headerRight: (
				<Button iconRight onLongPress={() => toast('Delete')} transparent onPress={() => {
					deleteItem(params.item._id)
						.then(() => {
							fetchItems()
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
	borrow = () => {
		DatePickerAndroid.open({ minDate: Date.now() })
			.then(({ year, month, day }) => {
				let item = this.props.navigation.state.params.item
				borrowItem({ itemId: item._id, to: new Date(year, month, day) })
			})
	}
	render() {
		let item = this.props.navigation.state.params.item
		return (
			<Container>
				<Content>
					<Card>
						<CardItem button onPress={() => this.props.navigation.navigate('Container', { container: item.container })}>
							<Text style={styles.bigText}><Text style={styles.bold}>Container:</Text> {item.container ? item.container.name : 'No container'}</Text>
						</CardItem>

						{item.properties.map(d => (
							<CardItem key={d.propertyType.name}>
								<Text style={styles.bigText}>
									<Text style={styles.bold}>{d.propertyType.name}: </Text>
									{d.value}
								</Text>
							</CardItem>
						))}

						<CardItem>
							<Button block onPress={this.borrow}>
								<Text>Borrow</Text>
							</Button>
						</CardItem>
					</Card>
				</Content>
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
