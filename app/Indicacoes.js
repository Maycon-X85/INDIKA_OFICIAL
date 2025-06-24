import React, { useState, useCallback } from 'react'
import * as Clipboard from 'expo-clipboard'
import { LinearGradient } from 'expo-linear-gradient'
import { Stack, useFocusEffect } from 'expo-router'
import {
  Alert,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native'
import styles from '../components/stylesOportunidadesList'
import { initDB, queryAsync } from '../services/dbCadastro'

export default function MinhasIndicacoes() {
  const [lista, setLista] = useState([])

  useFocusEffect(
    useCallback(() => {
      ;(async () => {
        try {
          await initDB()
          // pega user logado
          const session = await queryAsync(
            `SELECT userId FROM session LIMIT 1;`
          )
          if (!session.length) {
            Alert.alert('Ops', 'Você não está logado.')
            return
          }
          const userId = session[0].userId

          // traz só as indicações desse usuário
          const rows = await queryAsync(
            `SELECT id, nomeRazao, link 
             FROM indicacoes 
             WHERE userId = ? 
             ORDER BY createdAt DESC;`,
            [userId]
          )
          setLista(rows)
        } catch (e) {
          console.error('Erro ao carregar suas indicações:', e)
          Alert.alert(
            'Erro',
            'Não foi possível carregar suas indicações.'
          )
        }
      })()
    }, [])
  )

  // copia o link pro clipboard
  const handleCopy = async (link) => {
    await Clipboard.setStringAsync(link)
    Alert.alert('Copiado', 'Link copiado para a área de transferência.')
  }

  // renderiza cada linha
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
        onPress={() => handleCopy(item.link)}
      >
        <Text style={styles.buttonCopyText}>Copiar</Text>
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

      <LinearGradient
        colors={['#f0f2f5', '#dfe4ea']}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={styles.container}>
          {/* cabeçalho igual às outras telas */}
          <View style={styles.headerContainer}>
            <Image
              source={require('../images/logo_s_fundo_s_nome.png')}
              style={styles.logo}
            />
            <Text style={styles.headerTitle}>Indika</Text>
          </View>

          <FlatList
            data={lista}
            keyExtractor={(row) => String(row.id)}
            renderItem={renderItem}
            ItemSeparatorComponent={() => (
              <View style={styles.separator} />
            )}
            ListEmptyComponent={() => (
              <View style={styles.empty}>
                <Text style={styles.emptyText}>
                  Você ainda não indicou nada.
                </Text>
              </View>
            )}
          />
        </SafeAreaView>
      </LinearGradient>
    </>
  )
}