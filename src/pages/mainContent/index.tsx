import React from 'react'
import { Box } from 'grommet'
import Market from '../../components/Market'
import { useOneMarket } from '../../provider/DataProvider'

export const MainContent = () => {
  const { state: { web3, account } } = useOneMarket()

  return <Box>
    {web3 && <Market web3={web3} account={account} />}
  </Box>
}
