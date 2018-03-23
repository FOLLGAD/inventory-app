import React, { Component } from 'react';
import {
	AppRegistry,
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';

import { RNCamera } from 'react-native-camera';

import { connect } from 'react-redux';
import ContainerList from './ContainerList';

class what extends Component {
	render() {
		return (
			<View style={styles.container}>
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
			</View>
		);
	}
	readCode = ({ data }) => {
		console.log(data)
		let itemMatch = this.props.items.find(item => item._id == data)
		let containerMatch = this.props.containers.find(container => container._id == data)
		console.log(itemMatch, containerMatch)
		if (itemMatch) {
			this.props.navigation.navigate('Item', { item: itemMatch })
			return
		}
		if (containerMatch) {
			this.props.navigation.navigate('ContainerList')
		}
	}
}

const mapStateToProps = ({ items, containers }) => ({
	items, containers
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