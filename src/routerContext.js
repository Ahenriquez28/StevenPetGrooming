import { createContext, useContext } from 'react'

export const RouterCtx = createContext({ path: '/', navigate: () => {} })
export const useRouter = () => useContext(RouterCtx)
