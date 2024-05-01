import { Platform, ToastAndroid } from "react-native"

export const showTest = (message) => {
    if (Platform.OS == 'android') {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    }
    else {
        alert(message);
    }
}