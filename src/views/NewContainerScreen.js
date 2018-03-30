import React, { Component } from 'react';

import { createContainer } from '../api';

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
} from 'native-base';

import { connect } from 'react-redux';

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

	day = '0' + day
	day = day.slice(-2)

	month = '0' + month
	month = month.slice(-2)

	return `${year}-${month}-${day}`
}

class NewContainerScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		let { params } = navigation.state
		return {
			title: 'New container',
		}
	}
	constructor(props) {
		super(props)

		this.state = {
			itemType: null,
			properties: [],
			pickerIsVisible: false,
		}
	}
	post = () => {
		let { name } = this.state
		createContainer({ name })
			.then(() => {
				this.props.navigation.goBack()
			})
			.catch(err => {
				ToastAndroid.show(err.toString(), ToastAndroid.LONG)
			})
	}
	pickerOnSelect = itemTypeId => {
		if (this.state.itemType && itemTypeId == this.state.itemType._id) return;

		let itemType = this.props.itemTypes.find(it => it._id == itemTypeId)
		let properties = itemType.propertyTypes.map(pt => ({ propertyType: pt._id, value: '' }));

		this.setState({
			itemType,
			pickerIsVisible: false,
			properties,
		})
	}
	pickerOnShow = () => {
		this.setState({
			pickerIsVisible: true,
		})
	}
	pickerOnCancel = () => {
		this.setState({
			pickerIsVisible: false,
		})
	}
	render() {
		return (
			<Container>
				<Content>
					<Item>
						<Input
							placeholder="Name"
							onChangeText={text => this.setState({ name: text })}
						/>
					</Item>
				</Content>

				<Button block primary onPress={this.post}>
					<Text>Create</Text>
				</Button>
			</Container>
		);
	}
}

const mapStateToProps = ({ containers }) => ({
	containers,
});

export default connect(mapStateToProps)(NewContainerScreen)

const styles = StyleSheet.create({
	bold: {
		fontWeight: 'bold',
	},
});
