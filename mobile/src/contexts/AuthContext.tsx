import { createContext, ReactNode, useState } from 'react'

interface UserProps {
  name: string
  avatarURL: string
}

export interface AuthContextDataProps {
  user: UserProps
  signIn: () => Promise<void>
}

export interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps)

  async function signIn() {}

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}