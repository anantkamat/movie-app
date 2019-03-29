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
  RightIcon: {
    paddingRight: 10
  },
  renderItem: {
    backgroundColor: '#FFF',
    paddingHorizontal: 10
  }
});