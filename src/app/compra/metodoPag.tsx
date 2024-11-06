import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Pressable } from "react-native";
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function MetodoPag() {
    const router = useRouter();
    const [selectedMethod, setSelectedMethod] = useState('Pix');

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Selecione uma forma de pagamento</Text>

                <View style={styles.paymentOption}>
                    <Pressable onPress={() => setSelectedMethod('Pix')} style={styles.option}>
                        <View style={styles.radioButton}>
                            {selectedMethod === 'Pix' && <View style={styles.radioButtonSelected} />}
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.optionTitle}>Pix</Text>
                            <Text style={styles.optionDescription}>O código Pix é gerado para o pagamento da compra</Text>
                        </View>
                    </Pressable>

                    <Pressable onPress={() => setSelectedMethod('Boleto')} style={styles.option}>
                        <View style={styles.radioButton}>
                            {selectedMethod === 'Boleto' && <View style={styles.radioButtonSelected} />}
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.optionTitle}>Boleto</Text>
                            <Text style={styles.optionDescription}>O boleto é gerado para o pagamento da compra</Text>
                        </View>
                    </Pressable>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => router.push('/compra/confirmacaoCompra')}>
                    <Text style={styles.buttonText}>Continuar</Text>
                </TouchableOpacity>
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
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    paymentOption: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 8,
        marginBottom: 30,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#000',
    },
    radioButton: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    radioButtonSelected: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#000',
    },
    textContainer: {
        flexShrink: 1, // Permite que o texto quebre em várias linhas, se necessário
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    optionDescription: {
        fontSize: 14,
        color: '#555',
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
