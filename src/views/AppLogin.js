// @flow

import React, { Component } from 'react';

import {
	AsyncStorage,
	ToastAndroid,
	View,
} from 'react-native';

import {
	Container,
	Content,
	Icon,
	Input,
	Button,
	Item,
	Form,
	Text,
	Label,
} from 'native-base';

import LoginForm from '../components/LoginForm';
import { login, setApiUrl } from '../actions';
import { authorize } from '../api';
import { connect } from 'react-redux';

import { apiUrl } from '../config';

class AppLogin extends Component {
	constructor(props) {
		super(props);

		this.state = {
			settingsOpen: false,
			customApiUrl: this.props.apiUrl,
		}

		this.login = this.login.bind(this);
		this.validateLogin = this.validateLogin.bind(this);
	}
	handleInput(input) {
		ToastAndroid.show(`The code is ${input}`, ToastAndroid.LONG);
	}
	validateLogin() {
		return new Promise((res, rej) => {
			AsyncStorage.getItem('loginToken').then(token => {
				Boolean(token) ? res(token) : rej();
			}).catch(rej);
		})
	}
	login(email, password) {
		const creds = {
			username: 'demo@demo.com',
			password: 'demo',
		};

		let promise = authorize(email || creds.username, password || creds.password)
			.then((loginData) => {
				this.props.dispatchLogin(loginData);
				AsyncStorage.setItem('loginToken', loginData.token);
			})
			.catch(err => {
				console.log(err);
			})
	}
	openSettings = () => {
		this.setState({ settingsOpen: true, customApiUrl: this.props.apiUrl })
	}
	closeSettings = () => {
		this.setState({ settingsOpen: false })
		AsyncStorage.setItem('apiUrl', this.state.customApiUrl)
		this.props.dispatchApiUrl(this.state.customApiUrl)
	}
	render() {
		return (
			<Container style={{ margin: 10 }}>
				<Content>
					{this.state.settingsOpen ?
						<Form style={{ display: "flex", alignItems: "center" }}>
							<Item stackedLabel underline>
								<Label>API-url</Label>
								<Input
									type="text"
									value={this.state.customApiUrl}
									onChangeText={customApiUrl => this.setState({ customApiUrl })}
									placeholder={apiUrl}
								/>
							</Item>
							<Button
								onPress={this.closeSettings}
								primary
								block
								full
								style={{ marginTop: 20 }}
							>
								<Text style={{ fontWeight: 'bold' }}>Save</Text>
							</Button>
						</Form> :
						<LoginForm onSubmit={this.login} onSettings={this.openSettings} />
					}
				</Content>
			</Container>
		);
	}
}

let mapStateToProps = state => ({
	loginToken: state.login.token,
	apiUrl: state.apiUrl,
})
let mapDispatchToProps = dispatch => ({
	dispatchLogin: loginData => dispatch(login(loginData)),
	dispatchApiUrl: apiUrl => dispatch(setApiUrl(apiUrl)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AppLogin);