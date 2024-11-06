import { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import { FIREBASE_AUTH, db } from "../../components/config";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"; 

// Dados de recompensas para exibir na interface
const recompensas = [
    { dia: "Dia 1", pontos: 10, icon: 'https://cdn-icons-png.flaticon.com/512/10693/10693001.png'},
    { dia: "Dia 2", pontos: 4, icon: 'https://cdn-icons-png.flaticon.com/512/10693/10693001.png' },
    { dia: "Dia 3", pontos: 1, icon: 'https://cdn-icons-png.flaticon.com/512/10693/10693001.png' },
    { dia: "Dia 4", pontos: 1, icon: 'https://cdn-icons-png.flaticon.com/512/10693/10693001.png' },
    { dia: "Dia 5", pontos: 1, icon: 'https://cdn-icons-png.flaticon.com/512/10693/10693001.png' },
    { dia: "Dia 6", pontos: 1, icon: 'https://cdn-icons-png.flaticon.com/512/10693/10693001.png' },
    { dia: "Dia 7", pontos: 100, icon: 'https://cdn-icons-png.flaticon.com/512/10693/10693001.png', highlight: true },
];

export default function Pontos() {
    const [pontos, setPontos] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchPontos = async () => {
        const user = FIREBASE_AUTH.currentUser;
        if (user) {
            const userId = user.uid;
            const pointsDocRef = doc(db, "pontos", userId);
            try {
                const pointsDoc = await getDoc(pointsDocRef);
                if (pointsDoc.exists()) {
                    const pointsData = pointsDoc.data();
                    if (pointsData && typeof pointsData.pontos === "number") {
                        setPontos(pointsData.pontos);
                    } else {
                        await setDoc(pointsDocRef, { pontos: 0 }, { merge: true });
                        setPontos(0);
                    }
                } else {
                    await setDoc(pointsDocRef, { pontos: 0 });
                    setPontos(0);
                }
            } catch (error) {
                console.error("Erro ao buscar pontos do usuário:", error);
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    // Função para adicionar pontos ao total
    const adicionarPontos = async (valor: number) => {
        const user = FIREBASE_AUTH.currentUser;
        if (user && pontos !== null) {
            const userId = user.uid;
            const pointsDocRef = doc(db, "pontos", userId);
            try {
                const novoTotal = pontos + valor;
                await updateDoc(pointsDocRef, { pontos: novoTotal });
                setPontos(novoTotal);
                Alert.alert("Sucesso", `Você ganhou ${valor} pontos! Total: ${novoTotal} pontos.`);
            } catch (error) {
                console.error("Erro ao atualizar pontos do usuário:", error);
                Alert.alert("Erro", "Não foi possível adicionar os pontos.");
            }
        }
    };

    useEffect(() => {
        fetchPontos();
    }, []);

    return (
        <ScrollView style={styles.fundo}>
            <View style={styles.container}>
                <Text style={styles.titulo}>Ganhe Pontos!</Text>
                <View style={styles.pontosTotal}>
                    <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/10693/10693001.png' }} style={styles.icone} />
                    <Text style={styles.pontosTexto}>{loading ? "Carregando..." : pontos ?? 0}</Text> 
                </View>
            </View>
            <View style={styles.bemVindo}>
                <Text style={styles.subtitulo}>Bem-vindo de volta!</Text>
                <View style={styles.recompensasContainer}>
                    {recompensas.map((recompensa, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.recompensaItem,
                                recompensa.highlight && styles.highlight
                            ]}
                            onPress={() => adicionarPontos(recompensa.pontos)}
                        >
                            <Text style={styles.pontos}>+{recompensa.pontos}</Text>
                            <Image source={{ uri: recompensa.icon }} style={styles.icone} />
                            <Text style={styles.dia}>{recompensa.dia}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <Text style={styles.contribuicao}>Contribua com doação de itens usados</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    fundo: {
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 20,
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 10,
    },
    pontosTotal: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    pontosTexto: {
        fontSize: 18,
        marginLeft: 5,
    },
    bemVindo: {
        alignItems: 'center',
        marginVertical: 20,
    },
    subtitulo: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
    },
    recompensasContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 10,
        borderWidth: 3,
        borderColor: '#555',
        borderRadius: 10,
        backgroundColor: '#fff',
        marginBottom: 20,
        marginHorizontal: 10,
    },
    recompensaItem: {
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#555',
        borderRadius: 8,
        padding: 10,
        margin: 5,
        width: 70,
    },
    highlight: {
        backgroundColor: '#ffd700',
        borderColor: '#f4c542',
    },
    pontos: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    dia: {
        fontSize: 12,
        color: '#555',
    },
    icone: {
        width: 24,
        height: 24,
        marginVertical: 5,
    },
    contribuicao: {
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 14,
        color: '#555',
    },
});
