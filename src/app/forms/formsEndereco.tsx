import React from "react";
import { StyleSheet, View, Text, Button, TextInput, ScrollView } from "react-native";
import { router } from 'expo-router'
import { SafeAreaView } from "react-native-safe-area-context";

export default function FormsEndereco(){
    const [text, onChangeText] = React.useState('');


    function handleNavigate(){
        router.replace("../home")
      }

    return (
            <View style={styles.container}>
                <Text>Endereço</Text>
                <Text>Rua</Text>
                <TextInput value={text} style={styles.input} placeholder="Rua São José Esporte Clube"/>
                <Text>Bairro</Text>
                <TextInput value={text} style={styles.input} placeholder="Cidade Morumbi"/>
                <Text>Número</Text>
                <TextInput value={text} style={styles.input} placeholder="123"/>
                <Text>CEP</Text>
                <TextInput value={text} style={styles.input} placeholder="12236-791"/>
                <Text>Cidade</Text>
                <TextInput value={text} style={styles.input} placeholder="São José dos Campos"/>
                <Text>Estado</Text>
                <TextInput value={text} style={styles.input} placeholder="SP"/>
                <Text>País</Text>
                <TextInput value={text} style={styles.input} placeholder="Brasil"/>
                
                <Button title="Salvar" onPress={handleNavigate}/>
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
    input: {
        width: '100%',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 25, // Borda arredondada
        padding: 10,
        marginBottom: 15,
    },
});