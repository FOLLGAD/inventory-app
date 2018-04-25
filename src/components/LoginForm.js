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
} from 'native-base'

export default class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = { email: '', password: '' };
	}
	render() {
		return (
			<Container style={{ margin: 10 }}>
				<Content contentContainerStyle={{ display: "flex", alignItems: "center" }}>

					<Image
						style={{ width: 200, height: 200 }}
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
					<Button
						onPress={() => this.props.onSubmit(this.state.email, this.state.password)}
						primary
						rounded
						full
					>
						<Text>Log in</Text></Button>
				</Content>
			</Container>
		)
	}
}