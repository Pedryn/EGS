import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore"; 
import { db } from "../../../components/config";
import styles from "./formsStyle"; 

export default function FormsAnuncie() {
    const [nomeProd, setNomeProd] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [dimensoes, setDimensao] = useState('');
    const [certificacoes, setCertificacoes] = useState('');
    const [materiais, setMateriais] = useState('');
    const [fabricante, setFabricante] = useState('');
    const [images, setImages] = useState<string[]>([]);  
    const [imageUrls, setImageUrls] = useState<string[]>([]); 
    const [telefone, setTelefone] = useState('');

    // Estado para as categorias
    const [categorias, setCategorias] = useState<string[]>([]);

    // Função para selecionar várias imagens
    const pickImages = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,  
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets?.length > 0) {
            const selectedImages = result.assets.map(asset => asset.uri); 
            setImages([...images, ...selectedImages]); 
        }
    };

    // Função para remover uma imagem
    const removeImage = (index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);  
        setImages(newImages); 
    };

    // Função para fazer upload das imagens no Firebase Storage
    const uploadImages = async () => {
        const storage = getStorage();
        const uploadedImageUrls: string[] = [];

        for (const image of images) {
            const response = await fetch(image);
            const blob = await response.blob();
            const storageRef = ref(storage, `images/${nomeProd}-${Date.now()}`);

            await uploadBytes(storageRef, blob);
            
            const url = await getDownloadURL(storageRef);
            uploadedImageUrls.push(url); 
        }

        setImageUrls(uploadedImageUrls);
        return uploadedImageUrls;
    };

    // Função para salvar o produto
    async function create() {
        try {
            const uploadedImageUrls = await uploadImages(); 

            await addDoc(collection(db, "produtos"), {
                nomeProd: nomeProd,
                descricao: descricao,
                preco: parseFloat(preco),
                quantidade: quantidade,
                dimensoes: dimensoes,
                certificacoes: certificacoes,
                materiais: materiais,
                fabricante: fabricante,
                categorias: categorias, // Salvando categorias selecionadas
                imageUrls: uploadedImageUrls,
                telefone: telefone
            });

            // Limpar os campos após salvar
            setNomeProd('');
            setDescricao('');
            setPreco('');
            setQuantidade('');
            setDimensao('');
            setCertificacoes('');
            setMateriais('');
            setFabricante('');
            setTelefone('');
            setImages([]);
            setImageUrls([]);
            setCategorias([]); // Limpar categorias selecionadas

            // Exibir um pop-up de sucesso
            Alert.alert(
                "Sucesso!",
                "Produto cadastrado com sucesso.",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        } catch (error) {
            console.log(error);
            Alert.alert("Erro", "Ocorreu um erro ao cadastrar o produto.");
        }
    }

    // Função para gerenciar a seleção de categorias
    const toggleCategoria = (categoria: string) => {
        if (categorias.includes(categoria)) {
            setCategorias(categorias.filter(item => item !== categoria));
        } else {
            setCategorias([...categorias, categoria]);
        }
    };

    return (
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
            <Text style={styles.title}>Anuncie seu Produto</Text>
            
            <TouchableOpacity style={styles.addFotoContainer} onPress={pickImages}>
                <Image
                    style={styles.addFoto}
                    source={require('@/assets/images/addFoto.png')}
                />
                <Text style={styles.buttonText}>Escolher Imagens</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {images.map((image, index) => (
                    <View key={index} style={{ position: 'relative', margin: 5 }}>
                        <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
                        <TouchableOpacity 
                            style={styles.removeImageButton} 
                            onPress={() => removeImage(index)}>
                            <Ionicons name="close-circle" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            <Text style={styles.label}>Nome do Produto:</Text>
            <TextInput value={nomeProd} onChangeText={setNomeProd} style={styles.input} placeholder="Ex: Mesa de Madeira" />

            <Text style={styles.label}>Descrição:</Text>
            <TextInput value={descricao} onChangeText={setDescricao} style={styles.input} placeholder="Ex: Mesa feita com madeira certificada..." multiline />

            <Text style={styles.label}>Preço:</Text>
            <TextInput 
                value={preco} 
                onChangeText={setPreco}
                style={styles.input} 
                placeholder="Ex: 250.00"
                keyboardType="numeric"
            />

            <Text style={styles.label}>Quantidade:</Text>
            <TextInput value={quantidade} onChangeText={setQuantidade} style={styles.input} placeholder="Ex: 12" />

            <Text style={styles.label}>Dimensões:</Text>
            <TextInput 
                value={dimensoes} 
                onChangeText={setDimensao}
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

            <Text style={styles.label}>Telefone para contato:</Text>
            <TextInput 
                value={telefone} 
                onChangeText={setTelefone} 
                style={styles.input} 
                placeholder="Ex: (12)99999-9999"
            />

            <Text style={styles.label}>Categorias:</Text>
            <View style={styles.checkboxContainer}>
                <TouchableOpacity onPress={() => toggleCategoria('Reciclado')}>
                    <Text style={categorias.includes('Reciclado') ? styles.checked : styles.unchecked}>Reciclado</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleCategoria('Biodegradável')}>
                    <Text style={categorias.includes('Biodegradável') ? styles.checked : styles.unchecked}>Biodegradável</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleCategoria('Artesanato')}>
                    <Text style={categorias.includes('Artesanato') ? styles.checked : styles.unchecked}>Artesanato</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleCategoria('Reutilizável')}>
                    <Text style={categorias.includes('Reutilizável') ? styles.checked : styles.unchecked}>Reutilizável</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={create}>
                <Text style={styles.buttonText}>Anuncie</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}


