import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard'; // Biblioteca para copiar texto

const PixProv = () => {
  const copyToClipboard = () => {
    Clipboard.setStringAsync('00020126330014br.gov.bcb.pix0111524174348065204000053039865802BR5923PEDRO HENRIQUE DE SOUZA6009Sao Paulo62070503***63048791'); // Copia o texto para a área de transferência
    Alert.alert('Texto copiado!', 'O pix copia e cola foi copiado para a área de transferência.');
  };
    const route = useRoute();
    const { totalPedido } = route.params || {}; // Receber o valor do pedido

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.successMessage}>
                ✅ Seu pedido foi reservado. Pague para processar o produto.
            </Text>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Valor do pedido</Text>
                {/* Certifique-se de exibir totalPedido como uma string */}
                <Text style={styles.amount}>R$ {totalPedido ? totalPedido : '0.00'}</Text>

                <Image
                    style={styles.qrCode}
                    source={require('@/assets/images/pix.jpeg')} // Substitua pelo caminho correto da imagem
                />

                <Text style={styles.instruction}>
                    Caso de erro clique no botão abaixo para o PIX copia e cola
                </Text>

                <TouchableOpacity style={styles.button} onPress={copyToClipboard}>
                    <Text style={styles.buttonText}>Clique Aqui</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    successMessage: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    amount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#00c853',
        marginBottom: 20,
    },
    qrCode: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    instruction: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#00c853',
        padding: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default PixProv;
