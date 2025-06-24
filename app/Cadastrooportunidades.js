// OportunidadeCadastro.js
import * as DocumentPicker from 'expo-document-picker'
import { LinearGradient } from 'expo-linear-gradient'
import { Stack, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import styles from '../components/OportunidadesCadastro'
import { initDB, queryAsync, runAsync } from '../services/dbCadastro'
import { formatCpfCnpj } from '../utilitarios/mascaras'

export default function OportunidadeCadastro() {
  const router = useRouter()

  // ​estados do formulário
  const [searchCpfCnpj, setSearchCpfCnpj] = useState('')
  const [nomeRazao, setNomeRazao] = useState('')
  const [cpfCnpj, setCpfCnpj] = useState('')
  const [ramoAtuacao, setRamoAtuacao] = useState('')
  const [descricaoServico, setDescricaoServico] = useState('')
  const [link, setLink] = useState('')
  const [comissaoPercent, setComissaoPercent] = useState('')    // % de comissão
  const [valorPropostaRaw, setValorPropostaRaw] = useState('')  // ex: "12345" = R$ 123,45
  const [valorProposta, setValorProposta] = useState('R$ 0,00')
  const [valorComissaoRaw, setValorComissaoRaw] = useState(0)   // centavos
  const [valorComissao, setValorComissao] = useState('R$ 0,00')
  const [anexo, setAnexo] = useState(null)

  // modal Android com input numérico
  const [modalVisible, setModalVisible] = useState(false)
  const [tempComissao, setTempComissao] = useState('')

  // 1) Inicializa DB
  useEffect(() => {
    initDB().catch(console.error)
  }, [])

  // 2) Recalcula comissão sempre que mude proposta ou %
  useEffect(() => {
    const vp = Number(valorPropostaRaw) / 100
    const pct = parseFloat(comissaoPercent.replace(',', '.')) || 0
    const com = vp * pct / 100
    setValorComissaoRaw(Math.round(com * 100))
    setValorComissao(
      com.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
      })
    )
  }, [valorPropostaRaw, comissaoPercent])

  // 3) Busca existente por CPF/CNPJ
  const handleSearchByCpf = async () => {
    const raw = searchCpfCnpj.replace(/\D/g, '')
    if (!raw) {
      return Alert.alert('Atenção', 'Informe um CPF/CNPJ válido.')
    }
    try {
      const rows = await queryAsync(
        'SELECT * FROM oportunidades WHERE cpfCnpj = ?;',
        [raw]
      )
      if (rows.length) {
        const rec = rows[0]
        setNomeRazao(rec.nomeRazao)
        setCpfCnpj(formatCpfCnpj(rec.cpfCnpj))
        setRamoAtuacao(rec.ramoAtuacao)
        setDescricaoServico(rec.descricaoServico)
        setLink(rec.link)
        setComissaoPercent(String(rec.comissaoPercent))
        const rawProp = String(Math.round(rec.valorProposta * 100))
        setValorPropostaRaw(rawProp)
        setValorProposta(
          (rec.valorProposta).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })
        )
        if (rec.anexoUri) setAnexo({ uri: rec.anexoUri, name: rec.anexoName })
        Alert.alert('Encontrado', 'Oportunidade carregada.')
      } else {
        Alert.alert('Não encontrado', 'Nenhuma oportunidade para este CPF/CNPJ.')
      }
    } catch (e) {
      console.error(e)
      Alert.alert('Erro', 'Falha ao buscar oportunidade.')
    }
  }

  // 4) Seleção de arquivo
  const pickDocument = async () => {
    const res = await DocumentPicker.getDocumentAsync({
      type: [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ],
      copyToCacheDirectory: false,
    })
    if (res.type === 'success') {
      setAnexo({ uri: res.uri, name: res.name })
    }
  }

  // 5) Formatação de valor da proposta em R$
  const handleValorPropostaChange = (text) => {
    const digits = text.replace(/\D/g, '')
    setValorPropostaRaw(digits)
    const num = Number(digits) / 100
    setValorProposta(
      num.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
      })
    )
  }

  // 6) Prompt/modal para comissão em %
  const askComissao = () => {
    if (Platform.OS === 'ios') {
      Alert.prompt(
        'Comissão (%)',
        '',
        (t) => t != null && setComissaoPercent(t),
        'plain-text',
        comissaoPercent
      )
    } else {
      setTempComissao(comissaoPercent)
      setModalVisible(true)
    }
  }

  // 7) Grava (ou atualiza) oportunidade
  const handleSubmit = async () => {
    if (!nomeRazao.trim() || !cpfCnpj.trim() || !ramoAtuacao.trim()) {
      return Alert.alert('Atenção', 'Preencha Nome, CPF/CNPJ e Ramo.')
    }
    const rawCpf = cpfCnpj.replace(/\D/g, '')
    try {
      // INSERT OR REPLACE para evitar UNIQUE constraint
      await runAsync(
        `INSERT OR REPLACE INTO oportunidades
          (cpfCnpj,nomeRazao,ramoAtuacao,descricaoServico,link,
           comissaoPercent,valorProposta,valorComissao,anexoUri,anexoName)
         VALUES (?,?,?,?,?,?,?,?,?,?);`,
        [
          rawCpf,
          nomeRazao.trim(),
          ramoAtuacao.trim(),
          descricaoServico.trim(),
          link.trim(),
          parseFloat(comissaoPercent.replace(',', '.')) || 0,
          Number(valorPropostaRaw) / 100,
          valorComissaoRaw / 100,
          anexo?.uri || null,
          anexo?.name || null,
        ]
      )
      Alert.alert('Sucesso', 'Oportunidade salva!')
      router.back()
    } catch (e) {
      console.error(e)
      Alert.alert('Erro', 'Não foi possível salvar.')
    }
  }

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
        <SafeAreaView style={styles.screenContainer}>
          {/* header */}
          <View style={styles.headerContainer}>
            <Image
              source={require('../images/logo_s_fundo_s_nome.png')}
              style={styles.logo}
            />
            <Text style={styles.headerTitle}>Indika</Text>
          </View>

          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <ScrollView
              contentContainerStyle={styles.formScrollContainer}
              keyboardShouldPersistTaps="handled"
            >
              {/* busca */}
              <Text style={styles.inputLabel}>Buscar por CPF/CNPJ</Text>
              <View style={styles.row}>
                <TextInput
                  style={[styles.textInput, { flex: 1 }]}
                  placeholder="000.000.000-00 ou 00.000.000/0000-00"
                  keyboardType="numeric"
                  value={searchCpfCnpj}
                  onChangeText={(t) => setSearchCpfCnpj(formatCpfCnpj(t))}
                />
                <TouchableOpacity
                  style={[styles.bottomButton, { marginLeft: 8 }]}
                  onPress={handleSearchByCpf}
                >
                  <Text style={styles.bottomButtonText}>Buscar</Text>
                </TouchableOpacity>
              </View>

              {/* formulário */}
              <Text style={[styles.inputLabel, { marginTop: 24 }]}>
                NOME / RAZÃO SOCIAL
              </Text>
              <TextInput
                style={styles.textInput}
                placeholder="Digite seu nome ou razão social"
                placeholderTextColor="#999"
                value={nomeRazao}
                onChangeText={setNomeRazao}
              />

              <Text style={styles.inputLabel}>CPF / CNPJ</Text>
              <TextInput
                style={styles.textInput}
                keyboardType="numeric"
                placeholder="000.000.000-00 ou 00.000.000/0000-00"
                placeholderTextColor="#999"
                value={cpfCnpj}
                onChangeText={(t) => setCpfCnpj(formatCpfCnpj(t))}
              />

              <Text style={styles.inputLabel}>RAMO DE ATUAÇÃO</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Ex: Tecnologia"
                placeholderTextColor="#999"
                value={ramoAtuacao}
                onChangeText={setRamoAtuacao}
              />

              <Text style={styles.inputLabel}>DESCRIÇÃO DO SERVIÇO</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Descreva brevemente o serviço"
                placeholderTextColor="#999"
                multiline
                value={descricaoServico}
                onChangeText={setDescricaoServico}
              />

              <Text style={styles.inputLabel}>LINK</Text>
              <TextInput
                style={styles.textInput}
                placeholder="https://"
                placeholderTextColor="#999"
                value={link}
                onChangeText={setLink}
              />

              <Text style={styles.inputLabel}>VALOR DA PROPOSTA</Text>
              <TextInput
                style={styles.textInput}
                placeholder="R$ 0,00"
                keyboardType="numeric"
                value={valorProposta}
                onChangeText={handleValorPropostaChange}
              />

              <Text style={styles.inputLabel}>COMISSÃO (%)</Text>
              <TouchableOpacity
                style={styles.commissionContainer}
                onPress={askComissao}
              >
                <Text style={styles.commissionText}>
                  {comissaoPercent ? `${comissaoPercent}%` : '%'}
                </Text>
              </TouchableOpacity>

              <Text style={styles.inputLabel}>VALOR DA COMISSÃO</Text>
              <TextInput
                style={styles.textInput}
                value={valorComissao}
                editable={false}
              />

              <Text style={styles.inputLabel}>ANEXAR ARQUIVO</Text>
              <TouchableOpacity style={styles.bottomButton} onPress={pickDocument}>
                <Text style={styles.bottomButtonText}>
                  {anexo ? anexo.name : 'Selecionar PDF ou DOCX'}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>

          {/* footer */}
          <View style={styles.saveButtonFooter}>
            <TouchableOpacity style={styles.bottomButton} onPress={handleSubmit}>
              <Text style={styles.bottomButtonText}>SALVAR</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* modal Android */}
      {Platform.OS !== 'ios' && (
        <Modal transparent visible={modalVisible}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Comissão (%)</Text>
              <TextInput
                value={tempComissao}
                onChangeText={setTempComissao}
                keyboardType="numeric"
                style={styles.textInput}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.modalButton}
                >
                  <Text>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setComissaoPercent(tempComissao)
                    setModalVisible(false)
                  }}
                  style={[styles.modalButton, { marginLeft: 10 }]}
                >
                  <Text>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </>
  )
}