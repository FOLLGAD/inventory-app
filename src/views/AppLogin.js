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

const $SP = require('sharepointplus');

class AppLogin extends Component {
	handleInput(input) {
		ToastAndroid.show(`The code is ${input}`, ToastAndroid.LONG);
	}
	validateLogin() {
		AsyncStorage.getItem('loginCookie').then(cookie => {
			console.log('Cookie:', cookie);
		})
			.catch(error => {
				console.log(error);
			})
	}
	login(email, password) {
		const credentials = {
			username: 'emil.ahlback@abbindustrigymnasium.se',
			password: '1Bemi1Babian',
			domain: 'abb.sharepoint.com/sites/CombiX/LabInventory/'
		};

		const proxyweb = "http://" + credentials.domain + "%5C" + credentials.username + ":" + credentials.password + "@proxy:80";

		const sp = $SP()
			.auth(credentials);

		let articles = sp.list('Artiklar', 'https://abb.sharepoint.com/sites/CombiX/LabInventory/')
			.get({})
			.then(e => {
				console.log(
					e[0].getAttribute('Title')
				)
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
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});

let mapStateToProps = state => ({
	cookie: state.cookie
})
let mapDispatchToProps = dispatch => ({
	dispatchLogin: (email, password) => dispatch(login(email, password)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AppLogin);