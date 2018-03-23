// @flow

import React, { Component } from 'react';

import {
	Platform,
	StyleSheet,
	Text,
	View,
	ToastAndroid,
	TouchableOpacity,
} from 'react-native';

import {
	Icon,
	Card,
	CardItem,
	Content,
} from 'native-base';

import {
	DrawerNavigator,
	StackNavigator,
} from 'react-navigation';

import { connect } from 'react-redux';

import ItemList from '../components/ItemList';
import ItemTypeList from '../components/ItemTypeList';
import ItemScreen from '../components/ItemScreen';
import NewItemScreen from '../components/NewItemScreen';
import NewItemTypeScreen from '../components/NewItemTypeScreen';
import ContainerList from '../components/ContainerList';
import ScanQR from '../components/ScanQR';

let navOpts = (name) => ({ navigation }) => ({
	[name ? 'title' : 'uhhhh']: name,
	headerLeft: <Content onPress={() => navigation.navigate('DrawerOpen')}>
		{/* <Icon name={'menu'} type={'Entypo'} fontSize={20} style={{ fontSize: 20 }} /> */}
	</Content>
})

const ScannerStack = StackNavigator({
	Scanner: {
		screen: ScanQR,
		navigationOptions: navOpts('Scan'),
	},
	Item: {
		screen: ItemScreen,
	},
});
const ItemListStack = StackNavigator({
	ItemList: {
		screen: ItemList,
		navigationOptions: navOpts('Items'),
	},
	Item: {
		screen: ItemScreen,
	},
	NewItem: {
		screen: NewItemScreen,
	},
	NewItemType: {
		screen: NewItemTypeScreen,
	},
});
const ItemTypeListStack = StackNavigator({
	ItemTypeList: {
		screen: ItemTypeList,
		navigationOptions: navOpts('Item types'),
	},
	NewItemType: {
		screen: NewItemTypeScreen,
	},
});
const ContainerListStack = StackNavigator({
	ContainerList: {
		screen: ContainerList,
		navigationOptions: navOpts('Containers'),
	},
});

const DrawerNav = DrawerNavigator({
	Scanner: {
		screen: ScannerStack,
	},
	ItemList: {
		screen: ItemListStack,
	},
	ItemTypeList: {
		screen: ItemTypeListStack
	},
	ContainerList: {
		screen: ContainerListStack,
	},
}, {
		navigationOptions: ({ navigation }) => ({
			headerTitle: <Text>Header</Text>,
			headerLeft: <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}><Text>Menu</Text></TouchableOpacity>,
		}),
	});

import { setContainers, setItems, setItemTypes } from '../actions'
import { getContainers, getItems, getItemTypes } from '../api'

class Inventory extends Component {
	componentDidMount() {
		getContainers().then(this.props.dispatchContainers)
		getItems().then(this.props.dispatchItems)
		getItemTypes().then(this.props.dispatchItemTypes)
	}
	render() {
		return (
			<DrawerNav />
		)
	}
}

const mapDispatchToProps = dispatch => ({
	dispatchItemTypes: data => dispatch(setItemTypes(data)),
	dispatchItems: data => dispatch(setItems(data)),
	dispatchContainers: data => dispatch(setContainers(data)),
})

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default connect(() => ({}), mapDispatchToProps)(Inventory);