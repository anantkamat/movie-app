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
  renderItem: {
    backgroundColor: '#FFF',
    paddingHorizontal: 10
  },
  emptyView: {
    flex: 1,
    height: height * 0.85,
    alignItems: 'center',
    justifyContent:'center'
  },
  emptyIcon: {
    fontSize: 70,
    color: 'red'
  },
  emptyButton :{
    paddingHorizontal: 10,
    alignSelf: 'center',
    marginTop: 10
  },
  emptyText: {
    color: '#fff'
  }
});