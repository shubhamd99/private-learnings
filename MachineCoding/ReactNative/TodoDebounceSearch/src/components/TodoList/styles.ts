import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 40,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  todoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginRight: 12,
  },
  checkboxActive: {
    backgroundColor: '#007AFF',
  },
  todoText: {
    fontSize: 16,
    color: '#333',
    flexShrink: 1,
  },
  todoTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  editInput: {
    fontSize: 16,
    flex: 1,
    padding: 0,
    color: '#000',
    borderBottomWidth: 1,
    borderColor: '#007AFF',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  actionTextBlue: {
    color: '#007AFF',
    fontWeight: '600',
  },
  actionTextRed: {
    color: '#E74C3C',
    fontWeight: '600',
  },
  deleteButton: {
    marginLeft: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
    fontSize: 16,
  },
});
