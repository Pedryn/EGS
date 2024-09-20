import React from "react";
import { StyleSheet, View, Text, Button, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { router } from 'expo-router'
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./formsStyle";
import { addDoc, collection, doc, setDoc } from "firebase/firestore"; 
import { db } from "../../../components/config"

export default function FormsEndereco(){
    const [rua, setRua] = React.useState('');
    const [bairro, setBairro] = React.useState('');
    const [numero, setNumero] = React.useState('');
    const [complemento, setComplemento] = React.useState('');
    const [cep, setCep] = React.useState('');
    const [estado, setEstado] = React.useState('');
    const [cidade, setCidade] = React.useState('');
    const [pais, setPais] = React.useState('');

    function create () {

        //submit data
        addDoc(collection(db, "endereco"), {
            rua: rua,
            bairro: bairro,
            numero: numero,
            cep: cep,
            estado: estado,
            cidade: cidade,
            pais: pais,
          }).then(() =>{
            //data saved succesfully!
            console.log(`data submitted`);
          }).catch((error) => {
            // the write failed...
            console.log(error)
          });
    }

    function handleNavigate(){
        router.replace("../home")
      }

    return (
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
                <Text style={styles.title}>Endereço</Text>
                <Text>Rua</Text>
                <TextInput value={rua} onChangeText={(rua) => {setRua(rua)}} style={styles.input} placeholder="Rua São José Esporte Clube"/>
                <Text>Bairro</Text>
                <TextInput value={bairro} onChangeText={(bairro) => {setBairro(bairro)}} style={styles.input} placeholder="Cidade Morumbi"/>
                <Text>Número</Text>
                <TextInput value={numero} onChangeText={(numero) => {setNumero(numero)}} style={styles.input} placeholder="123"/>
                <Text>Complemento</Text>
                <TextInput value={complemento} onChangeText={(complemento) => {setComplemento(complemento)}} style={styles.input} placeholder="casa do fundo"/>
                <Text>CEP</Text>
                <TextInput value={cep} onChangeText={(cep) => {setCep(cep)}} style={styles.input} placeholder="12236-791"/>
                <Text>Cidade</Text>
                <TextInput value={cidade} onChangeText={(cidade) => {setCidade(cidade)}} style={styles.input} placeholder="São José dos Campos"/>
                <Text>Estado</Text>
                <TextInput value={estado} onChangeText={(estado) => {setEstado(estado)}} style={styles.input} placeholder="SP"/>
                <Text>País</Text>
                <TextInput value={pais} onChangeText={(pais) => {setPais(pais)}} style={styles.input} placeholder="Brasil"/>
                
                <TouchableOpacity style={styles.button} onPress={create}>
                    <Text style={styles.buttonText}>Anuncie</Text>
                </TouchableOpacity>
        </ScrollView>
    );
}
