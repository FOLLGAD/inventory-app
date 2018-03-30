import React, { Component } from 'react';

import {
	View,
	StyleSheet,
} from 'react-native';

import AppLogin from './AppLogin';
import Inventory from './Inventory';

import { connect } from 'react-redux';

class Main extends Component {
	render() {
		return (
			this.props.isLoggedIn ? <Inventory /> : <AppLogin />
		);
	}
}

function mapStateToProps(state) {
	return {
		isLoggedIn: Boolean(state.loginToken),
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