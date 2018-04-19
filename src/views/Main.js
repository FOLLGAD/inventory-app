import React, { Component } from 'react';

import {
	View,
	StyleSheet,
} from 'react-native';

import {
	Root,
} from 'native-base';

import AppLogin from './AppLogin';
import Inventory from './Inventory';

import { connect } from 'react-redux';

class Main extends Component {
	render() {
		return (
			<Root>
				{this.props.isLoggedIn ? <Inventory /> : <AppLogin />}
			</Root>
		);
	}
}

function mapStateToProps(state) {
	return {
		isLoggedIn: Boolean(state.login.token),
	}
}

export default connect(mapStateToProps)(Main);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		// alignItems: 'center',
	},
});