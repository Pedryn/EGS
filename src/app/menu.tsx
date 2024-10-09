import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from 'expo-router';

export default function FormsAnuncie() {
    const router = useRouter();

    // Função que navega para a página home com o filtro de categoria
    const handleNavigateToHomeWithFilter = (categoria: string) => {
        router.push({ pathname: '/home', params: { categoria } });
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.headerText}>Ações</Text>
                <TouchableOpacity style={styles.button} onPress={() => router.push('/carrinho')}>
                    <Text style={styles.linkText}>Compras</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => router.push('/home')}>
                    <Text style={styles.linkText}>Anúncios</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => router.push('/carrinho')}>
                    <Text style={styles.linkText}>Carrinho</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => router.push('/conta')}>
                    <Text style={styles.linkText}>Pontos</Text>
                </TouchableOpacity>

                <Text style={styles.headerText}>Categorias de Produtos</Text>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => handleNavigateToHomeWithFilter('Reciclado')}
                >
                    <Text style={styles.linkText}>Reciclado</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => handleNavigateToHomeWithFilter('Biodegradável')}
                >
                    <Text style={styles.linkText}>Biodegradável</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => handleNavigateToHomeWithFilter('Reutilizável')}
                >
                    <Text style={styles.linkText}>Reutilizável</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => handleNavigateToHomeWithFilter('Artesanato')}
                >
                    <Text style={styles.linkText}>Artesanato</Text>
                </TouchableOpacity>

                <Text style={styles.headerText}>Saiba mais sobre Sustentabilidade</Text>
                <TouchableOpacity style={styles.button} onPress={() => router.push('/artigos')}>
                    <Text style={styles.linkText}>Artigos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => router.push('/importanciaSustentabilidade')}>
                    <Text style={styles.linkText}>Importância da Sustentabilidade</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => router.push('/dicas')}>
                    <Text style={styles.linkText}>Guias e dicas para um consumo mais responsável e consciente.</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 10, // Adiciona padding uniforme sem criar áreas específicas com cores diferentes
    },    
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 5,
        width: '100%',
        alignItems: 'center',
    },
    linkText: {
        fontSize: 16,
        color: '#000',
    },
});
