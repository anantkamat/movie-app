import { StyleSheet, Dimensions } from 'react-native';
const { height } = Dimensions.get('window')

export default styles = StyleSheet.create({
  headerTitleStyle: {
    color: 'rgba(0, 0, 0, 0.8)',
    textAlign: 'center',
    alignSelf: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  leftIcon: {
    paddingLeft: 15
  },
  RightIcon: {
    paddingRight: 10
  },
  likeButton: {
    paddingTop: 15
  },
  image: {
    height: 200,
    width: null,
    flex: 1
  }
});