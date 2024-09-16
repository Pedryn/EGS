import React from "react";
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { router } from 'expo-router';
import styles from "./formsStyle";

export default function FormsAnuncie() {
    const [nomeProd, setNomeProd] = React.useState('');
    const [descricao, setDescricao] = React.useState('');
    const [preco, setPreco] = React.useState('');
    const [dimencoes, setDimencao] = React.useState('');
    const [certificacoes, setCertificacoes] = React.useState('');
    const [materiais, setMateriais] = React.useState('');
    const [fabricante, setFabricante] = React.useState('');

    return (
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
            <Text style={styles.title}>Anuncie seu Produto</Text>
            
            <Text style={styles.label}>Nome do Produto:</Text>
            <TextInput 
                value={nomeProd} 
                onChangeText={setNomeProd} 
                style={styles.input} 
                placeholder="Ex: Mesa de Madeira"
            />

            <Text style={styles.label}>Descrição:</Text>
            <TextInput 
                value={descricao} 
                onChangeText={setDescricao} 
                style={styles.input} 
                placeholder="Ex: Mesa feita com madeira certificada..."
                multiline // permite várias linhas
            />

            <Text style={styles.label}>Preço:</Text>
            <TextInput 
                value={preco} 
                onChangeText={setPreco} 
                style={styles.input} 
                placeholder="Ex: 250.00"
                keyboardType="numeric"
            />

            <Text style={styles.label}>Dimensões:</Text>
            <TextInput 
                value={dimencoes} 
                onChangeText={setDimencao} 
                style={styles.input} 
                placeholder="Ex: 120x60x75 cm"
            />

            <Text style={styles.label}>Certificações:</Text>
            <TextInput 
                value={certificacoes} 
                onChangeText={setCertificacoes} 
                style={styles.input} 
                placeholder="Ex: FSC, ISO 14001"
            />

            <Text style={styles.label}>Materiais:</Text>
            <TextInput 
                value={materiais} 
                onChangeText={setMateriais} 
                style={styles.input} 
                placeholder="Ex: Madeira, Aço"
            />

            <Text style={styles.label}>Fabricante:</Text>
            <TextInput 
                value={fabricante} 
                onChangeText={setFabricante} 
                style={styles.input} 
                placeholder="Ex: Marcenaria XYZ"
            />

                <TouchableOpacity style={styles.button} onPress={() => router.push('/carrinho')}>
                    <Text style={styles.buttonText}>Anuncie</Text>
                </TouchableOpacity>
        </ScrollView>
    );
}

