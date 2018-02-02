import React, { Component } from 'react';

import {
	StyleSheet,
	Text,
	TextInput,
	View,
	NavigatorIOS,
	AppState,
} from 'react-native';

import { TabNavigator } from 'react-navigation';

import NumberInput from './NumberInput';
import ScanQR from './ScanQR';

class ScanScreen extends Component {
	constructor(props) {
		super(props)

		this.state = {
			appState: AppState.currentState
		};
	}

	// If appstate is in foreground ('active'), enable the camera. Elsewise, do not. This is a measure as to save on battery, so the camera is not running while the phone is locked or in another app.
	componentDidMount() {
		AppState.addEventListener('change', this._handleAppStateChange);
	}
	componentWillUnmount() {
		AppState.removeEventListener('change', this._handleAppStateChange);
	}
	_handleAppStateChange = (nextAppState) => {
		this.setState({ appState: nextAppState });
	}

	render() {
		return (
			AppState.currentState == 'active' || this.state.appState == 'active' ? <ScanQR onSuccess={this.props.screenProps.onInput} /> : null
		)
	}
}

class ManInputScreen extends Component {
	constructor(props) {
		super(props)
		console.log(props)
	}
	render() {
		// <View>
		return (
			<NumberInput onSubmit={this.props.screenProps.onInput} />
		)
		// </View>
	}
}

const RootTabs = TabNavigator({
	Scan: {
		screen: ScanScreen,
	},
	Input: {
		screen: ManInputScreen,
	},
}, {
		tabBarOptions: {
			activeTintColor: '#e91e63',
		},
	});

export default RootTabs;

const styles = StyleSheet.create({
	centerText: {
		flex: 1,
		fontSize: 18,
		padding: 32,
		color: '#777',
	},

	textBold: {
		fontWeight: '500',
		color: '#000',
	},

	buttonText: {
		fontSize: 21,
		color: 'rgb(0,122,255)',
	},

	buttonTouchable: {
		padding: 16,
	},
});