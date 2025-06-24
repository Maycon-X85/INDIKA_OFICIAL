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

export default function Home() {
  const router = useRouter();

  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: '',
          headerBackVisible: false,
          headerStyle: { backgroundColor: '#1e1e1e' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />

      <LinearGradient
        colors={['#f0f2f5', '#dfe4ea']}  // degradê suave de cinza claro
        style={styles.gradientBackground}
      >
        <SafeAreaView style={styles.homeContainer}>
          {/* Header personalizado */}
          <View style={styles.homeHeader}>
            <Image
              source={require('../images/logo_s_fundo_s_nome.png')}
              style={styles.homeLogo}
              resizeMode="contain"
            />
            <Text style={styles.homeTitle}>Indika</Text>
          </View>

          {/* Área central com botões arredondados e sombreados */}
          <View style={styles.homeButtonArea}>
            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => handleNavigate('Cadastro')}
            >
              <Text style={styles.homeButtonText}>CADASTRO</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => handleNavigate('Oportunidades')}
            >
              <Text style={styles.homeButtonText}>OPORTUNIDADES</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => handleNavigate('Indicacoes')}
            >
              <Text style={styles.homeButtonText}>MINHAS INDICAÇÕES</Text>
            </TouchableOpacity>
          </View>

          {/* Rodapé fixo com botão “SAIR” */}
          <TouchableOpacity
            style={styles.homeFooter}
            onPress={() => router.push('/')}
          >
            <Text style={styles.homeFooterText}>SAIR</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}