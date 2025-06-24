import { StatusBar, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    // Fundo do formulário agora é usado apenas como padding
    formContainer: {
        padding: 20,
        paddingBottom: 50, 
    },

    // Inputs elevados, cantos arredondados
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

        borderWidth: 1,        // borda suave por padrão
        borderColor: '#ddd',
    },
    textInputFocused: {
        borderColor: '#1565C0', // borda azul ao focar
        borderWidth: 2,
    },
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

    // Caixa “card” opcional em volta dos pares de input
    fieldCard: {
        backgroundColor: '#fafafa',
        borderRadius: 8,
        padding: 10,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },

    // Rodapé “sticky” com botão Salvar
    saveButtonFooter: {
        width: '100%',
        backgroundColor: '#fff',
        paddingVertical: 10,
        alignItems: 'flex-end',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
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

    // Ajustes no header
    header: {
        backgroundColor: '#1e1e1e',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    homeLogo: {
        width: 50,
        height: 50,
        marginRight: 10,
        resizeMode: 'contain',
    },
    homeTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },

    gradientBackground: {
        flex: 1,
    },

    // Container principal da Home (sobre o degradê)
    homeContainer: {
        flex: 1,
        paddingTop: StatusBar.currentHeight || 0, // evita que o conteúdo fique atrás da status bar no Android
    },

    // Header customizado da Home, compacto (altura 80)
    homeHeader: {
        backgroundColor: '#1e1e1e',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 80, // menor que o header da tela de Cadastro
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    homeLogo: {
        width: 50,
        height: 50,
        marginRight: 8,
        resizeMode: 'contain',
    },
    homeTitle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },

    // Área central com botões ("cards"), centralizada verticalmente
    homeButtonArea: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    homeButton: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 14,
        marginVertical: 10,
        alignItems: 'center',
        elevation: 3, // sombra Android
        shadowColor: '#000', // sombra iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    homeButtonText: {
        color: '#1e1e70', // azul escuro para combinar com o esquema de cores
        fontSize: 18,
        fontWeight: 'bold',
    },

    // Rodapé fixo com botão “SAIR”
    homeFooter: {
        backgroundColor: '#1e1e1e',
        paddingVertical: 12,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#333',
    },
    homeFooterText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    // Botões de Check Box usados na tela cadastro
    checkboxGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
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
});

export default styles;
