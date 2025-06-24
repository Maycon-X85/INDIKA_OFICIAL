import { Stack, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import styles from '../components/styles'
import { initDB, queryAsync, runAsync } from '../services/dbCadastro'

export default function Login() {
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')
  const router = useRouter()

  // 1) Certifica-se de que o DB e as tabelas existam
  useEffect(() => {
    initDB().catch(console.error)
  }, [])

  // 2) Criar conta normalmente na tabela users
  const handleCreateAccount = async () => {
    if (!login.trim() || !senha.trim()) {
      return Alert.alert('Atenção', 'Preencha login e senha para criar conta.')
    }
    try {
      await runAsync(
        'INSERT INTO users (login, senha) VALUES (?, ?);',
        [login.trim(), senha]
      )
      Alert.alert('Sucesso', 'Conta criada! Agora faça login.')
      setSenha('')
    } catch (e) {
      console.error(e)
      Alert.alert('Erro', 'Falha ao criar conta (talvez já exista).')
    }
  }

  // 3) Autenticar e gravar session
  const handleLogin = async () => {
    if (!login.trim() || !senha.trim()) {
      return Alert.alert('Atenção', 'Preencha login e senha.')
    }
    try {
      // busca o usuário
      const rows = await queryAsync(
        'SELECT id FROM users WHERE login = ? AND senha = ?;',
        [login.trim(), senha]
      )
      if (rows.length === 0) {
        return Alert.alert('Falha', 'Login ou senha incorretos.')
      }

      const userId = rows[0].id

      // limpa sessão anterior e grava a nova
      await runAsync('DELETE FROM session;')
      await runAsync('INSERT INTO session (userId) VALUES (?);', [userId])

      // navega para a home
      router.push('/Home')
    } catch (e) {
      console.error(e)
      Alert.alert('Erro', 'Não foi possível autenticar.')
    }
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Image
              source={require('../images/logo_s_fundo_s_nome.png')}
              style={styles.logo}
            />
            <Text style={styles.title}>Indika</Text>

            <View style={styles.form}>
              <Text style={styles.label}>LOGIN</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu login"
                autoCapitalize="none"
                value={login}
                onChangeText={setLogin}
              />

              <Text style={styles.label}>SENHA</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite sua senha"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
              />

              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>ENTRAR</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#aaa', marginTop: 12 }]}
                onPress={handleCreateAccount}
              >
                <Text style={styles.buttonText}>CRIAR CONTA</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}