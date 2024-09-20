import React from "react";
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from "react-native";
import { router } from 'expo-router';
import styles from "./formsStyle";
import { addDoc, collection, doc, setDoc } from "firebase/firestore"; 
import { db } from "../../../components/config"

export default function FormsAnuncie() {
    const [nomeProd, setNomeProd] = React.useState('');
    const [descricao, setDescricao] = React.useState('');
    const [preco, setPreco] = React.useState('');
    const [quantidade, setQuantidade] = React.useState('');
    const [dimensoes, setDimensao] = React.useState('');
    const [certificacoes, setCertificacoes] = React.useState('');
    const [materiais, setMateriais] = React.useState('');
    const [fabricante, setFabricante] = React.useState('');

    function create () {

        //submit data
        addDoc(collection(db, "produtos"), {
            nomeProd: nomeProd,
            descricao: descricao,
            preco: preco,
            quantidade: quantidade,
            dimensoes: dimensoes,
            certificacoes: certificacoes,
            materiais: materiais,
            fabricante: fabricante
          }).then(() =>{
            //data saved succesfully!
            console.log(`data submitted`);
          }).catch((error) => {
            // the write failed...
            console.log(error)
          });
    }

    return (
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
            <Text style={styles.title}>Anuncie seu Produto</Text>
            
            <Text style={styles.label}>Nome do Produto:</Text>
            <TextInput value={nomeProd} onChangeText={(nomeProd) => {setNomeProd(nomeProd)}} style={styles.input} placeholder="Ex: Mesa de Madeira"/>

            <Text style={styles.label}>Descrição:</Text>
            <TextInput value={descricao} onChangeText={(descricao) => {setDescricao(descricao)}} style={styles.input} placeholder="Ex: Mesa feita com madeira certificada..." multiline />

            <Text style={styles.label}>Preço:</Text>
            <TextInput 
                value={preco} 
                onChangeText={(preco) => {setPreco(preco)}}
                style={styles.input} 
                placeholder="Ex: 250.00"
                keyboardType="numeric"
            />

            <Text style={styles.label}>Quantidade:</Text>
            <TextInput value={quantidade} onChangeText={(quantidade) => {setQuantidade(quantidade)}} style={styles.input} placeholder="Ex: 12" />


            <Text style={styles.label}>Dimensões:</Text>
            <TextInput 
                value={dimensoes} 
                onChangeText={(dimensoes) => {setDimensao(dimensoes)}}
                style={styles.input} 
                placeholder="Ex: 120x60x75 cm"
            />

            <Text style={styles.label}>Certificações:</Text>
            <TextInput 
                value={certificacoes} 
                onChangeText={(certificacoes) => {setCertificacoes(certificacoes)}}
                style={styles.input} 
                placeholder="Ex: FSC, ISO 14001"
            />

            <Text style={styles.label}>Materiais:</Text>
            <TextInput 
                value={materiais} 
                onChangeText={(materiais) => {setMateriais(materiais)}}
                style={styles.input} 
                placeholder="Ex: Madeira, Aço"
            />

            <Text style={styles.label}>Fabricante:</Text>
            <TextInput 
                value={fabricante} 
                onChangeText={(fabricante) => {setFabricante(fabricante)}} 
                style={styles.input} 
                placeholder="Ex: Marcenaria XYZ"
            />


            <TouchableOpacity style={styles.button} onPress={create}>
                <Text style={styles.buttonText}>Anuncie</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
