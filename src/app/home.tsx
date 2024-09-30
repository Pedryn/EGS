import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet, Dimensions } from "react-native";
import { db } from "../../components/config";
import { collection, getDocs } from "firebase/firestore";
import styles from "./homeStyle";

// Define o tipo para os dados do produto
type Produto = {
    id: string;
    nomeProd: string;
    preco: string;
    imageUrls: string[];
};

export default function Home() {
    const [produtos, setProdutos] = useState<Produto[]>([]); // Define o estado como um array de Produto
    const [loading, setLoading] = useState(true); // Estado para indicar carregamento

    // Busca inicial dos produtos
    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "produtos"));
                
                // Verifica se os dados estão sendo buscados
                console.log("Total de documentos encontrados:", querySnapshot.docs.length);

                if (querySnapshot.docs.length === 0) {
                    console.warn("Nenhum documento encontrado na coleção 'produtos'");
                }

                const produtosList = querySnapshot.docs.map((doc) => {
                    const data = doc.data();

                    // Verifica o conteúdo de cada documento
                    console.log("Dados do documento:", data);

                    // Retorna o objeto Produto mesmo que alguns campos estejam vazios
                    return {
                        id: doc.id,
                        nomeProd: data.nomeProd || '', // Se nomeProd for null ou undefined, use uma string vazia
                        preco: data.preco || '',
                        imageUrls: data.imageUrls || [], // Se imageUrls for null ou undefined, use um array vazio
                    };
                }) as Produto[]; // Filtra valores null e converte para Produto[]

                console.log("Lista de produtos final:", produtosList);

                setProdutos(produtosList);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            } finally {
                setLoading(false); // Carregamento concluído
            }
        };

        fetchProdutos();
    }, []);

    // Busca produtos novamente quando o estado 'produtos' é atualizado
    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "produtos"));
                
                // Verifica se os dados estão sendo buscados
                console.log("Total de documentos encontrados:", querySnapshot.docs.length);

                if (querySnapshot.docs.length === 0) {
                    console.warn("Nenhum documento encontrado na coleção 'produtos'");
                }

                const produtosList = querySnapshot.docs.map((doc) => {
                    const data = doc.data();

                    // Verifica o conteúdo de cada documento
                    console.log("Dados do documento:", data);

                    // Retorna o objeto Produto mesmo que alguns campos estejam vazios
                    return {
                        id: doc.id,
                        nomeProd: data.nomeProd || '', // Se nomeProd for null ou undefined, use uma string vazia
                        preco: data.preco || '',
                        imageUrls: data.imageUrls || [], // Se imageUrls for null ou undefined, use um array vazio
                    };
                }) as Produto[]; // Filtra valores null e converte para Produto[]

                console.log("Lista de produtos final:", produtosList);

                setProdutos(produtosList);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            } finally {
                setLoading(false); // Carregamento concluído
            }
        };

        fetchProdutos();
    }, [produtos]); // Dependência do estado 'produtos'

    const renderItem = ({ item }: { item: Produto }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.imageUrls?.[0] }} style={styles.productImage} />
            <Text style={styles.productName}>{item.nomeProd}</Text>
            <Text style={styles.productPrice}>R$ {item.preco}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <Text style={styles.loadingMessage}>Carregando produtos...</Text>
            ) : produtos.length === 0 ? (
                <Text style={styles.emptyMessage}>Nenhum produto encontrado</Text>
            ) : (
                <FlatList
                    data={produtos}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={2} // Define 2 colunas
                    contentContainerStyle={[styles.listContainer, { alignItems: 'center' }]} // Centraliza os itens
                />
            )}
        </View>
    );
}

