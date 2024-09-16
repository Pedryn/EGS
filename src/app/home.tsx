import { StyleSheet, View, Text } from "react-native";
import { Link } from 'expo-router'

export default function Home(){
    return (
        <View style={styles.container}>
            <Text>Pagina home</Text>
            <Link href={'/forms/formsEndereco'}>Ir pro carrinho</Link>
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