import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../styles/theme";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useState } from "react";

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image 
            source={{ uri: 'https://ui-avatars.com/api/?name=John+Doe' }} 
            style={styles.avatar}
          />

          <Text style={styles.username}>Usuário Teste</Text>
          <Text style={styles.role}>Profissão</Text>
          <Text style={styles.bio}>Biografia</Text>
        </View>

        <TouchableOpacity>
          <MaterialCommunityIcons 
            name="logout" 
            size={28}
            color={theme.colors.blue_light}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.emptyList}>
        <Text style={styles.emptyText}>Não há postagems</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray_900
  },
  header: {
    flexDirection:'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 24,
    paddingTop: 64
  },
  userInfo: {
    flex: 1
  },
  username: {
    color : theme.colors.white,
    fontFamily: theme.fonts.extra_bold,
    fontSize: 20,
    marginTop: 16
  },
  role: {
    color: theme.colors.gray_100,
    fontFamily: theme.fonts.bold,
    fontSize: 16,
    marginTop: 8
  },
  bio: {
    color: theme.colors.gray_200,
    fontFamily: theme.fonts.regular,
    fontSize: 12,
    marginTop: 4,
    marginRight: 24
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  emptyList: {
    flex: 1,
    backgroundColor: theme.colors.gray_700,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyText: {
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray_400
  }
})