import Base64 from 'base-64';

/*
    Convert username and password to use the Basic Authentication standard.
*/
export function toBasicAuth(user, password) {
    var tok = `${user}:${password}`;
    var hash = Base64.encode(tok);
    return 'Basic ' + hash;
}

import { ToastAndroid } from 'react-native';

export function toast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT)
}