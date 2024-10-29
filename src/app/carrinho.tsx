import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Alert, RefreshControl } from 'react-native';
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db, FIREBASE_AUTH } from '../../components/config'; 
import Icon from 'react-native-vector-icons/MaterialIcons';

type CarrinhoItem = {
    id: string;
    nomeProd: string;
    preco: string;
    imageUrls: string[];
    quantidade: number;
};

const Carrinho = () => {
    const [carrinhoItems, setCarrinhoItems] = useState<CarrinhoItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchCarrinho = async () => {
        const user = FIREBASE_AUTH.currentUser;
        if (user) {
            const userId = user.uid;
            try {
                const q = query(collection(db, 'carrinho'), where('userId', '==', userId));
                const querySnapshot = await getDocs(q);
                const items = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as CarrinhoItem[];
                setCarrinhoItems(items);
            } catch (error) {
                console.error('Erro ao buscar itens do carrinho:', error);
            } finally {
                setLoading(false);
                setRefreshing(false);
            }
        }
    };

    useEffect(() => {
        fetchCarrinho();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchCarrinho();
    }, []);

    const handleRemoveItem = async (itemId: string) => {
        try {
            const itemRef = doc(db, 'carrinho', itemId);
            await deleteDoc(itemRef);
            setCarrinhoItems((prevItems) => prevItems.filter(item => item.id !== itemId));
            Alert.alert("Sucesso", "Item removido do carrinho.");
        } catch (error) {
            console.error('Erro ao remover item do carrinho:', error);
            Alert.alert("Erro", "Não foi possível remover o item.");
        }
    };

    const renderItem = ({ item }: { item: CarrinhoItem }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.imageUrls?.[0] }} style={styles.productImage} />
            <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.nomeProd}</Text>
                <Text style={styles.productPrice}>R$ {item.preco}</Text>
                <Text style={styles.productQuantity}>Quantidade: {item.quantidade}</Text>
            </View>
            <TouchableOpacity onPress={() => handleRemoveItem(item.id)} style={styles.removeButton}>
                <Icon name="delete" size={24} color="#d9534f" />
            </TouchableOpacity>
        </View>
    );

    if (loading) {
        return <Text>Carregando...</Text>;
    }

    if (carrinhoItems.length === 0) {
        return <Text>Seu carrinho está vazio</Text>;
    }

    return (
        <FlatList
            data={carrinhoItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
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
        alignItems: 'center',
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
    removeButton: {
        marginLeft: 16,
    },
});

export default Carrinho;
