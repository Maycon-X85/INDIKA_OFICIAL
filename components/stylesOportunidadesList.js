import { StyleSheet, StatusBar } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  cellNome: {
    flex: 2,
  },
  cellLink: {
    flex: 3,
    marginHorizontal: 8,
  },
  textNome: {
    fontSize: 14,
    fontWeight: '600',
    color: '#263238',
  },
  textLink: {
    fontSize: 12,
    color: '#1565C0',
  },
  buttonCopy: {
    backgroundColor: '#1565C0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonCopyText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginHorizontal: 16,
  },
  empty: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#999',
    fontSize: 14,
  },
  headerContainer: {
    backgroundColor: '#1e1e1e',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 8,
    resizeMode: 'contain',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});