// @flow

import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { getAllItems } from '../api';

import List from './List';

export default class Inventory extends Component {
    constructor(props) {
        super(props);

        this.fetch = this.fetch.bind(this);
    }
    fetch() {
        getAllItems
            .then(items => this.setState({ items }));
    }
    componentWillMount() {
        this.fetch();
    }
    render() {
        return (
            <View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});