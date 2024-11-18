import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useRoute } from '@react-navigation/native';

type RouteParams = {
    payloadPix: string;
    valor: number;
};

export default function PagamentoPix() {
    const route = useRoute();
    const { payloadPix, valor } = route.params as RouteParams;

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Pagamento Pix</Text>
            <Text style={styles.label}>Valor: R$ {valor.toFixed(2)}</Text>
            <QRCode
                value={payloadPix}
                size={200}
            />
            <Text style={styles.instruction}>Use o código acima para pagar com Pix.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    label: {
        fontSize: 18,
        marginBottom: 16,
    },
    instruction: {
        fontSize: 16,
        marginTop: 16,
        textAlign: 'center',
    },
});
