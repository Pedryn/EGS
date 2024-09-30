import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../components/config'; // Importe a configuração do Firebase

type Produto = {
    nomeProd: string;
    preco: string;
    imageUrls: string[];
    descricao?: string; // Exemplo de campo adicional
    categoria?: string;
    [key: string]: any; // Para outros possíveis campos
};

const Produto = () => {
    const { id } = useLocalSearchParams(); // Pegue o id do produto da rota
    const [produto, setProduto] = useState<Produto | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduto = async () => {
            if (id) {
                try {
                    const docRef = doc(db, 'produtos', id as string);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setProduto(docSnap.data() as Produto); // Define os dados do produto
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

    return (
        <View style={styles.container}>
            <Image source={{ uri: produto.imageUrls[0] }} style={styles.productImage} />
            <Text style={styles.productName}>{produto.nomeProd}</Text>
            <Text style={styles.productPrice}>R$ {produto.preco}</Text>
            <Text style={styles.productDescription}>{produto.descricao}</Text>
            <Text style={styles.productCategory}>{produto.categoria}</Text>
            {/* Adicione mais campos conforme necessário */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
    },
    productImage: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    productPrice: {
        fontSize: 20,
        color: '#888',
    },
    productDescription: {
        fontSize: 16,
        marginVertical: 8,
    },
    productCategory: {
        fontSize: 14,
        color: '#666',
    },
});

export default Produto;
