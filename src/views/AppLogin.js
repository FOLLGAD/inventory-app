// @flow

import React, { Component } from 'react';

import {
	AsyncStorage,
	ToastAndroid,
	View,
	Image,
	TextInput,
	BackHandler,
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
	InputGroup,
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
			email: "",
			password: "",
			formError: false,
			loading: false,
		}
	}
	login = () => {
		let { email, password } = this.state;

		this.setState({ formError: false, loading: true })

		authorize(email, password)
			.then((loginData) => {
				AsyncStorage.setItem('loginToken', loginData.token);
				this.setState({ loading: false })
				this.props.dispatchLogin(loginData);
			})
			.catch(err => {
				this.setState({ formError: true, loading: false })
				let { status, data } = err.response

				if (status == 401) {
					ToastAndroid.show("Wrong email or password", ToastAndroid.LONG)
				}
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
	updateForm = (obj) => {
		this.setState(obj);
		this.setState({ formError: false })
	}
	render() {
		return (
			<Container>
				<Content>
					{this.state.settingsOpen ?
						<Form style={{ display: "flex", alignItems: "center", padding: 10 }}>
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
						<Form style={{ display: "flex", alignItems: "center", padding: 10 }}>
							<Image
								style={{ width: 200, height: 200, }}
								source={require("../logo.png")}
							/>
							<Item error={this.state.formError}>
								<Input
									type="email"
									placeholder="Email address"
									autoFocus={true}
									onChangeText={email => this.updateForm({ email })}
									value={this.state.email}
									returnKeyType="next"
									keyboardType="email-address"
									onSubmitEditing={() => this.passwordInput._root.focus()}
								/>
							</Item>
							<Item error={this.state.formError} last>
								<Input
									type="password"
									placeholder="Password"
									onChangeText={password => this.updateForm({ password })}
									value={this.state.password}
									secureTextEntry={true}
									onSubmitEditing={this.login}
									ref={ref => this.passwordInput = ref}
								/>
							</Item>
							<InputGroup style={{ marginTop: 10 }}>
								<Button
									onPress={this.login}
									primary
									block
									full
									style={{ flexGrow: 1 }}
									type="submit"
									disabled={this.state.loading}
								>
									<Text style={{ fontWeight: 'bold' }}>Log in</Text>
								</Button>
								<Button
									onPress={this.openSettings}
									light
									style={{ marginLeft: 5 }}
								>
									<Icon name="settings" />
								</Button>
							</InputGroup>
						</Form>
					}
				</Content>
			</Container>
		);
	}
	backHandlerFunc = (e) => {
		if (this.state.settingsOpen) {
			this.setState({ settingsOpen: false })

			// App closes if handler does not return true
			return true
		}
		return false
	}
	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.backHandlerFunc);
	}
	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.backHandlerFunc);
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