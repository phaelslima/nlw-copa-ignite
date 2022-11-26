import { Center, NativeBaseProvider, StatusBar, Text } from 'native-base'
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto'

import { Loading } from './src/components/Loading'

import { THEME } from './src/styles/theme'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold })

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Center flex={1} bg="gray.900">
        {fontsLoaded ? <Text>Hello world!</Text> : <Loading />}
      </Center>
    </NativeBaseProvider>
  )
}
