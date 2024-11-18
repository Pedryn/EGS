import React from "react";
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { router } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./formsStyle";
import { addDoc, collection } from "firebase/firestore"; 
import { FIREBASE_AUTH, db } from "../../../components/config";

export default function FormsEndereco() {
    const [rua, setRua] = React.useState('');
    const [bairro, setBairro] = React.useState('');
    const [numero, setNumero] = React.useState('');
    const [complemento, setComplemento] = React.useState('');
    const [cep, setCep] = React.useState('');
    const [estado, setEstado] = React.useState('');
    const [cidade, setCidade] = React.useState('');
    const [pais, setPais] = React.useState('');

    const create = async () => {
      const currentUser = FIREBASE_AUTH.currentUser;
      if (currentUser) {
          const userId = currentUser.uid;
          const enderecoData = {
              rua,
              bairro,
              numero,
              complemento,
              cep,
              estado,
              cidade,
              pais,
              userId,
          };
  
          console.log("Dados que serão enviados:", enderecoData);
  
          try {
              await addDoc(collection(db, "enderecos"), enderecoData);
              console.log("Endereço salvo com sucesso!");
          } catch (error) {
              console.error("Erro ao salvar endereço:", error);
          }
      } else {
          console.log("Nenhum usuário autenticado.");
      }
  };
  
    function handleNavigate() {
        router.replace("../home");
    }

    return (
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
            <Text style={styles.title}>Endereço</Text>
            <Text>Rua</Text>
            <TextInput value={rua} onChangeText={setRua} style={styles.input} placeholder="Rua São José Esporte Clube" />
            <Text>Bairro</Text>
            <TextInput value={bairro} onChangeText={setBairro} style={styles.input} placeholder="Cidade Morumbi" />
            <Text>Número</Text>
            <TextInput value={numero} onChangeText={setNumero} style={styles.input} placeholder="123" />
            <Text>Complemento</Text>
            <TextInput value={complemento} onChangeText={setComplemento} style={styles.input} placeholder="casa do fundo" />
            <Text>CEP</Text>
            <TextInput value={cep} onChangeText={setCep} style={styles.input} placeholder="12236-791" />
            <Text>Cidade</Text>
            <TextInput value={cidade} onChangeText={setCidade} style={styles.input} placeholder="São José dos Campos" />
            <Text>Estado</Text>
            <TextInput value={estado} onChangeText={setEstado} style={styles.input} placeholder="SP" />
            <Text>País</Text>
            <TextInput value={pais} onChangeText={setPais} style={styles.input} placeholder="Brasil" />

            <TouchableOpacity style={styles.button} onPress={create}>
                <Text style={styles.buttonText}>Salvar Endereço</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
