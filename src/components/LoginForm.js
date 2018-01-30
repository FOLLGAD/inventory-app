import React, { Component } from 'React';

import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Button,
} from 'react-native';

export default class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = { email: '', password: '' };
	}
	render() {
		return (
			<View>
				<TextInput
					type="text"
					placeholder="Email address"
					autoFocus={true}
					onChangeText={(email) => this.setState({ email })}
					value={this.state.email}
				/>
				<TextInput
					type="password"
					placeholder="Password"
					onChangeText={(password) => this.setState({ password })}
					value={this.state.password}
				/>
				<Button
					onPress={() => this.props.onSubmit(this.state.email, this.state.password)}
					title="Log in"
					color="#841584"
					disabled={this.state.email.length === 0 || this.state.password.length === 0}
				/>
			</View>
		)
	}
}