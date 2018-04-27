import React, { Component } from 'react';

import {
	AsyncStorage,
	ActivityIndicator,
} from 'react-native';

import {
	Root,
	StyleProvider,
	Container,
} from 'native-base';

import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';

import AppLogin from './AppLogin';
import Inventory from './Inventory';

import { connect } from 'react-redux';

import { login, setApiUrl } from '../actions'
import { fetchMe } from '../fetchers';

class Main extends Component {
	constructor(props) {
		super(props)

		this.state = {
			loading: true,
		}
	}
	render() {
		return (
			<Root>
				<StyleProvider style={getTheme(material)}>
					{this.state.loading ?
						<Container style={{ display: "flex", justifyContent: "space-around", alignContent: "center", alignItems: "center" }}>
							<ActivityIndicator size="large" color="#ff000f" />
						</Container> :
						(this.props.isLoggedIn ? <Inventory /> : <AppLogin />)
					}
				</StyleProvider>
			</Root>
		);
	}
	componentWillMount() {
		AsyncStorage.getItem('loginToken').then(token => {
			if (token) {
				this.props.dispatchLogin({ token });
				fetchMe();
			}
			this.setState({ loading: false });
		})
		AsyncStorage.getItem('apiUrl').then(apiUrl => {
			if (apiUrl) {
				this.props.dispatchApiUrl(apiUrl);
			}
		})
	}
}

const mapStateToProps = state => ({
	isLoggedIn: Boolean(state.login.token),
	login: state.login,
})

const mapDispatchToProps = dispatch => ({
	dispatchLogin: loginData => dispatch(login(loginData)),
	dispatchApiUrl: apiUrl => dispatch(setApiUrl(apiUrl)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);