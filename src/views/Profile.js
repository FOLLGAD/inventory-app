import React, { Component } from 'react';

import {
	StyleSheet,
	Text,
} from 'react-native';

import {
	Button,
	Icon,
	Form,
	Input,
	Item,
	Label,
	Content,
	Container,
	Header,
} from 'native-base';

import { connect } from 'react-redux';

import { updateMe } from '../api'

import { toast } from '../utils'

class Profile extends Component {
	static navigationOptions = ({ navigation }) => {
		let { params } = navigation.state
		return {
			title: 'Edit profile',
			headerRight: (
				<Button iconRight onLongPress={() => toast('Save')} transparent onPress={() => {
					updateMe({ phone: this.state.phone, name: this.state.name })
				}}>
					<Icon name='save' />
				</Button>
			),
		}
	}
	constructor(props) {
		super(props)

		this.state = {
			phone: this.props.phone || '',
			name: {
				first: (this.props.name && this.props.name.first) || '',
				last: (this.props.name && this.props.name.last) || '',
			},
		}
	}
	changePhone = value => {
		this.setState({ phone: value })
	}
	changeNameFirst = value => {
		let name = {
			first: value,
			last: this.state.name.last
		}
		this.setState({ name })
	}
	changeNameLast = value => {
		let name = {
			first: this.state.name.first,
			last: value
		}
		this.setState({ name })
	}
	save = () => {
		updateMe({ phone: this.state.phone, name: this.state.name })
	}
	render() {
		return (
			<Container>
				<Header>
				</Header>
				<Content>
					<Form>
						<Item floatingLabel>
							<Label>E-post</Label>
							<Input type="email" value={this.props.email} disabled />
						</Item>
						<Item floatingLabel>
							<Label>Telefon</Label>
							<Input type="phone" value={this.state.phone} onChangeText={this.changePhone} />
						</Item>
						<Item floatingLabel>
							<Label>Förnamn</Label>
							<Input type="text" value={this.state.name.first} onChangeText={this.changeNameFirst} />
						</Item>
						<Item floatingLabel>
							<Label>Efternamn</Label>
							<Input type="text" value={this.state.name.last} onChangeText={this.changeNameLast} />
						</Item>
						<Button primary onPress={this.save}>
							<Text>Hey</Text>
						</Button>
					</Form>
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = ({ login }) => ({
	name: login.name,
	email: login.email,
	phone: login.phone,
})

export default connect(mapStateToProps)(Profile)