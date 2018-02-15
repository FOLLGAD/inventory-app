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
			<View style={styles.container} >
				{this.props.isLoggedIn ? <Inventory /> : <AppLogin />}
			</View>
		);
	}
}

function mapStateToProps(state) {
	return {
		isLoggedIn: Boolean(state.loginToken),
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		// alignItems: 'center',
	},
});

export default connect(mapStateToProps)(Main);