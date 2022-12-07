import { useEffect, useState } from 'react';
import { useToast, FlatList } from 'native-base';

import { api } from '../libs/axios';

import { GameProps, Game } from './Game';

interface Props {
  pollId: string
}

export function Guesses({ pollId }: Props) {
  const toast = useToast()

  const [games, setGames] = useState<GameProps[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [firstTeamPoints, setFirstTeamPoints] = useState('')
  const [secondTeamPoints, setSecondTeamPoints] = useState('')

  async function fetchGames() {
    try {
      setIsLoading(true)

      const { data } = await api.get(`polls/${pollId}/games`)

      setGames(data.games as GameProps[])
    } catch(e) {
      console.log(e)

      toast.show({
        title: 'Não foi possível carregar os palpites.',
        bgColor: 'red.600',
        placement: 'bottom'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchGames()
  }, [pollId])

  return (
    <FlatList 
      data={games}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Game 
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => {}}
        />
      )}
    />
  )
}