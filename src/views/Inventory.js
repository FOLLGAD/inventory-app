import React, { Component } from 'react';

import {
	Platform,
	StyleSheet,
	Text,
	View,
	ToastAndroid,
	ScrollView,
	AsyncStorage,
} from 'react-native';

import {
	Icon,
	Card,
	CardItem,
	Content,
	Button,
} from 'native-base';

import {
	DrawerNavigator,
	StackNavigator,
	DrawerItems,
	SafeAreaView,
} from 'react-navigation';

import { connect } from 'react-redux';
import store from '../store'

import ItemList from '../views/ItemList';
import ItemScreen from '../views/ItemScreen';
import NewItemScreen from '../views/NewItemScreen';

import ItemTypeList from '../views/ItemTypeList';
import ItemTypeScreen from '../views/ItemTypeScreen';
import NewItemTypeScreen from '../views/NewItemTypeScreen';

import ContainerList from '../views/ContainerList';
import ContainerScreen from '../views/ContainerScreen';
import NewContainerScreen from '../views/NewContainerScreen';

import ScanQR from '../views/ScanQR';
import Profile from '../views/Profile';

let navOpts = name => ({ navigation }) => ({
	[name ? 'title' : 'uhhhh']: name,
	headerLeft: <Button iconLeft transparent onPress={() => navigation.navigate('DrawerOpen')}>
		<Icon name='menu' />
	</Button>
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
	ItemType: {
		screen: ItemTypeScreen,
	},
});
const ContainerListStack = StackNavigator({
	ContainerList: {
		screen: ContainerList,
		navigationOptions: navOpts('Containers'),
	},
	NewContainer: {
		screen: NewContainerScreen,
	},
	Container: {
		screen: ContainerScreen,
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
	Profile: {
		screen: Profile,
	},
	"Log out": {
		screen: () => {
			AsyncStorage.removeItem('loginToken')
			store.dispatch(login({}))
			return null
		}
	},
}, {
		navigationOptions: ({ navigation }) => ({
			headerTitle: <Text>Header</Text>,
			headerLeft: (
				<Button iconLeft transparent onPress={() => navigation.navigate('DrawerOpen')}>
					<Icon name='menu' style={{ marginLeft: 18 }} />
				</Button>
			),
		}),
		// contentComponent: CustomDrawerContentComponent,
	});

// const CustomDrawerContentComponent = (props) => (
// 	<ScrollView>
// 		<SafeAreaView style={styles.container}>
// 			<DrawerItems {...props} />
// 			<Text>Ayy lmao</Text>
// 		</SafeAreaView>
// 	</ScrollView>
// );

import { fetchContainers, fetchItems, fetchItemTypes } from '../fetchers'
import { login } from '../actions';

class Inventory extends Component {
	componentDidMount() {
		fetchContainers()
		fetchItems()
		fetchItemTypes()
	}
	render() {
		return (
			<DrawerNav />
		)
	}
}

export default connect()(Inventory);