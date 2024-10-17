import { StyleSheet, View, Text } from "react-native";

export default function ImportanciaSustentabilidade(){
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>A Importância da Sustentabilidade para um Futuro Melhor</Text>
            <Text style={styles.texto}>Em um mundo cada vez mais impactado pelas mudanças climáticas e pela degradação ambiental, a sustentabilidade se tornou um dos pilares essenciais para garantir o bem-estar das gerações atuais e futuras. A sustentabilidade vai além de preservar os recursos naturais: é um compromisso com práticas responsáveis, equilibrando as necessidades humanas com a capacidade do planeta de se regenerar.</Text>
            <Text style={styles.texto}>Adotar uma vida sustentável envolve escolhas conscientes que reduzem o impacto negativo sobre o meio ambiente. Isso inclui desde o consumo de produtos que utilizam materiais reciclados ou biodegradáveis até a preferência por empresas que respeitam o ciclo de vida dos seus produtos, minimizando desperdícios e utilizando energia renovável.</Text>
            <Text style={styles.texto}>Em nossa loja, acreditamos que cada pequeno gesto conta. Ao escolher produtos sustentáveis, você está contribuindo para a redução da poluição, a conservação de habitats naturais e a promoção de um modelo econômico mais justo e responsável. Juntos, podemos transformar o consumo em uma força positiva para o planeta, mantendo um equilíbrio saudável entre a natureza e a sociedade.</Text>
            <Text style={styles.texto}>A sustentabilidade é o caminho para um futuro onde desenvolvimento e preservação caminham lado a lado. E isso começa com você, fazendo escolhas que respeitam o meio ambiente, apoiam a economia local e protegem os recursos naturais para as próximas gerações.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titulo:{
        fontWeight: 'bold',
        fontSize: 20,
        width: '90%'
    },
    texto:{
        width: '90%', // Define uma largura fixa para todos os itens
        marginVertical: 10,
        textAlign: 'justify' // Alinha o texto de forma justificada
    },
});