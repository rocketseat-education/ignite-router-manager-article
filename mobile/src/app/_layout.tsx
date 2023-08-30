import { Slot, Stack } from "expo-router";
import { 
  useFonts, 
  Nunito_400Regular, 
  Nunito_700Bold, 
  Nunito_800ExtraBold 
} from '@expo-google-fonts/nunito'
import { AuthProvider } from "../contexts/auth-provider";


export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    Nunito_400Regular, 
    Nunito_700Bold, 
    Nunito_800ExtraBold 
  })

  if(!fontsLoaded) return null

  return(
    <AuthProvider>
      <Slot />
    </AuthProvider>
    
  )
}