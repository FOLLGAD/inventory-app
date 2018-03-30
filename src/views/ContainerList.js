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

import List from '../components/List';

import { connect } from 'react-redux';

import { fetchContainers } from '../fetchers';

class ContainerList extends Component {
	constructor(props) {
		super(props);

		this.onFetch = this.onFetch.bind(this)
	}
	async onFetch() {
		let data = fetchContainers();
		return data;
	}
	renderItem(item) {
		return <View><Text style={styles.header}>{item.name}</Text><Text style={styles.greyText}>{item._id}</Text></View>
	}
	componentDidMount() {
		this.onFetch();
	}
	render() {
		return (
			<Container>
				<Content>
					<List
						listPress={container => {
							this.props.navigation.navigate('Container', { container })
						}}
						onFetch={this.onFetch}
						renderItem={this.renderItem}
						data={this.props.containers}
					/>
				</Content>
				<View>
					<Fab
						position='bottomRight'
						onPress={() => this.props.navigation.navigate('NewContainer')}
					>
						<Icon name='add' />
					</Fab>
				</View>
			</Container>
		)
	}
}

const mapStateToProps = ({ containers }) => ({
	containers
})

export default connect(mapStateToProps)(ContainerList)

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