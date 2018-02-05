import React, { Component } from 'react';

import {
	Platform,
	StyleSheet,
	Text,
	View,
	ToastAndroid,
} from 'react-native';

import {
	StackNavigator,
} from 'react-navigation';

import CodeInput from '../components/CodeInput';
import ItemScreen from '../components/ItemScreen';

const App = StackNavigator({
	CodeInput: { screen: CodeInput },
	ItemScreen: { screen: ItemScreen },
});

export default App;

const styles: object = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});