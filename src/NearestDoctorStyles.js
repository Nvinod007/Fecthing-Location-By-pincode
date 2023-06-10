import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    backgroundColor:'#afb',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 50,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  fetchButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    backgroundColor:'#88b2bd',
    marginTop: 10,
    alignItems: 'center',
    paddingLeft:10,
    paddingRight:10,
    borderRadius:10,
  },
  resultText: {
    color:'#0511f5',
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  doctorDataContainer:{
    padding:10,

  },
});
