// @flow

import React, { Component } from 'react';

import {
	StyleSheet,
	View,
	Right,
	RefreshControl,
	Text,
} from 'react-native';

import {
	Fab,
	Content,
	Card,
	CardItem,
	Icon,
	Container,
} from 'native-base';

import List from '../components/List';

import { connect } from 'react-redux';

import { fetchContainers } from '../fetchers';

class ContainerList extends Component {
	constructor(props) {
		super(props);

		this.state = { isRefreshing: false };
	}
	onFetch = async () => {
		this.setState({ isRefreshing: true })
		let data = await fetchContainers();
		this.setState({ isRefreshing: false })
		return data;
	}
	componentDidMount() {
		this.onFetch();
	}
	renderItem(item) {
		return (
			<View>
				<Text style={styles.header}>{item.name || "Unnamed container"}</Text>
				<Text style={styles.greyText}>{item.n_items} items</Text>
			</View>
		)
	}
	render() {
		return (
			<Container>
				<Content refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.onFetch} />}>
					<Card>
						<List
							listPress={container => {
								this.props.navigation.navigate('Container', { container })
							}}
							onFetch={this.onFetch}
							renderItem={this.renderItem}
							data={this.props.containers}
						/>
					</Card>
				</Content>
				<View>
					<Fab
						style={{ backgroundColor: "#ff000f" }}
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