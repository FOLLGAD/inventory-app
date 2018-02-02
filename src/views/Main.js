import React, { Component } from 'react';

import {
	View,
} from 'react-native';

import CodeInput from '../components/CodeInput';
import AppLogin from './AppLogin';
import Inventory from './Inventory';

import { connect } from 'react-redux';

class Main extends Component {
	render() {
		return (
			<View>
				{this.props.isLoggedIn ? <CodeInput screenProps={{ onInput: this.handleInput }} /> : <AppLogin />}
			</View>
		);
	}
}

function mapStateToProps(state) {
	return {
		isLoggedIn: Boolean(state.loginCookie),
	}
}

export default connect(mapStateToProps)(Main);