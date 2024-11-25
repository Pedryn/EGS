import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import { FIREBASE_AUTH, db } from '../../../components/config';
import { doc, getDoc, collection, query, where, getDocs, updateDoc, addDoc } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'; // Importe useNavigation

type RouteParams = {
    preco?: number;
    pontosUsuario?: number;
    nomeProd?: string;
    imageUrls?: string[];
};

export default function ConfirmacaoCompra() {
    const [user, setUser] = useState<any>(null);
    const [pontosUsuario, setPontosUsuario] = useState<number>(0); // Estado para armazenar os pontos do usuário
    const [endereco, setEndereco] = useState<any>(null); // Estado para armazenar o endereço do usuário
    const [loadingEndereco, setLoadingEndereco] = useState(true); // Estado para indicar carregamento do endereço
    const auth = FIREBASE_AUTH;
    const route = useRoute();
    const { preco = 0, nomeProd = 'Produto', imageUrls = [] } = route.params as RouteParams; // Recebe os dados do produto
    const frete = 10.0;
    const descontoPontos = pontosUsuario * 0.01;
    const totalPedido = preco + frete - descontoPontos;
    const navigation = useNavigation(); // Adicione esta linha

    useEffect(() => {
        // Obtém o usuário atual
        const currentUser = auth.currentUser;
        if (currentUser) {
            setUser(currentUser);
            fetchPontosUsuario(currentUser.uid); // Carrega os pontos do usuário do Firestore
            fetchEnderecoUsuario(currentUser.uid); // Carrega o endereço do usuário do Firestore
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

    // Função para buscar o endereço do usuário do Firestore
    const fetchEnderecoUsuario = async (userId: string) => {
        try {
            const enderecoRef = collection(db, "enderecos");
            const q = query(enderecoRef, where("userId", "==", userId));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const enderecoData = querySnapshot.docs[0].data();
                setEndereco(enderecoData); // Define o endereço no estado
            } else {
                setEndereco(null); // Nenhum endereço encontrado
            }
        } catch (error) {
            console.error("Erro ao buscar endereço do usuário:", error);
        }
        setLoadingEndereco(false);
    };

    // Função para confirmar o pedido e atualizar pontos do usuário
    const confirmarPedido = async () => {
        try {
            if (user) {
                const novosPontos = 0;
                const pontosRef = doc(db, "pontos", user.uid);

                // Atualiza os pontos do usuário
                await updateDoc(pontosRef, { pontos: novosPontos });

                // Adiciona os dados da compra na coleção "compra"
                const compraData = {
                    userId: user.uid,
                    nomeUsuario: user.displayName || 'Nome não definido',
                    nomeProduto: nomeProd,
                    precoProduto: preco,
                    frete: frete,
                    desconto: descontoPontos,
                    totalPedido: totalPedido,
                    endereco: endereco || 'Endereço não cadastrado',
                    dataCompra: new Date(),
                    imageUrls: imageUrls,
                };

                await addDoc(collection(db, "compra"), compraData);

                // Navegar para a próxima tela
                navigation.navigate('pixprov', { totalPedido: totalPedido.toFixed(2) });

                Alert.alert("Pedido confirmado!", "Sua compra foi realizada com sucesso.");
            }
        } catch (error) {
            console.error("Erro ao confirmar o pedido:", error);
            Alert.alert("Erro", "Não foi possível confirmar o pedido.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                {user ? (
                    <>
                        {/* bloco preço */}
                        <View style={styles.box}>
                            <Text style={styles.heading}>Enviando Para: {user.displayName || 'Nome não definido'}</Text>
                            <Text style={styles.productName}>{nomeProd}</Text>
                            <View style={styles.infoRow}>
                                <Text style={styles.label}>Valor:</Text>
                                <Text style={styles.value}>R$ {preco.toFixed(2)}</Text>
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
                        {/* bloco endereco */}
                        <Text style={styles.productName}>Endereço de entrega:</Text>
                        <View style={styles.box}>
                            <View>
                                {loadingEndereco ? (
                                    <Text>Carregando endereço...</Text>
                                ) : endereco ? (
                                    <Text style={styles.addressText}>
                                        {endereco.rua}, {endereco.numero}, {endereco.bairro}, {endereco.cidade} - {endereco.estado}, {endereco.cep}
                                    </Text>
                                ) : (
                                    <Text>Endereço não cadastrado</Text>
                                )}
                            </View>
                        </View>
                        {/* bloco pagamento */}
                        <Text style={styles.productName}>Modo de pagamento:</Text>
                        <View style={styles.box}>
                            <Text style={styles.totalLabel}>PIX</Text>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={confirmarPedido}>
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
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
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
    addressBox: {
        marginTop: 16,
    },
    addressText: {
        fontSize: 16,
        color: '#555',
    },
});
