import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import styles from '../components/stylesCadastro';
import { initDB, queryAsync, runAsync } from '../services/dbCadastro';
import { formatCpfCnpj } from '../utilitarios/mascaras';

export default function Cadastro() {
    // Estado para buscar por CPF/CNPJ
    const [searchCpfCnpj, setSearchCpfCnpj] = useState('');
    // Estados dos campos do formulário
    const [nome, setNome] = useState('');
    const [cpfCnpj, setCpfCnpj] = useState('');
    const [telefone, setTelefone] = useState('');
    const [tipo, setTipo] = useState('');
    const [email, setEmail] = useState('');
    const [site, setSite] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    // Controle de foco para destaque de borda
    const [focusedField, setFocusedField] = useState(null);
    // Estado para as checkboxes de Tipo de Cadastro
    const [roles, setRoles] = useState({
        indicador: false,
        indicado: false,
        comprador: false,
    });
    /**
 * @param {'indicador'|'indicado'|'comprador'} role
 */
    function toggleRole(role) {
        setRoles(prev => ({
            ...prev,
            [role]: !prev[role],
        }));
    }
    // Inicializa o banco de dados e cria a tabela
    useEffect(() => {
        initDB().catch(err => console.error('Erro initDB:', err));
    }, []);

    // Salva ou atualiza cadastro
    const handleSave = async () => {
        if (!nome.trim() || !cpfCnpj.trim()) {
            return Alert.alert('ATENÇÃO', 'Preencha pelo menos Nome e CPF/CNPJ.');
        }
        try {
            await runAsync(
                `INSERT INTO cadastros
          (nome, cpfCnpj, telefone, tipo, email, site, rua, numero, bairro, cidade, uf)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
                [
                    nome.trim(),
                    cpfCnpj.trim(),
                    telefone.trim(),
                    tipo.trim(),
                    email.trim(),
                    site.trim(),
                    rua.trim(),
                    numero.trim(),
                    bairro.trim(),
                    cidade.trim(),
                    uf.trim(),
                ]
            );
            Alert.alert('SUCESSO', 'Cadastro SALVO/ALTERADO com sucesso!');
            // Limpa campos
            setNome('');
            setCpfCnpj('');
            setTelefone('');
            setTipo('');
            setEmail('');
            setSite('');
            setRua('');
            setNumero('');
            setBairro('');
            setCidade('');
            setUf('');
        } catch (e) {
            console.error('Erro ao salvar:', e);
            Alert.alert('Erro', 'Não foi possível salvar o cadastro.');
        }
    };

    // 3) Busca um cadastro existente pelo CPF/CNPJ
    const handleSearch = async () => {
        const cpf = searchCpfCnpj.trim();
        if (!cpf) {
            return Alert.alert('ATENÇÃO', 'Informe um CPF/CNPJ válido.');
        }
        try {
            const rows = await queryAsync(
                'SELECT * FROM cadastros WHERE cpfCnpj = ?;',
                [cpf]
            );
            if (rows.length > 0) {
                const rec = rows[0];
                setNome(rec.nome);
                setCpfCnpj(rec.cpfCnpj);
                setTelefone(rec.telefone);
                setTipo(rec.tipo);
                setEmail(rec.email);
                setSite(rec.site);
                setRua(rec.rua);
                setNumero(rec.numero);
                setBairro(rec.bairro);
                setCidade(rec.cidade);
                setUf(rec.uf);
                Alert.alert('LOCALIZADO', `Cadastro #${rec.id} carregado na tela.`);
            } else {
                Alert.alert('NÃO ECONTRADO', `Nenhum cadastro com CPF/CNPJ ${cpf} foi localizado.`);
            }
        } catch (e) {
            console.error('Erro ao buscar:', e);
            Alert.alert('ERRO', 'Falha ao buscar cadastro.');
        }
    };

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
                {/* Cabeçalho com logo */}
                <View style={styles.header}>
                    <Image
                        source={require('../images/logo_s_fundo_s_nome.png')}
                        style={styles.homeLogo}
                        resizeMode="contain"
                    />
                    <Text style={styles.homeTitle}>Indika</Text>
                </View>

                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                    <ScrollView
                        contentContainerStyle={styles.formContainer}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* Buscar por CPF/CNPJ */}
                        <Text style={styles.inputLabel}>Buscar Cadastro (CPF/CNPJ)</Text>
                        <View style={styles.row}>
                            <TextInput
                                style={[styles.textInput, { flex: 1 }]}
                                placeholder="000.000.000-00 ou 00.000.000/0000-00"
                                keyboardType="numeric"
                                value={searchCpfCnpj}
                                onChangeText={t => setSearchCpfCnpj(formatCpfCnpj(t))}
                            />
                            <TouchableOpacity
                                style={[styles.bottomButton, { marginLeft: 8 }]}
                                onPress={handleSearch}
                            >
                                <Text style={styles.bottomButtonText}>Buscar</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Campos do formulário */}
                        <Text style={[styles.inputLabel, { marginTop: 10 }]}>
                            NOME / RAZÃO SOCIAL
                        </Text>
                        <TextInput
                            style={[
                                styles.textInput,
                                focusedField === 'nome' && styles.textInputFocused,
                            ]}
                            placeholder="Digite seu nome ou razão social"
                            placeholderTextColor="#999"
                            value={nome}
                            onChangeText={setNome}
                            onFocus={() => setFocusedField('nome')}
                            onBlur={() => setFocusedField(null)}
                        />

                        <Text style={styles.inputLabel}>CPF / CNPJ</Text>
                        <TextInput
                            style={[
                                styles.textInput,
                                focusedField === 'cpf' && styles.textInputFocused,
                            ]}
                            keyboardType="numeric"
                            placeholder="000.000.000-00 ou 00.000.000/0000-00"
                            placeholderTextColor="#999"
                            value={cpfCnpj}
                            onChangeText={t => setCpfCnpj(formatCpfCnpj(t))}
                            onFocus={() => setFocusedField('cpf')}
                            onBlur={() => setFocusedField(null)}
                        />

                        <Text style={styles.inputLabel}>TELEFONE</Text>
                        <TextInput
                            style={[
                                styles.textInput,
                                focusedField === 'telefone' && styles.textInputFocused,
                            ]}
                            keyboardType="phone-pad"
                            placeholder="(XX) XXXXX-XXXX"
                            placeholderTextColor="#999"
                            value={telefone}
                            onChangeText={setTelefone}
                            onFocus={() => setFocusedField('telefone')}
                            onBlur={() => setFocusedField(null)}
                        />

                        <Text style={[styles.inputLabel, { marginTop: 20 }]}>
                            TIPO DE CADASTRO
                        </Text>
                        <View style={styles.checkboxGroup}>
                            {['indiKador', 'indiKado', 'comprador'].map(role => (
                                <TouchableOpacity
                                    key={role}
                                    style={styles.checkboxContainer}
                                    onPress={() => toggleRole(role)}
                                >
                                    <View
                                        style={[
                                            styles.checkbox,
                                            roles[role] && styles.checkboxChecked,
                                        ]}
                                    />
                                    <Text style={styles.checkboxLabel}>
                                        {role.charAt(0).toUpperCase() + role.slice(1)}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text style={styles.inputLabel}>EMAIL</Text>
                        <TextInput
                            style={[
                                styles.textInput,
                                focusedField === 'email' && styles.textInputFocused,
                            ]}
                            placeholder="seuemail@exemplo.com"
                            placeholderTextColor="#999"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                        />

                        <Text style={styles.inputLabel}>SITE</Text>
                        <TextInput
                            style={[
                                styles.textInput,
                                focusedField === 'site' && styles.textInputFocused,
                            ]}
                            placeholder="https://www.seusite.com.br"
                            placeholderTextColor="#999"
                            value={site}
                            onChangeText={setSite}
                            onFocus={() => setFocusedField('site')}
                            onBlur={() => setFocusedField(null)}
                        />

                        <Text style={styles.inputLabel}>ENDEREÇO:{"\n"}RUA</Text>
                        <TextInput
                            style={[
                                styles.textInput,
                                focusedField === 'rua' && styles.textInputFocused,
                            ]}
                            placeholder="Digite o nome da rua"
                            placeholderTextColor="#999"
                            value={rua}
                            onChangeText={setRua}
                            onFocus={() => setFocusedField('rua')}
                            onBlur={() => setFocusedField(null)}
                        />

                        <View style={styles.row}>
                            <View style={styles.flex30}>
                                <Text style={styles.inputLabel}>NÚMERO</Text>
                                <TextInput
                                    style={[
                                        styles.textInput,
                                        focusedField === 'numero' && styles.textInputFocused,
                                    ]}
                                    placeholder="123"
                                    placeholderTextColor="#999"
                                    value={numero}
                                    onChangeText={setNumero}
                                    onFocus={() => setFocusedField('numero')}
                                    onBlur={() => setFocusedField(null)}
                                />
                            </View>
                            <View style={styles.flex70}>
                                <Text style={styles.inputLabel}>BAIRRO</Text>
                                <TextInput
                                    style={[
                                        styles.textInput,
                                        focusedField === 'bairro' && styles.textInputFocused,
                                    ]}
                                    placeholder="Nome do bairro"
                                    placeholderTextColor="#999"
                                    value={bairro}
                                    onChangeText={setBairro}
                                    onFocus={() => setFocusedField('bairro')}
                                    onBlur={() => setFocusedField(null)}
                                />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.flex70}>
                                <Text style={styles.inputLabel}>CIDADE</Text>
                                <TextInput
                                    style={[
                                        styles.textInput,
                                        focusedField === 'cidade' && styles.textInputFocused,
                                    ]}
                                    placeholder="Nome da cidade"
                                    placeholderTextColor="#999"
                                    value={cidade}
                                    onChangeText={setCidade}
                                    onFocus={() => setFocusedField('cidade')}
                                    onBlur={() => setFocusedField(null)}
                                />
                            </View>
                            <View style={styles.flex30}>
                                <Text style={styles.inputLabel}>UF</Text>
                                <TextInput
                                    style={[
                                        styles.textInput,
                                        focusedField === 'uf' && styles.textInputFocused,
                                    ]}
                                    placeholder="UF"
                                    placeholderTextColor="#999"
                                    maxLength={2}
                                    value={uf}
                                    onChangeText={setUf}
                                    onFocus={() => setFocusedField('uf')}
                                    onBlur={() => setFocusedField(null)}
                                />
                            </View>
                        </View>
                    </ScrollView>

                    {/* Botão “SALVAR” fixo no rodapé */}
                    <View style={styles.saveButtonFooter}>
                        <TouchableOpacity style={styles.bottomButton} onPress={handleSave}>
                            <Text style={styles.bottomButtonText}>SALVAR</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </LinearGradient>
        </>
    );
}
