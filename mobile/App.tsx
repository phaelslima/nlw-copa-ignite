import { StatusBar } from 'expo-status-bar'
import { Center, NativeBaseProvider, Spinner, Text } from 'native-base'
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto'

import { THEME } from './src/styles/theme'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold })

  return (
    <NativeBaseProvider theme={THEME}>
      <Center flex={1} bg="gray.900">
        {fontsLoaded ? <Text>Hello world!</Text> : <Spinner color="yellow.500" />}
      </Center>

      <StatusBar style="auto" />
    </NativeBaseProvider>
  )
}
