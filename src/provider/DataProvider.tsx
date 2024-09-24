import React, {createContext, useContext, useState, PropsWithChildren, useEffect, useMemo} from 'react';
import Web3 from 'web3'

export interface OneMarketState {
  web3: Web3 | null
  account: string
}

export interface OneMarketContextState {
  state: OneMarketState
  setState: (state: OneMarketState) => void
}

const getInitialState = (): OneMarketContextState => {
  return {
    state: {
      web3: null,
      account: '',
    },
    setState: () => {}
  }
}

const defaultState = getInitialState()
const UserDataContext = createContext(defaultState);

export const useOneMarket = () => useContext(UserDataContext);

export const OneMarketDataProvider: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [ oneMarketState, setOneMarketState ] = useState<OneMarketState>(defaultState.state)

  useEffect(() => {
    const loadData = async () => {
      try {

      } catch (e) {
        console.error('Failed to load data:', e)
      }
    }

    loadData()
  }, []);

  return <UserDataContext.Provider value={{
    state: oneMarketState,
    setState: setOneMarketState
  }}>
    {children}
  </UserDataContext.Provider>
};
