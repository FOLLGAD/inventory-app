// @flow

import React, { Component } from 'react';

import {
	Platform,
	StyleSheet,
	Text,
	View,
	ToastAndroid,
	AsyncStorage,
} from 'react-native';

import LoginForm from '../components/LoginForm';
import { login } from '../actions';
import { connect } from 'react-redux';
import { authorize } from '../api';

class AppLogin extends Component {
	constructor(props) {
		super(props);

		this.login = this.login.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.validateLogin = this.validateLogin.bind(this);
	}
	handleInput(input) {
		ToastAndroid.show(`The code is ${input}`, ToastAndroid.LONG);
	}
	validateLogin() {
		return new Promise((res, rej) => {
			AsyncStorage.getItem('loginCookie').then(cookie => {
				Boolean(cookie) ? res(cookie) : rej();
			}).catch(rej);
		})
	}
	login(email, password) {
		const creds = {
			username: 'emil.ahlback@abbindustrigymnasium.se',
			password: '1Bemi1Babian',
		};

		authorize(creds.username, creds.password)
			.then((name) => {
				this.props.dispatchLogin();
			})
			.catch(console.error)
	}
	render() {
		return (
			<View>
				<LoginForm onSubmit={this.login} />
			</View>
		);
	}
}

const styles: object = StyleSheet.create({
	container: {
		flex: 1,
	},
});

let mapStateToProps = state => ({
	loginCookie: state.loginCookie,
})
let mapDispatchToProps = dispatch => ({
	dispatchLogin: () => dispatch(login()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AppLogin);