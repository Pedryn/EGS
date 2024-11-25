import { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import { FIREBASE_AUTH, db } from "../../components/config";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";

const recompensas = [
    { dia: "Dia 1", pontos: 10, icon: 'https://cdn-icons-png.flaticon.com/512/10693/10693001.png' },
    { dia: "Dia 2", pontos: 4, icon: 'https://cdn-icons-png.flaticon.com/512/10693/10693001.png' },
    { dia: "Dia 3", pontos: 1, icon: 'https://cdn-icons-png.flaticon.com/512/10693/10693001.png' },
    { dia: "Dia 4", pontos: 1, icon: 'https://cdn-icons-png.flaticon.com/512/10693/10693001.png' },
    { dia: "Dia 5", pontos: 1, icon: 'https://cdn-icons-png.flaticon.com/512/10693/10693001.png' },
    { dia: "Dia 6", pontos: 1, icon: 'https://cdn-icons-png.flaticon.com/512/10693/10693001.png' },
    { dia: "Dia 7", pontos: 100, icon: 'https://cdn-icons-png.flaticon.com/512/10693/10693001.png', highlight: true },
];

export default function Pontos() {
    const [pontos, setPontos] = useState<number | null>(null);
    const [proximoDia, setProximoDia] = useState<number>(1);
    const [ultimoTempo, setUltimoTempo] = useState<Date | null>(null);
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
                    setPontos(pointsData.pontos || 0);
                    setProximoDia(pointsData.proximoDia || 1);
                    setUltimoTempo(pointsData.ultimoTempo ? new Date(pointsData.ultimoTempo.toMillis()) : null);
                } else {
                    await setDoc(pointsDocRef, { pontos: 0, proximoDia: 1, ultimoTempo: null });
                    setPontos(0);
                    setProximoDia(1);
                    setUltimoTempo(null);
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

    const adicionarPontos = async (valor: number, diaIndex: number) => {
        const user = FIREBASE_AUTH.currentUser;
        if (user && pontos !== null) {
            const agora = new Date();
            if (ultimoTempo) {
                const tempoDecorridoMs = agora.getTime() - ultimoTempo.getTime();
                const tempoDecorridoMinutos = Math.floor(tempoDecorridoMs / 1000 / 60);
                const tempoDecorridoSegundos = Math.floor((tempoDecorridoMs / 1000) % 60);
    
                if (tempoDecorridoMinutos < 5) {
                    const tempoRestanteMinutos = 4 - tempoDecorridoMinutos;
                    const tempoRestanteSegundos = 59 - tempoDecorridoSegundos;
                    Alert.alert(
                        "Espere um pouco",
                        `Você precisa esperar ${tempoRestanteMinutos} minutos e ${tempoRestanteSegundos} segundos para coletar o próximo ponto.`
                    );
                    return;
                }
            }
    
            if (diaIndex + 1 !== proximoDia) {
                Alert.alert("Ordem incorreta", `Você precisa coletar o Dia ${proximoDia} primeiro!`);
                return;
            }
    
            const userId = user.uid;
            const pointsDocRef = doc(db, "pontos", userId);
            try {
                const novoTotal = pontos + valor;
                const proximo = proximoDia === 7 ? 1 : proximoDia + 1;
                await updateDoc(pointsDocRef, {
                    pontos: novoTotal,
                    proximoDia: proximo,
                    ultimoTempo: serverTimestamp(),
                });
                setPontos(novoTotal);
                setProximoDia(proximo);
                setUltimoTempo(agora);
                Alert.alert("Sucesso", `Você coletou os pontos do Dia ${diaIndex + 1}! Total: ${novoTotal} pontos.`);
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
                            style={[styles.recompensaItem, recompensa.highlight && styles.highlight]}
                            onPress={() => adicionarPontos(recompensa.pontos, index)}
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
    // Estilos mantidos sem alterações
    fundo: { backgroundColor: '#fff' },
    container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', padding: 20 },
    titulo: { fontWeight: 'bold', fontSize: 22, marginBottom: 10 },
    pontosTotal: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
    pontosTexto: { fontSize: 18, marginLeft: 5 },
    bemVindo: { alignItems: 'center', marginVertical: 20 },
    subtitulo: { fontWeight: 'bold', fontSize: 16, marginBottom: 10 },
    recompensasContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', padding: 10, borderWidth: 3, borderColor: '#555', borderRadius: 10, backgroundColor: '#fff', marginBottom: 20, marginHorizontal: 10 },
    recompensaItem: { alignItems: 'center', borderWidth: 2, borderColor: '#555', borderRadius: 8, padding: 10, margin: 5, width: 70 },
    highlight: { backgroundColor: '#ffd700', borderColor: '#f4c542' },
    pontos: { fontSize: 14, fontWeight: 'bold', color: '#333' },
    dia: { fontSize: 12, color: '#555' },
    icone: { width: 24, height: 24, marginVertical: 5 },
    contribuicao: { textAlign: 'center', marginVertical: 20, fontSize: 14, color: '#555' },
});
