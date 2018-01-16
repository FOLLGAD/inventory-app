import React, { Component } from 'React';

import {
	StyleSheet,
	Text,
	View,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

export default class ScanQR extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<QRCodeScanner
				onRead={(e) => this.props.onSuccess(e.data)}
				topContent={<Text>Scan a code!</Text>}
			/>
		)
	}
}