import React, { Component } from 'react';

import { createItem } from '../api';

import {
	Platform,
	StyleSheet,
	View,
	ToastAndroid,
	TextInput,
	DatePickerAndroid,
	DatePickerIOS,
	TouchableOpacity,
} from 'react-native';

import {
	Icon,
	Card,
	CardItem,
	Text,
	Input,
	Content,
	Container,
	Button,
	Item,
	Picker,
	Form,
	Label,
	Left,
	Right,
	ListItem,
	CheckBox,
	Body,
	Header,
	List,
	H2,
} from 'native-base';

import { connect } from 'react-redux';

import { fetchItems } from '../fetchers';

import ModalFilterPicker from 'react-native-modal-filter-picker'

// Acceptable ObjectTypes with names
const ObjectTypes = {
	'String': String,
	'Number': Number,
	'Date': Date,
	'Boolean': Boolean,
}

const dateToString = date => {
	let year = date.getFullYear(),
		month = date.getMonth() + 1,
		day = date.getDate();

	day = "0" + day
	day = day.slice(-2)

	month = "0" + month
	month = month.slice(-2)

	return `${year}-${month}-${day}`
}

class NewItemScreen extends Component {
	constructor(props) {
		super(props)

		this.post = this.post.bind(this)

		this.state = {
			itemType: null,
			properties: [],
			itemTypePickerIsVisible: false,
			containerPickerIsVisible: false,
		}
	}
	post() {
		let { itemType, properties, container } = this.state
		createItem({ itemType: itemType._id, properties, container }).then(() => {
			this.props.navigation.goBack()
			fetchItems();
		})
	}

	itemTypePickerOnSelect = itemTypeId => {
		if (this.state.itemType && itemTypeId == this.state.itemType._id) return;

		let itemType = this.props.itemTypes.find(it => it._id == itemTypeId)
		let properties = itemType.propertyTypes.map(pt => ({ propertyType: pt._id, value: '' }));

		this.setState({
			itemType,
			itemTypePickerIsVisible: false,
			properties,
		})
	}
	itemTypePickerOnShow = () => {
		this.setState({
			itemTypePickerIsVisible: true,
		})
	}
	itemTypePickerOnCancel = () => {
		this.setState({
			itemTypePickerIsVisible: false,
		})
	}

	containerPickerOnSelect = containerId => {
		if (this.state.container && containerId == this.state.container._id) return;

		let container = this.props.containers.find(cnt => cnt._id == containerId)

		this.setState({
			container,
			containerPickerIsVisible: false,
		})
	}
	containerPickerOnShow = () => {
		this.setState({
			containerPickerIsVisible: true,
		})
	}
	containerPickerOnCancel = () => {
		this.setState({
			containerPickerIsVisible: false,
		})
	}

	render() {
		return (
			<Container>
				<Content>
					<Card style={{ flexDirection: "column", flex: 1 }}>
						<CardItem>
							<Button block small bordered onPress={this.itemTypePickerOnShow}>
								<Text>{this.state.itemType ? this.state.itemType.name : "Item type"}</Text>
							</Button>
						</CardItem>

						<ModalFilterPicker
							onSelect={this.itemTypePickerOnSelect}
							onCancel={this.itemTypePickerOnCancel}
							options={this.props.itemTypes.map(itemType => ({ key: itemType._id, label: itemType.name }))}
							visible={this.state.itemTypePickerIsVisible}
							modal={{ onRequestClose: () => { } }}
							placeholder="Item type"
						/>

						<CardItem bordered>
							<Button block small bordered onPress={this.containerPickerOnShow}>
								<Text>{this.state.container ? this.state.container.name : "Container"}</Text>
							</Button>
						</CardItem>

						<ModalFilterPicker
							onSelect={this.containerPickerOnSelect}
							onCancel={this.containerPickerOnCancel}
							options={this.props.containers.map(container => ({ key: container._id, label: container.name }))}
							visible={this.state.containerPickerIsVisible}
							modal={{ onRequestClose: () => { } }}
							placeholder="Container"
						/>

						<Body style={{ marginTop: 10 }}>
							<H2>Properties</H2>
						</Body>

						{this.state.itemType && this.state.itemType.propertyTypes.map((pt, index) => {
							let props = this.state.properties
							let thisProp = props[index]

							if (pt.type == 'Boolean') {
								return (
									<ListItem>
										<CheckBox checked={Boolean(thisProp.value)} onPress={() => (thisProp.value = !thisProp.value, this.setState({ properties: props }))} />
										<Text>{pt.name}</Text>
									</ListItem>
								)
							}
							if (pt.type == 'Number' || pt.type == 'String') {
								return (
									<ListItem>
										<Item floatingLabel>
											<Input value={thisProp.value} onChangeText={e => { thisProp.value = e; this.setState({ properties: props }) }} />
											<Label>{pt.name}</Label>
										</Item>
									</ListItem>
								)
							}
							if (pt.type == 'Date') {
								return (
									<ListItem>
										<Text style={{ marginRight: 10 }}>{pt.name}:</Text>
										<Button
											onPress={() => {
												let date = thisProp && thisProp.value
												DatePickerAndroid.open({
													date: new Date(date)
												}).then(({ action, year, month, day }) => {
													thisProp.value = (new Date(year, month, day)).toString()
													this.setState({ properties: props })
												})
											}}
										>
											{thisProp && thisProp.value ? <Text>{dateToString(new Date(thisProp.value))}</Text> : <Text>Choose a date</Text>}
										</Button>
									</ListItem>
								)
							}
						})}

						<CardItem bordered>
							<Button full primary onPress={this.post}>
								<Text>Create</Text>
							</Button>
						</CardItem>
					</Card>
				</Content>
			</Container >
		);
	}
}

const mapStateToProps = ({ items, itemTypes, containers }) => ({
	items,
	itemTypes,
	containers,
});

export default connect(mapStateToProps)(NewItemScreen)

const styles = StyleSheet.create({
});
