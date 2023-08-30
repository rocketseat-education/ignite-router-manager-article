import { ReactNode, createContext, useEffect, useState } from 'react'
import { api } from '../libs/api';
import * as SecureStore from 'expo-secure-store';

type User = {
  id: string;
  name: string;
  role: string;
  bio: string
  avatar_url: string
}

type AuthContextData = {
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

type AuthProviderProps = {
  childern: ReactNode
}

const AUTH_KEY = '@router-manager:token'

export function AuthProvider({ childern }: AuthProviderProps) {

  const [user, setUser] = useState<User | null>(null)

  function updateToken(token: string) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  async function getUser() {
    const response = await api.get('/me')
    
    const { me } = response.data

    setUser(me)
  }

  async function signIn(email: string, password: string) {
    try {
      const response = await api.post('/sessions', {
        email,
        password
      })

      const { token } = response.data
      
      // atualização do token
      updateToken(token)
      await SecureStore.setItemAsync(AUTH_KEY, token)

      // Buscar dados do usuário
      await getUser()
    } catch (error) {
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {childern}
    </AuthContext.Provider>
  )
}