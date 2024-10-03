import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { db } from "../../components/config";
import { collection, getDocs } from "firebase/firestore";
import styles from "./homeStyle";
import { useRouter } from "expo-router";

// Define o tipo para os dados do produto
type Produto = {
    id: string;
    nomeProd: string;
    preco: string;
    imageUrls: string[];
    categorias: string[];
};

export default function Home() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(true);
    const [filtroCategoria, setFiltroCategoria] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
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
                console.error("Erro ao buscar produtos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProdutos();
    }, []);

    // Filtrar produtos por categoria
    const produtosFiltrados = filtroCategoria
        ? produtos.filter(produto => produto.categorias.includes(filtroCategoria))
        : produtos;

    // Função para renderizar os produtos
    const renderItem = ({ item }: { item: Produto }) => (
        <TouchableOpacity 
            style={styles.card} 
            onPress={() => router.push({ pathname: '/produto', params: { id: item.id } })}
        >
            <Image source={{ uri: item.imageUrls?.[0] }} style={styles.productImage} />
            <Text style={styles.productName}>{item.nomeProd}</Text>
            <Text style={styles.productPrice}>R$ {item.preco}</Text>
        </TouchableOpacity>
    );

    // Função para renderizar os botões de categorias
    const renderCategoriaButton = (categoria: string, iconSource: any) => (
        <TouchableOpacity 
            key={categoria}
            style={[
                styles.categoriaButton,
                filtroCategoria === categoria && styles.categoriaSelecionada 
            ]}
            onPress={() => setFiltroCategoria(filtroCategoria === categoria ? null : categoria)}
        >
            <Image source={iconSource} style={styles.categoriaIcon} />
            <Text style={styles.categoriaButtonText}>{categoria}</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.categoriasContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriasContainer}>
                    {renderCategoriaButton("Reciclado", require('../../assets/images/reciclado.png'))}
                    {renderCategoriaButton("Biodegradável", require('../../assets/images/biodegradavel.png'))}
                    {renderCategoriaButton("Artesanato", require('../../assets/images/handmade.png'))}
                    {renderCategoriaButton("Reutilizável", require('../../assets/images/reutilizavel.png'))}
                </ScrollView>
            </View>
            {/* Lista de produtos */}
            {loading ? (
                <Text style={styles.loadingMessage}>Carregando produtos...</Text>
            ) : produtosFiltrados.length === 0 ? (
                <View style={styles.centerMessageContainer}>
                    <Text style={styles.emptyMessage}>Nenhum produto encontrado</Text>
                </View>
            ) : (
                <FlatList
                    data={produtosFiltrados}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    contentContainerStyle={styles.listContainer}
                    ListEmptyComponent={() => (
                        <View style={styles.centerMessageContainer}>
                            <Text style={styles.emptyMessage}>Nenhum produto encontrado</Text>
                        </View>
                    )}
                />
            )}
        </ScrollView>
    );
}