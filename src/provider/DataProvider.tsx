import React, {createContext, useContext, useState, PropsWithChildren, useEffect, useMemo} from 'react';
import Web3 from 'web3'
const marketsConfig = require('src/conf/config.local.json')

// Set "null" for local deployment:
export const DefaultProvider = marketsConfig.networkId === 1666600000
  ? new Web3(new Web3.providers.HttpProvider('https://api.harmony.one'))
  : null

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
      web3: DefaultProvider,
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

  return <UserDataContext.Provider value={{
    state: oneMarketState,
    setState: setOneMarketState
  }}>
    {children}
  </UserDataContext.Provider>
};
