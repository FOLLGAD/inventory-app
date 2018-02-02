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
		this.onRead = this.onRead.bind(this);
	}
	onRead(e) {
		this.props.onSuccess && this.props.onSuccess(e.data)
	}
	render() {
		return (
			<QRCodeScanner
				onRead={this.onRead}
				topContent={<Text>Scan a code a!</Text>}
				reactivateTimeout={1}
				showMarker={true}
				ref={node => this.scanner = node}
				reactive={true}
			/>
		)
	}
}