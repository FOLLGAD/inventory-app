import React, { Component } from 'React';

import {
	StyleSheet,
	TextInput,
	View,
	Image,
} from 'react-native';

import {
	Text,
	Button,
	Container,
	Content,
	InputGroup,
	Icon,
} from 'native-base'

export default class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = { email: '', password: '' };
	}
	render() {
		return (
			<View style={{ display: "flex", alignItems: "center" }}>
				<Image
					style={{ width: 200, height: 200, }}
					source={require("../logo.png")} />

				<TextInput
					type="text"
					placeholder="Email address"
					autoFocus={true}
					onChangeText={(email) => this.setState({ email })}
					value={this.state.email}
					width="100%"
				/>
				<TextInput
					type="password"
					placeholder="Password"
					onChangeText={(password) => this.setState({ password })}
					value={this.state.password}
					secureTextEntry={true}
					width="100%"
				/>
				<InputGroup>
					<Button
						onPress={() => this.props.onSubmit(this.state.email, this.state.password)}
						primary
						block
						full
						style={{ flexGrow: 1 }}
					>
						<Text style={{ fontWeight: 'bold' }}>Log in</Text>
					</Button>
					<Button
						onPress={() => this.props.onSettings()}
						light
						style={{ marginLeft: 5 }}
					>
						<Icon name="settings" />
					</Button>
				</InputGroup>
			</View>
		)
	}
}