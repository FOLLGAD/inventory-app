// @flow

import React, { Component } from 'react';

import { createItemType } from '../api';

import {
	Platform,
	StyleSheet,
	View,
	ToastAndroid,
} from 'react-native';

import {
	Icon,
	Card,
	CardItem,
	Text,
	Input,
	Content,
	Button,
	Item,
	Picker,
	Form,
	Label,
	Left,
	Right,
	Container,
	Body,
} from 'native-base';

// Acceptable ObjectTypes with names
const ObjectTypes = {
	'String': 'Text',
	'Number': 'Nummer',
	'Date': 'Datum',
	'Boolean': 'Sant/falskt',
}

export default class NewItemTypeScreen extends Component {
	constructor(props) {
		super(props)

		this.post = this.post.bind(this)
		this.codeChange = this.codeChange.bind(this)
		this.addProperty = this.addProperty.bind(this)
		this.removeProperty = this.removeProperty.bind(this)

		this.state = {
			propertyTypes: [],
			name: '',
		}
	}
	post() {
		let { name, propertyTypes } = this.state
		createItemType({ name, propertyTypes }).then(item => {
			this.props.navigation.goBack()
		})
	}
	codeChange(e) {
		this.setState({ code: e.target.value })
	}
	addProperty() {
		let newProps = this.state.propertyTypes
		newProps.push({ name: '', type: undefined })
		this.setState({ propertyTypes: newProps })
	}
	removeProperty(i) {
		let newProps = this.state.propertyTypes
		newProps.splice(i, 1)
		this.setState({ propertyTypes: newProps })
	}
	render() {
		let createPropTypInp = (propType, i, array) => (
			<CardItem bordered key={i}>
				<Form style={{ width: "100%" }}>
					<Item regular>
						<Input onChangeText={e => {
							array[i].name = e
							this.setState({ propertyTypes: array })
						}}
							value={propType.name}
							placeholder="Name"
						/>
					</Item>
					<View>
						<Picker
							selectedValue={propType.type}
							onValueChange={d => (propType.type = d, this.setState({ propertyTypes: this.state.propertyTypes }))}
							placeholder="Property type"
						>
							<Picker.Item label="Choose a type" value={false} />
							{Object.keys(ObjectTypes)
								.map(ot => <Picker.Item label={ObjectTypes[ot]} key={ot} value={ot} />)}
						</Picker>
					</View>

					<Button iconLeft block small transparent danger onPress={() => this.removeProperty(i)}>
						<Icon name="trash" />
						<Text>Delete</Text>
					</Button>
				</Form>
			</CardItem>
		)

		return (
			<Container style={styles.container}>
				<Content>
					<Item>
						<Input
							style={styles.bigText}
							onChangeText={text => this.setState({ name: text })}
							value={this.state.name}
							placeholder="Name"
						/>
					</Item>

					{this.state.propertyTypes.length ?
						<Card>
							{this.state.propertyTypes.map(createPropTypInp)}
						</Card> : null}

					<Button iconLeft block transparent secondary onPress={this.addProperty}>
						<Icon name="add" />
						<Text>New property</Text>
					</Button>

					<Button block primary onPress={this.post}>
						<Text>Create item type</Text>
					</Button>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		paddingLeft: 10,
		paddingRight: 10,
		backgroundColor: '#F5FCFF',
	},
	bold: {
		fontWeight: 'bold',
	},
	propItem: {
		// display: 'flex',
		// padding: 0,
		// marginLeft: 10,
		// marginRight: 10,
	},
	propPicker: {
		// display: 'flex',
		// padding: 0,
		// marginLeft: 10,
		// marginRight: 10,
	},
	header: {
		fontSize: 16,
		// marginBottom: 10,
		// marginLeft: 10,
	},
	bigText: {
		fontSize: 20,
		// textAlign: 'center',
	},
	propType: {
		paddingTop: 10,
		marginTop: 10,
		borderStyle: 'solid',
		borderTopWidth: 2,
		borderColor: '#eee',
	},
});
