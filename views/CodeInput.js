import React, { Component } from 'react';

import {
	StyleSheet,
	Text,
	TextInput,
	View,
	NavigatorIOS,
} from 'react-native';

import { TabNavigator } from 'react-navigation';

import NumberInput from '../components/NumberInput';
import ScanQR from '../components/ScanQR';

function onSuccess(e) {
	console.log(e)
}

const ScanScreen = () => (
	// <View>
		<ScanQR onSuccess={onSuccess} />
	// </View>
)
const ManInputScreen = () => (
	// <View>
		<NumberInput onSubmit={onSuccess} />
	// </View>
)

const RootTabs = TabNavigator({
	Scan: {
		screen: ScanScreen,
	},
	Input: {
		screen: ManInputScreen,
	},
});

export default RootTabs;

const styles = StyleSheet.create({
	centerText: {
		flex: 1,
		fontSize: 18,
		padding: 32,
		color: '#777',
	},

	textBold: {
		fontWeight: '500',
		color: '#000',
	},

	buttonText: {
		fontSize: 21,
		color: 'rgb(0,122,255)',
	},

	buttonTouchable: {
		padding: 16,
	},
});