// @flow

import React, { Component } from 'react';

import {
	Platform,
	StyleSheet,
	Text,
	View,
	ToastAndroid,
} from 'react-native';

import {
	Icon,
	Content,
} from 'native-base';

import {
	DrawerNavigator,
	StackNavigator,
} from 'react-navigation';

import ActionButton from 'react-native-action-button';

import ItemList from '../components/ItemList';
import ContainerList from '../components/ContainerList';
import ScanQR from '../components/ScanQR';

let navOpts = (name) => ({ navigation }) => ({
	title: name,
	headerLeft: <Content onPress={() => navigation.navigate('DrawerOpen')}><Icon name={"menu"} type={'Entypo'} fontSize={20} style={{ fontSize: 20 }} /></Content>
})

const ScannerStack = StackNavigator({
	Scanner: {
		screen: ScanQR,
		navigationOptions: navOpts('Scan'),
	}
});
const ItemListStack = StackNavigator({
	ItemList: {
		screen: ItemList,
		navigationOptions: navOpts('Items'),
	},
});
const ContainerListStack = StackNavigator({
	ContainerList: {
		screen: ContainerList,
		navigationOptions: navOpts('Containers'),
	}
});

const DrawerNav = DrawerNavigator({
	Scanner: {
		screen: ScannerStack,
	},
	ItemList: {
		screen: ItemListStack,
	},
	ContainerList: {
		screen: ContainerListStack,
	},
}, {
		navigationOptions: ({ navigation }) => ({
			headerTitle: <Text>Header</Text>,
			headerLeft: <Text onPress={() => navigation.navigate('DrawerOpen')}>Menu</Text>,
		}),
	});

export default function Inventory() {
	return (
		<DrawerNav />
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});