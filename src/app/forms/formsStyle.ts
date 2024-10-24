// FormsAnuncieStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#B2FF82',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 20,
    },
    addFotoContainer: {
        alignItems: 'center', // Centraliza o conteúdo horizontalmente
        marginBottom: 20,
    },
    addFoto: {
        width: 100,
        height: 100,
        marginBottom: 20,
      },
    buttonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    container: {
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000',
    },
    label: {
        fontSize: 16,
        alignSelf: 'flex-start',
        marginBottom: 5,
        color: '#000',
    },
    input: {
        width: '100%',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 25,
        padding: 10,
        marginBottom: 15,
    },
    link: {
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold',
        marginTop: 20,
        textDecorationLine: 'underline',
    },
    removeImageButton: {
        position: 'absolute',
        top: -10,
        right: -10,
        backgroundColor: 'white',
        borderRadius: 12,
    },
    checkboxContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center', // Centraliza as categorias na tela
        marginVertical: 10,
    },
    checked: {
        backgroundColor: '#28a745',
        color: '#fff',
        padding: 10,
        marginRight: 10,  // Espaçamento horizontal
        marginBottom: 10, // Espaçamento vertical entre as linhas
        borderRadius: 5,
    },
    unchecked: {
        backgroundColor: '#fff',
        color: '#000',
        borderWidth: 1,
        borderColor: '#28a745',
        padding: 10,
        marginRight: 10,  // Espaçamento horizontal
        marginBottom: 10, // Espaçamento vertical entre as linhas
        borderRadius: 5,
    },
    
});

export default styles;
