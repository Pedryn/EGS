import { StyleSheet, View, Text, ScrollView } from "react-native";

export default function Dicas(){
    return (
        <ScrollView style={styles.fundo}>
            <View style={styles.container}>
                <Text style={styles.titulo}>Dicas para um Consumo Responsável e Consciente</Text>
                <Text style={styles.texto}>O consumo responsável vai além de simplesmente comprar produtos. Trata-se de entender o impacto de nossas escolhas no meio ambiente, na sociedade e em nossa qualidade de vida. Adotar hábitos de consumo mais conscientes é um passo fundamental para criar um futuro mais sustentável e equilibrado. A seguir, estão algumas práticas que podem guiar essa transformação</Text>
                <Text style={styles.subtitulo}>Reciclagem</Text>
                <Text style={styles.texto}>A reciclagem é uma das maneiras mais simples e eficazes de reduzir o impacto ambiental. Separar os resíduos corretamente ajuda a diminuir a quantidade de lixo enviado para aterros sanitários e a reutilizar materiais valiosos, como papel, plástico, vidro e metal. Além de proteger os recursos naturais, a reciclagem também economiza energia e reduz a emissão de gases de efeito estufa. Uma dica prática é manter recipientes específicos para cada tipo de material em casa ou no local de trabalho, facilitando o processo de separação e descarte adequado.</Text>
                <Text style={styles.subtitulo}>Sustentabilidade</Text>
                <Text style={styles.texto}>Optar por produtos sustentáveis é uma forma direta de apoiar práticas que respeitam o meio ambiente e promovem o uso consciente dos recursos. Produtos sustentáveis são feitos com materiais renováveis, têm uma cadeia de produção ética e muitas vezes priorizam a redução do desperdício. A sustentabilidade abrange desde o uso de embalagens biodegradáveis até a escolha de empresas que investem em fontes de energia limpa. Consumir de forma sustentável é pensar no longo prazo, considerando o ciclo de vida completo dos produtos que compramos.</Text>
                <Text style={styles.subtitulo}>Artesanato</Text>
                <Text style={styles.texto}>O artesanato valoriza o trabalho manual e resgata técnicas tradicionais, muitas vezes utilizando materiais locais e sustentáveis. Ao adquirir produtos artesanais, estamos apoiando a economia local e promovendo a preservação cultural, além de contribuir para um sistema de produção em menor escala, que gera menos impacto ambiental. Peças artesanais são únicas e feitas com cuidado, tornando cada compra uma forma de estimular o comércio justo e reduzir a dependência de produtos industrializados em massa.</Text>
                <Text style={styles.subtitulo}>Produtos Reutilizáveis</Text>
                <Text style={styles.texto}>Uma das maneiras mais eficazes de reduzir o consumo de recursos naturais é investir em produtos reutilizáveis. Garrafas de água, sacolas de tecido e potes de vidro são exemplos que substituem itens descartáveis e ajudam a diminuir a produção de resíduos. Além de serem mais duráveis, os produtos reutilizáveis geralmente possuem um impacto ambiental muito menor ao longo do tempo, pois evitam o desperdício e diminuem a necessidade de fabricar novas peças. Adotar esses itens no dia a dia é uma maneira prática de reduzir o lixo gerado e contribuir para um planeta mais limpo.</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 30,
    },
    titulo:{
        fontWeight: 'bold',
        fontSize: 30,
        width: '90%'
    },
    texto:{
        width: '90%', // Define uma largura fixa para todos os itens
        marginVertical: 10,
        textAlign: 'justify' // Alinha o texto de forma justificada
    },
    fundo: {
        backgroundColor: '#fff'
    },
    subtitulo: {
        fontWeight: 'bold',
        fontSize: 20,
        width: '90%'
    },
});