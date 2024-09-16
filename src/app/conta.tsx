import { StyleSheet, View, Text } from "react-native";
import { Link } from 'expo-router'

export default function Conta(){
    return (
        <View style={styles.container}>
            <Text>Pagina Conta</Text>
            <Link href={'/carrinho'}>Ir pro carrinho</Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});