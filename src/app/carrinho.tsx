import { StyleSheet, View, Text } from "react-native";

export default function Carrinho(){
    return (
        <View style={styles.container}>
            <Text>Pagina Carrinho</Text>
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