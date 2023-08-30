import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { theme } from "../../styles/theme";

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SignIn</Text>

      <TextInput 
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

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
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
    marginBottom: 12
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