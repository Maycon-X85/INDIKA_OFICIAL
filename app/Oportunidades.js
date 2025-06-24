import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import {
    Image,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import styles from '../components/stylesCadastro';

export default function Oportunidades() {
    const router = useRouter();

    const handleNavigate = (path) => {
        router.push(path);
    };

    return (
        <>
            {/* Escondemos o cabeçalho padrão do React Navigation para usar nosso próprio header */}
            <Stack.Screen
                options={{
                    title: '',
                    headerBackVisible: true,
                    headerStyle: { backgroundColor: '#1e1e1e' },
                    headerBackTitle: 'Voltar',
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: 'bold' },
                }}
            />

            {/* Fundo em degradê (mesmo do Cadastro e da Home) */}
            <LinearGradient
                colors={['#f0f2f5', '#dfe4ea']}
                style={styles.gradientBackground}
            >
                <SafeAreaView style={styles.homeContainer}>
                    {/* Header escuro compacto, mesma altura que na Home e no Cadastro */}
                    <View style={styles.homeHeader}>
                        <Image
                            source={require('../images/logo_s_fundo_s_nome.png')}
                            style={styles.homeLogo}
                            resizeMode="contain"
                        />
                        <Text style={styles.homeTitle}>Indika</Text>
                    </View>

                    {/* Área central, botões “cártão” arredondados com sombra */}
                    <View style={styles.homeButtonArea}>
                        <TouchableOpacity
                            style={styles.homeButton}
                            onPress={() => handleNavigate('Cadastrooportunidades')}
                        >
                            <Text style={styles.homeButtonText}>
                                CADASTRO DE OPORTUNIDADES
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.homeButton}
                            onPress={() => handleNavigate('Linksindicacoes')}
                        >
                            <Text style={styles.homeButtonText}>LINKS DE INDICAÇÕES</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        </>
    );
}