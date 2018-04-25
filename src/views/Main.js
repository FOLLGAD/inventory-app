import React, { Component } from 'react';

import {
	View,
	StyleSheet,
} from 'react-native';

import {
	Root,
	StyleProvider,
} from 'native-base';

import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';

import AppLogin from './AppLogin';
import Inventory from './Inventory';

import { connect } from 'react-redux';

class Main extends Component {
	render() {
		return (
			<Root>
				<StyleProvider style={getTheme(material)}>
					{this.props.isLoggedIn ? <Inventory /> : <AppLogin />}
				</StyleProvider>
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