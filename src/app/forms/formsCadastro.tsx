import React, { useState } from "react";
import { StyleSheet, View, Text, Alert, Button, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { addDoc, collection } from "firebase/firestore"; 
import { db } from "../../../components/config"

export default function FormsCadastro(){
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    function handleNavigate(){
        router.replace("../home");
    }

    function create () {
        if (password !== confirmPassword) {
            Alert.alert("Erro", "As senhas não coincidem");
            return;
        }

        //submit data
        addDoc(collection(db, "usuario"), {
            name: name,
            password: password,
            email: email,
            telefone: telefone,
            selectedDay: selectedDay,
            selectedMonth: selectedMonth,
            selectedYear: selectedYear
          }).then(() =>{
            //data saved successfully!
            console.log(`data submitted`);
            handleNavigate(); // Navegar após cadastro
          }).catch((error) => {
            // the write failed...
            console.log(error)
          });
    }

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
