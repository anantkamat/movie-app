import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    imageButton: {
      width: 25,
      height: 25
    },
    imageButtonActive: {
      tintColor: 'rgba(252, 31, 74, 1)'
    },
    buttonStyle: {
      position: "absolute",
      right: 10,
      bottom: 0,
      zIndex: 9999
    },
    countView: {
      height: 20,
      width: 20,
      borderRadius: 10,
      backgroundColor: 'red',
      marginBottom: 18,
      alignItems: 'center',
      justifyContent: 'center'
    },
    countText: {
      color: '#fff',
      fontSize: 10
    }
});