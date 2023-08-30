import { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { theme } from "../../styles/theme";
import { useAuth } from "../../hooks/useAuth";

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // estado para monitorar o processamento da requisição
  const [isLoading, setIsLoading] = useState(false)

  const { signIn } = useAuth()

  async function handleSignIn() {
    setIsLoading(true)

    if(!email.trim() || !password.trim()) {
      setIsLoading(false)
      return Alert.alert('Erro', 'todos os campos são obrigatórios')
    }
    try {
      await signIn(email, password)
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível realizar o login')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SignIn</Text>

      <TextInput 
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
        placeholderTextColor={theme.colors.gray_300}
        value={email}
        onChangeText={setEmail}
        placeholder="Digite o e-mail..."
      />
      <TextInput 
        style={styles.input}
        placeholderTextColor={theme.colors.gray_300}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Digite a senha..."
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleSignIn}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size={18} />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray_900,
    justifyContent: 'center',
    padding: 24
  },
  title: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    color: theme.colors.white,
    textAlign: 'center',
    marginBottom: 56
  },
  input: {
    height: 56,
    width: '100%',
    backgroundColor: theme.colors.gray_600,
    borderRadius: 4,
    paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    flexDirection: 'row',
    marginBottom: 12,
    color: theme.colors.gray_100,
  },
  button: {
    height: 56,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.blue_light,
    marginTop: 12,
    borderRadius: 4
  },
  buttonText: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
  }
})