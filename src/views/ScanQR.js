import React, { Component } from 'react';

import {
	StyleSheet,
	Text,
	TouchableOpacity,
	ToastAndroid,
} from 'react-native';

import { RNCamera } from 'react-native-camera';

import { connect } from 'react-redux';

class what extends Component {
	render() {
		return (
				<RNCamera
					ref={ref => {
						this.camera = ref;
					}}
					style={styles.preview}
					type={RNCamera.Constants.Type.back}
					permissionDialogTitle={'Permission to use camera'}
					permissionDialogMessage={'We need your permission to use your camera phone'}
					onBarCodeRead={this.readCode}
				/>
		);
	}
	readCode = ({ data }) => {
		if (!data) return

		let itemMatch = this.props.items.find(item => item._id == data || item.code == data)
		let containerMatch = this.props.containers.find(container => container._id == data || container.code == data)

		if (itemMatch) {
			this.props.navigation.navigate('Item', { item: itemMatch })
			return
		}
		if (containerMatch) {
			this.props.navigation.navigate('Container', { container: containerMatch })
			return
		}

		ToastAndroid.show('Could not find code in database', ToastAndroid.SHORT)
	}
}

const mapStateToProps = ({ items, containers }) => ({
	items,
	containers,
})

export default connect(mapStateToProps)(what)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'black'
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
		padding: 15,
		paddingHorizontal: 20,
		alignSelf: 'center',
		margin: 20
	},
});