import { FlatList, Icon, useToast, VStack } from 'native-base'
import { Octicons } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { Button } from '../components/Button'
import { Header } from '../components/Header'
import { api } from '../libs/axios'
import { useCallback, useEffect, useState } from 'react'

import { PollCard, PollCardPros } from '../components/PollCard'
import { EmptyPollList } from '../components/EmptyPollList'
import { Loading } from '../components/Loading'

export function Polls() {
  const [isLoading, setIsLoading] = useState(true)
  const [polls, setPolls] = useState<PollCardPros[]>([])
  
  const { navigate } = useNavigation()

  const toast =  useToast()

  async function fetchPolls() {
    try {
      setIsLoading(true)

      const response = await api.get('/polls')
      setPolls(response.data.polls)
    } catch (error) {
      console.log(error)
      
      toast.show({
        title: 'Não foi possível carregar os bolões',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(useCallback(
    () => {
      fetchPolls()
    }, []
  ))

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus bolões" />

      <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4}>
        <Button
          title="BUSCAR BOLÃO POR CÓDIGO"
          leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />}
          onPress={() => navigate('find')}
        />
      </VStack>

      {isLoading
        ? <Loading />
        : <FlatList
            data={polls}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <PollCard
                data={item}
                onPress={() => navigate('details', { id: item.id })}
              />
            )}
            ListEmptyComponent={() => <EmptyPollList />}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ pb: 10 }}
            px={5}
          />
      }
    </VStack>
  )
}
