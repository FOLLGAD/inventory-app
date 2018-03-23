// @flow

import React, { Component } from 'react';

import { createItemType } from '../api';

import {
	Platform,
	StyleSheet,
	View,
	ToastAndroid,
	TextInput,
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
		this.nameChange = this.nameChange.bind(this)
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
			console.log(item)
			this.props.navigation.goBack()
		})
	}
	nameChange(e) {
		this.setState({ name: e.target.value })
	}
	addProperty() {
		let newProps = this.state.propertyTypes
		newProps.push({ name: '', type: 'String' })
		this.setState({ propertyTypes: newProps })
	}
	removeProperty(i) {
		let newProps = this.state.propertyTypes
		newProps.splice(i, 1)
		this.setState({ propertyTypes: newProps })
	}
	render() {
		let createPropTypInp = (propType, i, array) => (
			<View key={"" + propType.name + propType.type + i} style={styles.propType}>
				<Item floatingLabel style={styles.propItem}>
					<TextInput onChangeText={e => (array[i].name = e, this.setState({ propertyTypes: array }))} value={propType.name} />
					<Label>Namn</Label>
				</Item>
				<Picker
					style={styles.propPicker}
					selectedValue={propType.type}
					onValueChange={d => (propType.type = d, this.setState({ propertyTypes: this.state.propertyTypes }))}
					placeholder="Property type"
				>
					{Object.keys(ObjectTypes)
						.map(ot => <Picker.Item label={ObjectTypes[ot]} key={ot} value={ot} />)}
				</Picker>
				<Button small transparent danger onPress={() => this.removeProperty(i)}>
					<Text>Ta bort</Text>
				</Button>
			</View>
		)

		return (
			<Content style={styles.container}>
				<Form>
					<TextInput style={styles.bigText} onChangeText={text => this.setState({ name: text })} value={this.state.name} placeholder="Namn" />

					<Text style={styles.header}>Attributer</Text>
					{this.state.propertyTypes.map(createPropTypInp)}

					<Button block transparent secondary onPress={this.addProperty}>
						<Text>Ny attribut</Text>
					</Button>

					<Button block primary onPress={this.post}>
						<Text>Skapa</Text>
					</Button>
				</Form>
			</Content>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		flex: 1,
		backgroundColor: '#F5FCFF',
	},
	bold: {
		fontWeight: 'bold',
	},
	propItem: {
		display: 'flex',
		padding: 0,
		marginLeft: 10,
		marginRight: 10,
	},
	propPicker: {
		display: 'flex',
		padding: 0,
		marginLeft: 10,
		marginRight: 10,
	},
	header: {
		fontSize: 16,
		marginBottom: 10,
		marginLeft: 10,
	},
	bigText: {
		fontSize: 20,
		// textAlign: 'center',
	},
	propType: {
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: '#eee',
	},
});
