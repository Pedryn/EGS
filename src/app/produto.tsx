import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { db, FIREBASE_AUTH } from '../../components/config'; // Certifique-se de importar o Auth
import { AntDesign } from '@expo/vector-icons';

type Produto = {
  nomeProd: string;
  preco: string;
  imageUrls: string[];
  descricao?: string;
  categorias?: string[];
  telefone?: string;
  dimensoes?: string;
  certificacoes?: string;
  materiais?: string;
  fabricante?: string;
};

const Produto = () => {
  const { id } = useLocalSearchParams();
  const [produto, setProduto] = useState<Produto | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    const fetchProduto = async () => {
      if (id) {
        try {
          const docRef = doc(db, 'produtos', id as string);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setProduto(docSnap.data() as Produto);
          }
        } catch (error) {
          console.error('Erro ao buscar produto:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProduto();
  }, [id]);

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  if (!produto) {
    return <Text>Produto não encontrado</Text>;
  }

  // Função para adicionar ao carrinho
  const adicionarAoCarrinho = async () => {
    const user = FIREBASE_AUTH.currentUser;
    if (user) {
      const userId = user.uid;
      try {
        await addDoc(collection(db, 'carrinho'), {
          userId,
          produtoId: id,
          nomeProd: produto.nomeProd,
          preco: produto.preco,
          imageUrls: produto.imageUrls,
          quantidade: 1, // Pode permitir que o usuário escolha a quantidade
        });
        console.log('Produto adicionado ao carrinho');
      } catch (error) {
        console.error('Erro ao adicionar ao carrinho:', error);
      }
    } else {
      console.log('Usuário não autenticado');
    }
  };

  const toggleDetails = () => {
    setIsDetailsVisible(!isDetailsVisible);
  };

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={produto.imageUrls}
        renderItem={({ item }) => <Image source={{ uri: item }} style={[styles.productImage, { width: screenWidth }]} />}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToAlignment="center"
        decelerationRate="fast"
      />

      <Text style={styles.productPrice}>R$ {produto.preco}</Text>
      <Text style={styles.productName}>{produto.nomeProd}</Text>

      <TouchableOpacity style={styles.dropdownButton} onPress={toggleDetails}>
        <Text style={styles.dropdownText}>Detalhes do Produto</Text>
        <AntDesign name={isDetailsVisible ? 'up' : 'down'} size={20} color="black" />
      </TouchableOpacity>

      {isDetailsVisible && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>Descrição: {produto.descricao}</Text>
          {produto.categorias && produto.categorias.length > 0 && (
            <Text style={styles.detailText}>Categorias: {produto.categorias.join(', ')}</Text>
          )}
        </View>
      )}

      {/* Botão de adicionar ao carrinho */}
      <TouchableOpacity style={styles.addButton} onPress={adicionarAoCarrinho}>
        <Text style={styles.addButtonText}>Adicionar ao Carrinho</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buyButton} onPress={() => router.push('/compra/metodoPag')}>
        <Text style={styles.addButtonText}>Compre Agora</Text>
      </TouchableOpacity>

      <View style={styles.footerSpace} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buyButton: {
    backgroundColor: '#D0FF6C',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 16,
},
productImage: {
    height: 300,
    resizeMode: 'contain',
},
productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
    textAlign: 'center',
},
productPrice: {
    fontSize: 20,
    color: '#ff0000',
    textAlign: 'center',
    marginTop: 10,
},
dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginVertical: 10,
    borderRadius: 5,
},
dropdownText: {
    fontSize: 18,
    fontWeight: '500',
},
detailsContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    marginTop: 0,
},
detailText: {
    fontSize: 16,
    marginVertical: 4,
},
footerSpace: {
    height: 50, // Define a altura do espaço extra
},
});

export default Produto;
