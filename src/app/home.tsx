import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import { db } from "../../components/config";
import { collection, getDocs } from "firebase/firestore";
import styles from "./homeStyle";
import { useRouter, useLocalSearchParams } from "expo-router";
import { NavigationProp } from "@react-navigation/native";

type Produto = {
    id: string;
    nomeProd: string;
    preco: number;
    imageUrls: string[];
    categorias: string[];
};

interface RouterProps {
    navigation: NavigationProp<any, any>
}

const Home = ({ navigation }: RouterProps) => {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [filtroCategoria, setFiltroCategoria] = useState<string | null>(null);
    const router = useRouter();
    const { categoria } = useLocalSearchParams();

    const fetchProdutos = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "produtos"));
            const produtosList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                nomeProd: doc.data().nomeProd || '',
                preco: doc.data().preco || '',
                imageUrls: doc.data().imageUrls || [],
                categorias: doc.data().categorias || [],
            })) as Produto[];

            setProdutos(produtosList);
        } catch (error) {
            console.log("Erro ao buscar produtos:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchProdutos();
    }, []);

    useEffect(() => {
        if (categoria) {
            setFiltroCategoria(categoria as string);
        }
    }, [categoria]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchProdutos();
    }, []);

    const produtosFiltrados = filtroCategoria
        ? produtos.filter(produto => produto.categorias.includes(filtroCategoria))
        : produtos;

    const renderItem = ({ item }: { item: Produto }) => (
        <TouchableOpacity 
            style={styles.card} 
            onPress={() => router.push({ pathname: '/produto', params: { id: item.id } })}
        >
            <Image source={{ uri: item.imageUrls?.[0] }} style={styles.productImage} />
            <Text style={styles.productName}>{item.nomeProd}</Text>
            <Text style={styles.productPrice}>R$ {item.preco.toFixed(2)}</Text>
        </TouchableOpacity>
    );

    const renderCategoriaButton = (categoria: string, iconSource: any) => (
        <TouchableOpacity 
            key={categoria}
            style={[styles.categoriaButton, filtroCategoria === categoria && styles.categoriaSelecionada]}
            onPress={() => setFiltroCategoria(filtroCategoria === categoria ? null : categoria)}
        >
            <Image source={iconSource} style={styles.categoriaIcon} />
            <Text style={styles.categoriaButtonText}>{categoria}</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView 
            style={styles.fundo}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <View style={styles.container}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriasContainer}>
                    {renderCategoriaButton("Reciclado", require('../../assets/images/reciclado.png'))}
                    {renderCategoriaButton("Biodegradável", require('../../assets/images/biodegradavel.png'))}
                    {renderCategoriaButton("Artesanato", require('../../assets/images/handmade.png'))}
                    {renderCategoriaButton("Reutilizável", require('../../assets/images/reutilizavel.png'))}
                </ScrollView>

                {loading ? (
                    <Text style={styles.loadingMessage}>Carregando produtos...</Text>
                ) : produtosFiltrados.length === 0 ? (
                    <Text style={styles.emptyMessage}>Nenhum produto encontrado</Text>
                ) : (
                    <FlatList
                        data={produtosFiltrados}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: 'flex-start' }}
                        contentContainerStyle={styles.listContainer}
                    />
                )}
            </View>
        </ScrollView>
    );
};

export default Home;
