import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../components/config';
import { AntDesign } from '@expo/vector-icons'; // Ícone para o dropdown

type Produto = {
    nomeProd: string;
    preco: string;
    imageUrls: string[];
    descricao?: string;
    categorias?: string[]; // Atualizado para array de categorias
    telefone?: string;
    dimensoes?: string;
    certificacoes?: string;
    materiais?: string;
    fabricante?: string;
    [key: string]: any; // Para outros possíveis campos
};

const Produto = () => {
    const { id } = useLocalSearchParams(); // Pegue o id do produto da rota
    const [produto, setProduto] = useState<Produto | null>(null);
    const [loading, setLoading] = useState(true);
    const [isDetailsVisible, setIsDetailsVisible] = useState(false); // Controle de visibilidade do dropdown
    const screenWidth = Dimensions.get('window').width; // Largura da tela

    useEffect(() => {
        const fetchProduto = async () => {
            if (id) {
                try {
                    const docRef = doc(db, 'produtos', id as string);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const produtoData = docSnap.data() as Produto;
                        console.log('Dados do produto:', produtoData); // Log para verificar os dados
                        setProduto(produtoData); // Define os dados do produto
                    } else {
                        console.log('Produto não encontrado!');
                    }
                } catch (error) {
                    console.error('Erro ao buscar produto:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchProduto();
    }, [id]);

    if (loading) {
        return <Text>Carregando...</Text>;
    }

    if (!produto) {
        return <Text>Produto não encontrado</Text>;
    }

    // Função para alternar o dropdown
    const toggleDetails = () => {
        setIsDetailsVisible(!isDetailsVisible);
    };

    return (
        <ScrollView style={styles.container}>
            {/* Carrossel de Imagens */}
            <FlatList
                data={produto.imageUrls}
                renderItem={({ item }) => (
                    <Image source={{ uri: item }} style={[styles.productImage, { width: screenWidth }]} />
                )}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                snapToAlignment="center"
                decelerationRate="fast"
            />

            {/* Preço e Nome */}
            <Text style={styles.productPrice}>R$ {produto.preco}</Text>
            <Text style={styles.productName}>{produto.nomeProd}</Text>
            <Text style={styles.detailText}>Telefone para contato com o vendedor: {produto.telefone}</Text>
            
            {/* Botão Dropdown para Detalhes */}
            <TouchableOpacity style={styles.dropdownButton} onPress={toggleDetails}>
                <Text style={styles.dropdownText}>Detalhes do Produto</Text>
                <AntDesign name={isDetailsVisible ? "up" : "down"} size={20} color="black" />
            </TouchableOpacity>

            {/* Detalhes do Produto */}
            {isDetailsVisible && (
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailText}>Descrição: {produto.descricao}</Text>

                    {/* Exibir as categorias como uma lista */}
                    {produto.categorias && produto.categorias.length > 0 ? (
                        <Text style={styles.detailText}>
                            Categorias: {produto.categorias.join(', ')}
                        </Text>
                    ) : (
                        <Text style={styles.detailText}>Categorias não encontradas</Text> // Adicionado para depuração
                    )}

                    <Text style={styles.detailText}>Dimensões: {produto.dimensoes}</Text>
                    <Text style={styles.detailText}>Certificações: {produto.certificacoes}</Text>
                    <Text style={styles.detailText}>Materiais: {produto.materiais}</Text>
                    <Text style={styles.detailText}>Fabricante: {produto.fabricante}</Text>
                </View>
            )}
            <View style={styles.footerSpace} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    productImage: {
        height: 300,
        resizeMode: 'contain',
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 8,
        textAlign: 'center',
    },
    productPrice: {
        fontSize: 20,
        color: '#ff0000',
        textAlign: 'center',
        marginTop: 10,
    },
    dropdownButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        marginVertical: 10,
        borderRadius: 5,
    },
    dropdownText: {
        fontSize: 18,
        fontWeight: '500',
    },
    detailsContainer: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        marginTop: 0,
    },
    detailText: {
        fontSize: 16,
        marginVertical: 4,
    },
    footerSpace: {
        height: 50, // Define a altura do espaço extra
    },
});

export default Produto;
