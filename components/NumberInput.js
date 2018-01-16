import React, { Component } from 'React';

import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Button,
} from 'react-native';

export default class NumberInput extends Component {
	constructor(props) {
		super(props);
		this.state = { text: "" }
	}
	render() {
		return (
			// <Text>Skriv in ett artikelnummer eller skåpnamn</Text>
			<View>
				<TextInput
					onChangeText={(text) => this.setState({ text })}
					value={this.state.text}
				/>
				<Button
					onPress={(e) => this.props.onSubmit(this.state.text)}
					title="Go"
					color="#841584"
					disabled={this.state.text.length === 0}
				/>
			</View>
		)
	}
}