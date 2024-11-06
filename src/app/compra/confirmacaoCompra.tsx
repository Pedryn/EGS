import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { FIREBASE_AUTH, db } from '../../../components/config';
import { doc, getDoc } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';

type RouteParams = {
    valorProduto?: number;
    pontosUsuario?: number;
};

export default function ConfirmacaoPedido() {
    const [user, setUser] = useState<any>(null);
    const [pontosUsuario, setPontosUsuario] = useState<number>(0); // Estado para armazenar os pontos do usuário
    const auth = FIREBASE_AUTH;
    const route = useRoute();
    const { valorProduto = 0 } = route.params as RouteParams; // Obtém apenas o valor do produto
    const frete = 10.0;
    const descontoPontos = pontosUsuario * 0.01;
    const totalPedido = valorProduto + frete - descontoPontos;

    useEffect(() => {
        // Obtém o usuário atual
        const currentUser = auth.currentUser;
        if (currentUser) {
            setUser(currentUser);
            fetchPontosUsuario(currentUser.uid); // Carrega os pontos do usuário do Firestore
        }
    }, []);

    // Função para buscar os pontos do usuário do Firestore
    const fetchPontosUsuario = async (userId: string) => {
        try {
            const docRef = doc(db, "pontos", userId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setPontosUsuario(data.pontos || 0); // Define os pontos do usuário no estado
            }
        } catch (error) {
            console.error("Erro ao buscar pontos do usuário:", error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                {user ? (
                    <>
                        <View style={styles.box}>
                            <Text style={styles.heading}>Enviando Para: {user.displayName || 'Nome não definido'}</Text>
                            <View style={styles.infoRow}>
                                <Text style={styles.label}>Valor:</Text>
                                <Text style={styles.value}>R$ {valorProduto.toFixed(2)}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.label}>Frete:</Text>
                                <Text style={styles.value}>R$ {frete.toFixed(2)}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.label}>Pontos:</Text>
                                <Text style={styles.value}>{pontosUsuario}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.label}>Desconto:</Text>
                                <Text style={styles.value}>- R$ {descontoPontos.toFixed(2)}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.totalLabel}>Total do pedido:</Text>
                                <Text style={styles.totalValue}>R$ {totalPedido.toFixed(2)}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Confirmar pedido</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <Text>Nenhum usuário está logado.</Text>
                )}
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
        padding: 20,
    },
    box: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 8,
        padding: 15,
        marginBottom: 20,
    },
    heading: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    email: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 10,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    label: {
        fontSize: 14,
        color: '#333',
    },
    value: {
        fontSize: 14,
        color: '#333',
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    totalValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red',
    },
    button: {
        width: '80%',
        backgroundColor: '#FFFF00',
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
