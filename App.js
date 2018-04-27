import React, { Component } from 'react';

import {
	ToastAndroid,
	AsyncStorage,
} from 'react-native';

import { Provider } from 'react-redux';
import MainView from './src/views/Main';

import store from './src/store';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<MainView />
			</Provider>
		);
	}
}

export default App;