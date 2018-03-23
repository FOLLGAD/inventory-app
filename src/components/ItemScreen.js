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
} from 'native-base';

import { borrowItem } from '../api'

export default class ItemScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		let { params } = navigation.state
		return {
			title: params ? params.item.itemType.name : 'Artikel'
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
			<View style={styles.container}>
				<Text style={styles.bigText}><Text style={styles.bold}>Skåp:</Text> {item.container ? item.container.name : "Inget skåp"}</Text>

				<Text style={styles.bigText}>{/* Break */}</Text>

				{item.properties.map(d => <Text key={d.propertyType.name} style={styles.bigText}><Text style={styles.bold}>{d.propertyType.name}: </Text>{d.value}</Text>)}

				<Text style={styles.bigText}>{/* Break */}</Text>

				<Button block onPress={this.borrow}>
					<Text>Låna</Text>
				</Button>
			</View>
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
