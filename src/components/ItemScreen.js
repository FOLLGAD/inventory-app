// @flow

import React, { Component } from 'react';

import {
	Platform,
	StyleSheet,
	Text,
	View,
	ToastAndroid,
} from 'react-native';

export default class App extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<View>
				{this.props.screenProps.item ?
					(<View><Text><Text style={styles.bold}>Skåp:</Text> {this.props.screenProps.item.container}</Text>
					<Text><Text style={styles.bold}>Namn:</Text> {this.props.screenProps.item.name}</Text>
					<Text>{/* Break */}</Text>
					{this.props.screenProps.item.properties.map(d => <Text><Text style={styles.bold}>{d.type}: </Text>{d.value}</Text>)}</View>)
				: <Text>Loading</Text>}
			</View>
		);
	}
}

const styles: object = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	bold: {
		fontWeight: 'bold',
	},
});
