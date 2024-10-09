import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Link } from 'expo-router'
import { FIREBASE_AUTH } from '../../components/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const Index = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoanding] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoanding(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      // Navegar para a Home após login bem-sucedido
      router.replace("/home");
    } catch (error: any) {
      console.log(error);
      alert('Sign in failed: ' + error.message);
    } finally {
      setLoanding(false);
    }
  }

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
  }

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
        <TextInput 
          secureTextEntry={true} 
          style={styles.input} 
          onChangeText={(text) => setPassword(text)} 
          value={password} 
          placeholder="*********" 
          autoCapitalize="none"
        />

        { loading ? (<ActivityIndicator size='large' color='#0000ff' />)
        : (
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
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  criarConta: {
    color: 'blue',
    marginVertical: 15,
    fontSize: 16
  },
});

export default Index;
