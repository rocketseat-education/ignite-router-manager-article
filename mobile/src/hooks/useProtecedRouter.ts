import { router, useRootNavigation, useSegments } from "expo-router";
import { useEffect, useState } from "react";

export function useProtectedRouter(token: string) {
  const [isNavigationReady, setNavigationReady] = useState(false);

  const rootNavigation = useRootNavigation();
  const segments = useSegments()

  // Conferir se nosso contexto de navegação está pronto
  useEffect(() => {
    const unsubcribe = rootNavigation?.addListener('state', () => {
      setNavigationReady(true)
    })

    return () => {
      if(unsubcribe) {
        unsubcribe()
      }
    }
  },[rootNavigation])

  // Verificação de rotas públicas e privadas
  useEffect(() => {
    if(!isNavigationReady) return

    const inAuthGroup = segments[0] === '(auth)'

    if(!token && !inAuthGroup) {
      router.replace('/sign-in')
    } else if(token && inAuthGroup) {
      router.replace('/home')
    }
  },[token, isNavigationReady])
}