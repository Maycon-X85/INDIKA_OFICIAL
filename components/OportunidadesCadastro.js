import { StatusBar, StyleSheet } from 'react-native';

export default StyleSheet.create({
  /** Degradê de fundo (pode ser aplicado no componente) */
  gradientBackground: {
    flex: 1,
  },

  /** SafeArea / container principal */
  screenContainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
    backgroundColor: '#f0f2f5',
  },

  /** Cabeçalho preto com logo e título */
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

  /** Container rolável do formulário */
  formScrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 80, // espaço extra para o rodapé
  },

  /** Card opcional ao redor de grupos de campos */
  fieldCard: {
    backgroundColor: '#fafafa',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },

  /** Labels acima dos inputs */
  inputLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#263238',
    marginBottom: 4,
  },

  /** Inputs padrão */
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 12,
    marginBottom: 20,
    fontSize: 14,
    color: '#000',

    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,

    borderWidth: 1,
    borderColor: '#ddd',
  },
  textInputFocused: {
    borderColor: '#1565C0',
    borderWidth: 2,
  },

  /** Textarea */
  textArea: {
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 120,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 20,
    fontSize: 14,
    color: '#000',
    textAlignVertical: 'top',

    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,

    borderWidth: 1,
    borderColor: '#ddd',
  },

  /** Container específico para o botão de comissão */
  commissionContainer: {
    backgroundColor: '#fff',
    width: 150,
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 12,
    marginBottom: 20,

    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,

    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
  },
  commissionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#546e7a',
  },

  /** Grupo de checkboxes */
  checkboxGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 3,
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: '#1e1e1e',
    borderColor: '#1e1e1e',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
  },

  /** Rodapé “sticky” com botão Salvar */
  saveButtonFooter: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    paddingVertical: 10,
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },

  /** Botões genéricos */
  button: {
    backgroundColor: '#1565C0',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  bottomButton: {
    marginRight: 20,
    backgroundColor: '#1565C0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  bottomButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  /** Modal Android / overlay */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  modalButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 4,
  },
});