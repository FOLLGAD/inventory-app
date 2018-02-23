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

		authorize(email || creds.username, password || creds.password)
			.then(token => {
				this.props.dispatchLogin(token);
			})
			.catch(err => {
				console.log(err);
			})
	}
	render() {
		return (
			<View>
				<LoginForm onSubmit={this.login} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

let mapStateToProps = state => ({
	loginToken: state.loginToken,
})
let mapDispatchToProps = dispatch => ({
	dispatchLogin: token => dispatch(login(token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AppLogin);