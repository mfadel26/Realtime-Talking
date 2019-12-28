import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#ddd6f3',
    width: '70%',
    borderRadius: 10,
    marginBottom: 15,
  },
  icon: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 22,
    color: '#5F6D7A',
  },
  description: {
    marginTop: 10,
    textAlign: 'center',
    color: '#A9A9A9',
    fontSize: 16,
    margin: 40,
  },
  options: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  buttonContainer: {
    height: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 160,
    borderRadius: 20,
  },
  authButton: {
    backgroundColor: '#6441A5',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  center: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bottomTextLink: {
    color: '#fff',
    fontWeight: 'bold',
  },
  menuBottom: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 17,
    borderRadius: 10,
alignSelf:"stretch",
    backgroundColor: 'black',
  },
});

export default styles;