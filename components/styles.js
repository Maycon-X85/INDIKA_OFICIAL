// src/components/styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // --- Estilos globais existentes ---
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#1c1c1c',
    padding: 20,
  },
  container: {
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 40,
  },
  form: {
    width: '100%',
    marginTop: 10,
  },
  label: {
    color: '#1e1e70',
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 5,
    fontSize: 12,
  },
  input: {
    backgroundColor: '#d9d9d9',
    borderRadius: 4,
    height: 45,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#d6d6d6',
    paddingVertical: 18,
    marginVertical: 8,
    alignItems: 'center',
    borderRadius: 4,
    elevation: 3,
    width: '100%',
  },

  buttonText: {
    color: '#1e1e70',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bottomButton: {
    marginLeft: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#424242',
    borderRadius: 4,
  },
  bottomButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  // --- Estilos para home ---
  homeContainer: {
    flex: 1,
    backgroundColor: '#e0e0e0',
  },
  header: {
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
    paddingVertical: 30,
  },
  homeTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  homeLogo: {
    width: 70,
    height: 70,
    marginBottom: 5,
  },
  buttonArea: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  footer: {
    backgroundColor: '#1e1e1e',
    paddingVertical: 15,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    width: '100%',
  },
  halfInput: {
    flex: 1,
  },
  smallInput: {
    width: 80,
  },
  formContainer: {
    backgroundColor: '#e0e0e0',
    padding: 20,
    paddingBottom: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  halfInputWrapper: {
    flex: 1,
  },
  tinyInputWrapper: {
    flex: 1,
    minWidth: 75,
  },
  flex70: {
    flex: 7,
    paddingRight: 5,
  },
  flex30: {
    flex: 3,
    paddingLeft: 5,
  },
});

export default styles;
