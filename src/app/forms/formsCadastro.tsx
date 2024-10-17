import React, { useState } from "react";
import { StyleSheet, View, Text, Alert, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { addDoc, collection } from "firebase/firestore"; 
import { db, FIREBASE_AUTH } from "../../../components/config"; 
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"; // Inclui updateProfile

export default function FormsCadastro(){
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const auth = FIREBASE_AUTH;

    function handleNavigate(){
        router.replace("../home");
    }

    // Função para criar o usuário
    const create = async () => {
        if (password !== confirmPassword) {
            Alert.alert("Erro", "As senhas não coincidem");
            return;
        }

        try {
            // Criando o usuário no Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Atualizando o perfil do usuário com o displayName
            await updateProfile(user, {
                displayName: name,  // Define o displayName com o nome fornecido
            });

            // Salvando os dados adicionais no Firestore
            await addDoc(collection(db, "usuario"), {
                uid: user.uid, // Referência ao ID do usuário criado
                name: name,
                email: email,
                telefone: telefone,
                dataNascimento: {
                    day: selectedDay,
                    month: selectedMonth,
                    year: selectedYear
                }
            });

            // Redirecionar para a home após o cadastro
            handleNavigate();
            Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
        } catch (error) {
            console.log(error);
            Alert.alert("Erro", "Não foi possível cadastrar o usuário.");
        }
    };

    const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const years = Array.from({ length: 100 }, (_, i) => (new Date().getFullYear() - i).toString());

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Cadastro de Usuario</Text>

            <Text style={styles.label}>Nome</Text>
            <TextInput value={name} onChangeText={(name) => {setName(name)}} placeholder="Pedro Henrique de Souza" style={styles.input}/>

            <Text style={styles.label}>Senha</Text>
            <TextInput value={password} onChangeText={(password) => {setPassword(password)}} placeholder="********" secureTextEntry style={styles.input}/>

            <Text style={styles.label}>Confirme a senha:</Text>
            <TextInput value={confirmPassword} onChangeText={(confirmPassword) => {setConfirmPassword(confirmPassword)}} placeholder="********" secureTextEntry style={styles.input}/>

            <Text style={styles.label}>Data de nascimento</Text>

            <View style={styles.pickerContainer}>
                <Picker 
                    selectedValue={selectedDay} 
                    onValueChange={(itemValue: string) => setSelectedDay(itemValue)} 
                    style={styles.picker}>
                    <Picker.Item label="Dia" value="" />
                    {days.map((day) => <Picker.Item key={day} label={day} value={day} />)}
                </Picker>

                <Picker 
                    selectedValue={selectedMonth} 
                    onValueChange={(itemValue: string) => setSelectedMonth(itemValue)} 
                    style={styles.picker}>
                    <Picker.Item label="Mês" value="" />
                    {months.map((month, index) => <Picker.Item key={index} label={month} value={month} />)}
                </Picker>

                <Picker 
                    selectedValue={selectedYear} 
                    onValueChange={(itemValue: string) => setSelectedYear(itemValue)} 
                    style={styles.picker}>
                    <Picker.Item label="Ano" value="" />
                    {years.map((year) => <Picker.Item key={year} label={year} value={year} />)}
                </Picker>
            </View>

            <Text style={styles.label}>Email:</Text>
            <TextInput value={email} onChangeText={(email) => {setEmail(email)}} placeholder="pedro@gmail.com" style={styles.input}/>
            
            <Text style={styles.label}>Telefone:</Text>
            <TextInput value={telefone} onChangeText={(telefone) => {setTelefone(telefone)}} placeholder="12988535380" style={styles.input}/>

            <TouchableOpacity style={styles.button} onPress={create}>
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        alignSelf: 'flex-start',
        marginBottom: 5,
        color: '#000',
    },
    input: {
        width: '100%',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 25,
        padding: 10,
        marginBottom: 15,
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        width: '100%',
    },
    picker: {
        flex: 1,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 25,
        marginHorizontal: 5,
    },
    button: {
        backgroundColor: '#B2FF82',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
});