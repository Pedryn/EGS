import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    categoriaButton: {
        backgroundColor: '#B2FF82', // Cor de fundo dos botões
        paddingVertical: 10,        // Espaçamento vertical dentro do botão
        paddingHorizontal: 20,      // Espaçamento horizontal dentro do botão
        borderRadius: 10,           // Borda arredondada
        alignItems: 'center',       // Centraliza o conteúdo do botão
        justifyContent: 'center',
        marginHorizontal: 5,        // Espaçamento entre os botões
        width: 100,                 // Largura fixa para manter os botões iguais
        height: 100,                // Altura fixa para manter os botões quadrados
        shadowColor: "#000",        // Sombra
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,               // Sombras no Android
    },
    fundo: {
        backgroundColor: 'white',
    },
    categoriaIcon: {
        width: 40,   // Largura da imagem
        height: 40,  // Altura da imagem
        marginBottom: 8,  // Espaçamento entre a imagem e o texto
        resizeMode: 'contain', // Mantém a proporção da imagem ao ser redimensionada
    },
    centerMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        minHeight: 200, // Altura mínima para garantir que a mensagem não fique muito embaixo
    },
    
    categoriaButtonImage: {
        width: 50, // Defina a largura da imagem
        height: 50, // Defina a altura da imagem
        resizeMode: "contain", // Para ajustar a imagem ao espaço sem distorcer
        marginBottom: 5, // Para dar um espaço entre a imagem e o texto
    },
    categoriaButtonText: {
        fontSize: 9,                // Tamanho da fonte
        fontWeight: 'bold',          // Negrito para o texto
        color: '#000',               // Cor do texto
        textAlign: 'center',         // Alinhamento central
        marginTop: 5,                // Espaço entre a imagem e o texto
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    listContainer: {
        paddingHorizontal: 10,
    },
    card: {
        margin: 10,
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 10,
        overflow: "hidden",
        alignItems: "center",
        padding: 10,
        width: Dimensions.get('window').width / 2.3, // Mantém a largura para 2 colunas
    },
    productImage: {
        width: 150,
        height: 150,
        resizeMode: "contain",
    },
    productName: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    productPrice: {
        marginTop: 5,
        fontSize: 16,
        color: "red",
    },
    emptyMessage: {
        marginTop: 50,
        fontSize: 18,
        textAlign: "center",
    },
    loadingMessage: {
        marginTop: 50,
        fontSize: 18,
        textAlign: "center",
    },
    categoriaSelecionada: {
        backgroundColor: '#28a745', // Cor de fundo diferente para destacar a seleção
        borderColor: '#808080',     // Borda para dar destaque
        borderWidth: 2,             // Largura da borda para deixar mais evidente
    },    
    categoriasContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        paddingHorizontal: 10,
    },
});

export default styles;