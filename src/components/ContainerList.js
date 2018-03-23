// @flow

import React, { Component } from 'react';

import {
	StyleSheet,
	Text,
	View,
} from 'react-native';

import {
	Fab,
	Content,
	Icon,
	Container,
} from 'native-base';

import List from './List';

import { getContainers } from '../api';

import { connect } from 'react-redux';

import { setContainers } from '../actions';

class ContainerList extends Component {
	constructor(props) {
		super(props);

		this.onFetch = this.onFetch.bind(this)
	}
	async onFetch() {
		let containers = await getContainers();
		this.props.dispatchContainers(containers);
		return containers;
	}
	renderItem(item) {
		return <View><Text style={styles.header}>{item.name}</Text><Text style={styles.greyText}>{item._id}</Text></View>
	}
	componentDidMount() {
		this.onFetch();
	}
	render() {
		console.log(this.props.containers)
		return (
			<Container>
				<Content>
					<List
						listPress={item => {
							// this.props.navigation.navigate('Item', { item })
						}}
						onFetch={this.onFetch}
						renderItem={this.renderItem}
						data={this.props.containers}
					/>
				</Content>
				<View>
					<Fab
						position='bottomRight'
					// onPress={() => this.props.navigation.navigate('NewItem')}
					>
						<Icon name="share" />
					</Fab>
				</View>
			</Container>
		)
	}
}

const mapStateToProps = ({ containers }) => ({
	containers
})
const mapDispatchToProps = dispatch => ({
	dispatchContainers: containers => dispatch(setContainers(containers)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ContainerList)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	header: {
		fontSize: 18,
	},
	greyText: {
		color: '#999',
	}
});