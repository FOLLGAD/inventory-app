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
	DrawerNavigator,
} from 'react-navigation';

import ActionButton from 'react-native-action-button';

import ItemList from '../components/ItemList';
import ContainerList from '../components/ContainerList';

let DrawerNav = DrawerNavigator({
	ItemList: { screen: ItemList },
	ContainerList: { screen: ContainerList },
});

export default function Inventory() {
	return (
		// <View>
		<DrawerNav />
		// {/* <ActionButton buttonColor="rgb(231,76,60)" onPress={() => console.log("Heyyoo!!")} /> */}
		// </View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});