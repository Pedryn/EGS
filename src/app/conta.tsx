import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
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
          {/* Header com foto de perfil, nome e email */}
          <View style={styles.header}>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} // Coloque aqui a imagem do ícone do perfil
              style={styles.profileImage}
            />
            <View style={styles.userInfo}>
              <Text style={styles.displayName}>
                {user.displayName ? user.displayName : 'Nome não definido'}
              </Text>
              <Text style={styles.email}>{user.email}</Text>
            </View>
          </View>

          {/* Botões de ações */}
          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/compra/compras')}>
              <Text style={styles.actionText}>Compras</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionText}>Anúncios</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/carrinho')}>
              <Text style={styles.actionText}>Carrinho</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/pontos')}>
              <Text style={styles.actionText}>Pontos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/forms/formsEndereco')}>
              <Text style={styles.actionText}>Endereço</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
                <Text style={styles.logoutText}>Sair da Conta</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#d3d3e8',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  userInfo: {
    flexDirection: 'column',
  },
  displayName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
  actionContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
  },
  actionButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 16,
    color: '#000',
  },
  logoutButton: {
    backgroundColor: '#ff6347', // cor mais chamativa para o botão de logout
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 20, // margem maior para separar o botão de logout dos outros
    width: '100%',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: '#fff', // texto branco para contraste com o botão
    fontWeight: 'bold',
  },
});

export default Conta;
