import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  hint: {
    position: 'absolute',
    bottom: 40,
    textAlign: 'center',
    color: '#999',
  },
});
