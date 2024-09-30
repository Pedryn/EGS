import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    listContainer: {
        justifyContent: "space-between",
        paddingHorizontal: 10,
        flexDirection: 'row',
        flexWrap: 'wrap', // Permite que os itens quebrem para a próxima linha
    },
    card: {
        margin: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        overflow: "hidden",
        alignItems: "center",
        padding: 10,
        width: Dimensions.get('window').width / 2.3, // Calcula a largura dos itens com base na tela
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
});

export default styles;