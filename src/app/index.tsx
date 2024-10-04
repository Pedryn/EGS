import React from "react";
import { Button, StyleSheet, Text, TextInput, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Link } from 'expo-router'

const Index = () => {
  const [text, onChangeText] = React.useState('');

  function handleNavigate(){
    router.replace("/home")
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
          onChangeText={onChangeText}
          value={text}
          placeholder="email@email.com"
        />
        <Text style={styles.title}>Senha</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="*********"
        />
        <Button title="Enviar" onPress={handleNavigate}/>
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
