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
	Body,
} from 'native-base';

import List from '../components/List'

import { connect } from 'react-redux'

import { fetchContainers } from '../fetchers'
import { deleteContainer } from '../api'

class ContainerScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		let { params } = navigation.state
		return {
			title: params ? params.container.name : 'Container',
			headerRight: (
				<Button transparent iconRight rounded onPress={() => {
					deleteContainer(params.container._id)
						.then(() => {
							fetchContainers()
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
	isInThisContainer = item => {
		let container = this.props.navigation.state.params.container
		return item.container && item.container._id == container._id
	}
	renderItem(item) {
		return (
			<Body>
				<Text style={styles.header}>
					{item.itemType ? item.itemType.name : 'Unknown itemtype'}
				</Text>
				<Text>
					{item.container ? item.container.name : 'No container'}
				</Text>
			</Body>
		)
	}
	render() {
		let container = this.props.navigation.state.params.container
		let data = this.props.items.filter(this.isInThisContainer)
		return (
			<Container>
				<Content>
					<Text>Objects in container: {data.length}</Text>
					<List listPress={item => this.props.navigation.navigate('Item', { item })} renderItem={this.renderItem} data={data} />
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = ({ items }) => ({
	items,
})

export default connect(mapStateToProps)(ContainerScreen)

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
	},
	header: {
		fontSize: 18,
	},
});
