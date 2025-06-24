import * as Clipboard from 'expo-clipboard'
import { LinearGradient } from 'expo-linear-gradient'
import { Stack, useFocusEffect, useRouter } from 'expo-router'
import { useCallback, useState } from 'react'
import {
    Alert,
    FlatList,
    Image,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import styles from '../components/stylesOportunidadesList'
import { initDB, queryAsync, runAsync } from '../services/dbCadastro'

export default function LinksIndicacoes() {
    const [ops, setOps] = useState([])
    const router = useRouter()

    // 1) Toda vez que a tela ganha foco, (re)carrega as oportunidades
    useFocusEffect(useCallback(() => {
        (async () => {
            try {
                await initDB()
                const rows = await queryAsync(
                    `SELECT id, nomeRazao, link
           FROM oportunidades
           ORDER BY id DESC;`
                )
                setOps(rows)
            } catch (e) {
                console.error('Erro ao carregar oportunidades:', e)
                Alert.alert('Erro', 'Não foi possível carregar os links.')
            }
        })()
    }, []))

    // 2) Ao clicar em "Indikar"
    const handleIndikar = async (item) => {
        try {
            // copia pro clipboard
            await Clipboard.setStringAsync(item.link)
            Alert.alert('Pronto!', 'Link copiado e indicado.')

            // busca usuário logado na tabela session
            const session = await queryAsync(`SELECT userId FROM session LIMIT 1;`)
            if (!session.length) {
                return Alert.alert('Sessão inválida', 'Faça login novamente.')
            }
            const userId = session[0].userId

            //Verifica se já indicou esse link
            const jaTem = await queryAsync(
                `SELECT 1 FROM indicacoes WHERE userId = ? AND link = ? LIMIT 1;`,
                [userId, item.link]
            )
            if (jaTem.length) {
                return Alert.alert('Ops', 'Você já indicou este link.')
            }

            // insere indicação
            await runAsync(
                `INSERT INTO indicacoes (userId, nomeRazao, link, createdAt)
         VALUES (?, ?, ?, datetime('now'));`,
                [userId, item.nomeRazao, item.link]
            )

            // navega para MinhasIndicacoes
            router.push('/Indicacoes')
        } catch (e) {
            console.error(e)
            Alert.alert('Erro', 'Não foi possível indicar este link.')
        }
    }

    // 3) Render de cada linha
    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <View style={styles.cellNome}>
                <Text style={styles.textNome}>{item.nomeRazao}</Text>
            </View>
            <View style={styles.cellLink}>
                <Text
                    style={styles.textLink}
                    numberOfLines={1}
                    ellipsizeMode="middle"
                >
                    {item.link}
                </Text>
            </View>
            <TouchableOpacity
                style={styles.buttonCopy}
                onPress={() => handleIndikar(item)}
            >
                <Text style={styles.buttonCopyText}>Indikar</Text>
            </TouchableOpacity>
        </View>
    )

    return (
        <>
            <Stack.Screen
                options={{
                    title: '',
                    headerBackVisible: true,
                    headerBackTitle: 'Voltar',
                    headerStyle: { backgroundColor: '#1e1e1e' },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: 'bold' },
                }}
            />

            <LinearGradient colors={['#f0f2f5', '#dfe4ea']} style={{ flex: 1 }}>
                <SafeAreaView style={styles.container}>
                    {/* cabeçalho com logo e título */}
                    <View style={styles.headerContainer}>
                        <Image
                            source={require('../images/logo_s_fundo_s_nome.png')}
                            style={styles.logo}
                        />
                        <Text style={styles.headerTitle}>Indika</Text>
                    </View>

                    {/* lista de oportunidades */}
                    <FlatList
                        data={ops}
                        keyExtractor={row => String(row.id)}
                        renderItem={renderItem}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        ListEmptyComponent={() => (
                            <View style={styles.empty}>
                                <Text style={styles.emptyText}>
                                    Nenhuma oportunidade disponível.
                                </Text>
                            </View>
                        )}
                    />
                </SafeAreaView>
            </LinearGradient>
        </>
    )
}