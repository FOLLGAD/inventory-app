import React, { Component } from 'react';

import {
	Button,
	Icon,
	Form,
	Text,
	Input,
	Item,
	Label,
	Content,
	Container,
	Header,
	Card,
	CardItem,
	Spinner,
	H1,
	Body,
	InputGroup,
} from 'native-base';

import { connect } from 'react-redux';

import { updateMe } from '../api'

import { toast } from '../utils'

import { fetchMe } from '../fetchers'

class Profile extends Component {
	static navigationOptions = ({ navigation }) => {
		let { params } = navigation.state
		return {
			title: 'My profile',
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
			updating: false,
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
		this.setState({ updating: true })
		updateMe({ phone: this.state.phone, name: this.state.name })
			.then(() => {
				this.setState({ updating: false })
				this.props.navigation.navigate('Scanner')
				fetchMe();
			})
			.catch(console.log)
	}
	cancel = () => {
		this.props.navigation.navigate('Scanner')
	}
	componentWillMount() {
		fetchMe()
	}
	render() {
		return (
			<Container>
				<Content>
					<Card>
						<Body style={{ paddingTop: 10 }}>
							<H1>My profile</H1>
						</Body>
						<Form>
							<Item>
								<Label>Email</Label>
								<Input type="email" value={this.props.email} disabled />
							</Item>
							<Item>
								<Label>Phone</Label>
								<Input type="phone" value={this.state.phone} onChangeText={this.changePhone} />
							</Item>
							<Item>
								<Label>First name</Label>
								<Input type="text" value={this.state.name.first} onChangeText={this.changeNameFirst} />
							</Item>
							<Item>
								<Label>Last name</Label>
								<Input type="text" value={this.state.name.last} onChangeText={this.changeNameLast} />
							</Item>
							<InputGroup style={{ display: "flex", margin: 15, borderBottomColor: "rgba(0,0,0,0)" }}>
								<Button block iconLeft onPress={this.save} style={{ flexGrow: 1 }} >
									{this.state.updating && <Spinner />}
									<Text>Save</Text>
								</Button>
								<Button transparent onPress={this.cancel}>
									<Text>Cancel</Text>
								</Button>
							</InputGroup>
						</Form>
					</Card>
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