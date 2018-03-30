import React, { Component } from 'react';

import {
	StyleSheet,
	Text,
	TextInput,
	View,
	NavigatorIOS,
	AppState,
} from 'react-native';

import ScanQR from '../Views/ScanQR';

class ScanScreen extends Component {
	constructor(props) {
		super(props)

		this.state = {
			appState: AppState.currentState
		};

		this.onInput = this.onInput.bind(this);
	}
	onInput(inp) {
		this.props.screenProps.onInput(inp)
			.then(item => {
				this.props.navigation.navigate('ItemScreen');
			})
			.catch(err => {
				console.log(err);
			})
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
			this.state.appState == 'active' ? (
				<ScanQR onSuccess={this.onInput} />
			) : <View />
		)
	}
}

export default ScanScreen;

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