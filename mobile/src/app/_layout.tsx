import { Stack } from "expo-router";
import { 
  useFonts, 
  Nunito_400Regular, 
  Nunito_700Bold, 
  Nunito_800ExtraBold 
} from '@expo-google-fonts/nunito'

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    Nunito_400Regular, 
    Nunito_700Bold, 
    Nunito_800ExtraBold 
  })

  if(!fontsLoaded) return null

  return(
    <Stack 
      screenOptions={{
        headerShown: false
      }}
    />
  )
}