import React, { Component } from 'React';

import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} from 'react-native';

import { RNCamera } from 'react-native-camera';

export default class ScanQR extends Component {
	constructor(props) {
		super(props);
		this.onRead = this.onRead.bind(this);
	}
	onRead(e) {
		this.props.activated && this.props.onSuccess(e.data)
	}
	render() {
		return (
			// <View style={styles.container}>
			<RNCamera
				style={styles.preview}
				onBarCodeRead={this.onRead}
				// barCodeTypes={[Camera.constants.BarCodeType.qr]}
				type={RNCamera.constants.Type.front}
				aspect={RNCamera.constants.Aspect.fill}
				ref={cam => this.camera = cam}
			>
			</RNCamera>
			// {/* <Text style={styles.capture} onPress={() => console.log(this.camera)}>CAPTURE</Text> */}
			// {/* </View> */}
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
	},
	preview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	capture: {
		flex: 0,
		backgroundColor: '#fff',
		borderRadius: 5,
		color: '#000',
		padding: 10,
		margin: 40
	}
});