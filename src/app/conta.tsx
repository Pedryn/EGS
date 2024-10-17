import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { FIREBASE_AUTH } from '../../components/config';
import { signOut } from "firebase/auth";
import { useRouter } from 'expo-router';

const Conta = () => {
  const [user, setUser] = useState<any>(null);
  const auth = FIREBASE_AUTH;
  const router = useRouter();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert('Você saiu da sua conta');
      router.replace('/'); // Redireciona para a página de login
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.title}>Informações da Conta</Text>
          <Text>Nome: {user.displayName ? user.displayName : 'Nome não definido'}</Text>
          <Text>Email: {user.email}</Text>
          <Text>ID do usuário: {user.uid}</Text>
          {/* Exiba outras informações conforme necessário */}
          <Button title="Sair" onPress={handleSignOut} />
        </>
      ) : (
        <Text>Nenhum usuário está logado.</Text>
      )}
    </View>
  );
};

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
});

export default Conta;
