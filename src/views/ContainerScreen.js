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
	H3,
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
			<CardItem>
				<Body>
					<H3>
						{item.itemType ? item.itemType.name : 'Unknown itemtype'}
					</H3>
					<Text>
						{item.code}
					</Text>
				</Body>
			</CardItem>
		)
	}
	render() {
		let container = this.props.navigation.state.params.container
		let data = this.props.items.filter(this.isInThisContainer)
		return (
			<Container>
				<Content>
					<Card>
						<CardItem>
							<Body>
								<Text>Objects in container: {data.length}</Text>
							</Body>
						</CardItem>
					</Card>
					<Card>
						<List listPress={item => this.props.navigation.navigate('Item', { item })} renderItem={this.renderItem} data={data} />
					</Card>
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = ({ items }) => ({
	items,
})

export default connect(mapStateToProps)(ContainerScreen)