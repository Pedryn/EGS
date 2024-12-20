import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Link } from 'expo-router';
import { FIREBASE_AUTH } from '../../components/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Ionicons } from '@expo/vector-icons'; // Ícones para o "olhinho"

const Index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Controle do "olhinho"
  const [loading, setLoanding] = useState(false);
  const auth = FIREBASE_AUTH;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const signIn = async () => {
    setLoanding(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      if (response.user.displayName) {
        console.log('Nome do usuário:', response.user.displayName);
      } else {
        console.log('Nome do usuário não definido');
      }
      router.replace("/home");
    } catch (error: any) {
      console.log(error);
      alert('Falha no login: ' + error.message);
    } finally {
      setLoanding(false);
    }
  };

  const signUp = async () => {
    setLoanding(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error: any) {
      console.log(error);
      alert('Sign in failed: ' + error.message);
    } finally {
      setLoanding(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          style={styles.logo}
          source={require('@/assets/images/logo.jpeg')}
        />
        <Text style={styles.title}>Login:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@email.com"
          autoCapitalize="none"
        />
        <Text style={styles.title}>Senha</Text>
        <View style={styles.inputContainer}>
          <TextInput 
            secureTextEntry={!showPassword} 
            style={styles.inputWithIcon} 
            onChangeText={(text) => setPassword(text)} 
            value={password} 
            placeholder="*********" 
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
            <Ionicons 
              name={showPassword ? "eye-off" : "eye"} 
              size={24} 
              color="gray" 
            />
          </TouchableOpacity>
        </View>
        {loading ? (
          <ActivityIndicator size='large' color='#0000ff' />
        ) : (
          <>
            <Button title="Login" onPress={signIn} />
          </>
        )}
        <Link style={styles.criarConta} href={'./forms/formsCadastro'}>Criar nova conta</Link>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: '80%',
    margin: 12,
    borderWidth: 1,
    borderRadius: 25,
    padding: 10,
    paddingHorizontal: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  inputWithIcon: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  iconContainer: {
    padding: 5,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  criarConta: {
    color: 'blue',
    marginVertical: 15,
    fontSize: 16,
  },
});

export default Index;
