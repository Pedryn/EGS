import { StyleSheet, View, Text, TouchableOpacity, Linking, ScrollView } from "react-native";

// Lista de artigos com títulos e URLs
const artigos = [
    {
        id: 1,
        titulo: "Desenvolvimento de produtos sustentáveis: o papel da gestão de pessoas",
        url: "https://www.scielo.br/j/rap/a/Tpp54sfh9NMpLVMyqkRvdkS/"
    },
    {
        id: 2,
        titulo: "Saiba o que são produtos sustentáveis e como eles são uma aposta do mercado",
        url: "https://bagy.com.br/blog/produtos-sustentaveis/"
    },
    {
        id: 3,
        titulo: "O que são produtos sustentáveis e como começar a vender?",
        url: "https://www.nuvemshop.com.br/blog/produtos-sustentaveis-para-vender/"
    }
    // Adicione mais artigos aqui
];

export default function Artigos() {
    const openArticle = (url: string) => {
        Linking.openURL(url);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text>Pagina Artigos</Text>
            {artigos.map((artigo) => (
                <TouchableOpacity key={artigo.id} onPress={() => openArticle(artigo.url)} style={styles.articleContainer}>
                    <Text style={styles.artigos}>{artigo.titulo}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        alignItems: 'center', // Centraliza os itens horizontalmente
        justifyContent: 'center',
        padding: 10
    },
    articleContainer: {
        width: '90%', // Define uma largura fixa para todos os itens
        marginVertical: 10
    },
    artigos: {
        color: 'blue',
        textDecorationLine: 'underline',
        textAlign: 'justify' // Alinha o texto de forma justificada
    },
});
