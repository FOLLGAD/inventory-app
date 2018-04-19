// @flow

import React, { Component } from 'react';

import {
	Text,
	AsyncStorage,
	ToastAndroid,
} from 'react-native';

import {
	Container,
} from 'native-base';

import LoginForm from '../components/LoginForm';
import { login } from '../actions';
import { authorize } from '../api';
import { connect } from 'react-redux';

class AppLogin extends Component {
	constructor(props) {
		super(props);

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
			username: 'emil.ahlback@abbindustrigymnasium.se',
			password: '1Bemi1Babian',
		};

		let promise = authorize(email || creds.username, password || creds.password)
			.then((loginData) => {
				this.props.dispatchLogin(loginData);
				AsyncStorage.setItem('loginToken', loginData.token, err => console.log(err));
			})
			.catch(err => {
				console.log(err);
			})
	}
	render() {
		return (
			<Container>
				<LoginForm onSubmit={this.login} />
			</Container>
		);
	}
}

let mapStateToProps = state => ({
	loginToken: state.login.token,
})
let mapDispatchToProps = dispatch => ({
	dispatchLogin: loginData => dispatch(login(loginData)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AppLogin);