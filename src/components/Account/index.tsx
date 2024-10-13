import React, { useState } from 'react'
import { Box } from 'grommet'
import Web3ConnectButton from '../Web3Connect'
import Market from '../Market'
import Web3 from 'web3'
import { getWeb3Account } from '../../utils/web3'
import { useOneMarket } from '../../provider/DataProvider'

export const Account = () => {
  const {
    state: {
      web3,
      account
    },
    setState
  } = useOneMarket()

  const setProviderData = async (provider: any) => {
    let newWeb3, newAccount
    if (provider) {
      newWeb3 = new Web3(provider)
      newAccount = await getWeb3Account(newWeb3)
    } else {
      newWeb3 = null
      newAccount = null
    }
    setState({
      web3: newWeb3,
      account: newAccount,
    })
  }

  return <Box>
    {process.env.REACT_APP_ORACLE_ADDRESS && process.env.REACT_APP_OPERATOR_ADDRESS ? (
      <>
        <Web3ConnectButton account={account} setProviderData={setProviderData} />
      </>
    ) : (
      <div>Configuration error</div>
    )}
  </Box>
}
