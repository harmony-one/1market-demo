import React, { useEffect } from 'react'
import Web3Connect from 'web3connect'
import { Button } from 'antd'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { getCurrentNetworkName } from 'src/utils/web3'
import styles from '../style.module.css'
import { Box, Text } from 'grommet'
import { toHex } from 'web3-utils'
import { DefaultProvider } from '../../provider/DataProvider'

const networkId = process.env.REACT_APP_NETWORK_ID && parseInt(process.env.REACT_APP_NETWORK_ID)

type Props = {
  account: string
  setProviderData: Function
}

let web3ConnectListenersAdded = false

const web3Connect = new Web3Connect.Core({
  network: getCurrentNetworkName() || 'harmony',
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: process.env.REACT_APP_INFURA_ID,
      },
    },
  },
})

const Web3ConnectButton: React.FC<Props> = ({ account, setProviderData }) => {
  const connectProvider = (provider: any) => setProviderData(provider)
  const disconnectProvider = () => setProviderData(DefaultProvider)

  useEffect(() => {
    if (!web3ConnectListenersAdded) {
      web3ConnectListenersAdded = true

      web3Connect.on('connect', (provider: any) => {
        connectProvider(provider)
      })

      web3Connect.on('disconnect', () => {
        disconnectProvider()
      })

      web3Connect.on('close', () => {})
    }
  })

  const getTypeOfAccount = () => {
    let type: string
    if (account === process.env.REACT_APP_OPERATOR_ADDRESS) {
      type = 'Operator'
    } else if (account === process.env.REACT_APP_ORACLE_ADDRESS) {
      type = 'Oracle'
    } else {
      type = 'Trader'
    }
    return type
  }

  return account ? (
    <div className={styles.header}>
      <Box>
        <Box width={'140px'}>
          <Text size={'18px'} style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden'
          }}>{account}</Text>
        </Box>
        <Box>
          <Text weight={500} size={'16px'}>{getTypeOfAccount()}</Text>
        </Box>
      </Box>
      <div>
        <Button type={'primary'} size={'large'} onClick={disconnectProvider}>
          Disconnect
        </Button>
      </div>
    </div>
  ) : (
    <Button
      type={'primary'}
      size={'large'}
      disabled={!window.ethereum}
      onClick={async () => {
      try {
        if(window.ethereum) {
          if(window.ethereum.networkVersion !== networkId && networkId) {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: toHex(networkId as number) }]
            });
          }
        }
      } catch (e) {
        console.error('Failed to switch network', e)
      }
      await web3Connect.toggleModal()
    }}>
      {window.ethereum ? 'Connect Wallet' : 'Install MetaMask'}
    </Button>
  )
}

export default Web3ConnectButton
