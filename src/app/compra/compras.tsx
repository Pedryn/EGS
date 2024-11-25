import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, Image, StyleSheet, RefreshControl } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, FIREBASE_AUTH } from '../../../components/config';

type CompraItem = {
    id: string;
    nomeProduto: string;
    precoProduto: string;
    imageUrls: string[];
    quantidade: number;
    endereco?: {
        numero: string;
        rua: string;
        complemento?: string;
        bairro: string;
        userId: string;
        cep: string;
        pais: string;
        cidade: string;
        estado: string;
    };
};

const Compra = () => {
    const [CompraItems, setCompraItems] = useState<CompraItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchCompra = async () => {
        const user = FIREBASE_AUTH.currentUser;
        if (user) {
            const userId = user.uid;
            try {
                const q = query(collection(db, 'compra'), where('userId', '==', userId));
                const querySnapshot = await getDocs(q);
                const items = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as CompraItem[];
                setCompraItems(items);
            } catch (error) {
                console.error('Erro ao buscar itens do Compra:', error);
            } finally {
                setLoading(false);
                setRefreshing(false);
            }
        }
    };

    useEffect(() => {
        fetchCompra();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchCompra();
    }, []);

    const renderItem = ({ item }: { item: CompraItem }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.imageUrls?.[0] }} style={styles.productImage} />
            <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.nomeProduto}</Text>
                <Text style={styles.productPrice}>R$ {item.precoProduto}</Text>

                {/* Verifica se há endereço e exibe */}
                {item.endereco && (
                    <View style={styles.addressContainer}>
                        <Text style={styles.addressTitle}>Endereço de entrega:</Text>
                        <Text style={styles.addressText}>
                            {item.endereco.rua}, {item.endereco.numero}
                        </Text>
                        {item.endereco.complemento && (
                            <Text style={styles.addressText}>Complemento: {item.endereco.complemento}</Text>
                        )}
                        <Text style={styles.addressText}>
                            {item.endereco.bairro}, {item.endereco.cidade} - {item.endereco.estado}
                        </Text>
                        <Text style={styles.addressText}>CEP: {item.endereco.cep}</Text>
                        <Text style={styles.addressText}>{item.endereco.pais}</Text>
                    </View>
                )}
            </View>
        </View>
    );

    if (loading) {
        return <Text>Carregando...</Text>;
    }

    if (CompraItems.length === 0) {
        return <Text>Seu histórico de compras está vazio</Text>;
    }

    return (
        <FlatList
            data={CompraItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
        padding: 16,
        backgroundColor: '#fff',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#f9f9f9',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
        elevation: 3,
    },
    productImage: {
        width: 80,
        height: 80,
        resizeMode: 'cover',
        borderRadius: 8,
        marginRight: 16,
    },
    productDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    productName: {
        fontSize: 18,
        fontWeight: '600',
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 4,
    },
    productQuantity: {
        fontSize: 14,
        color: '#757575',
        marginTop: 4,
    },
    addressContainer: {
        marginTop: 12,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    addressTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    addressText: {
        fontSize: 14,
        color: '#757575',
    },
});

export default Compra;
