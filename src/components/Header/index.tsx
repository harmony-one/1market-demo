import React from 'react'
import { Box, Text } from 'grommet'
import { Account } from '../Account'

export const Header = () => {
  return <Box justify={'between'} direction={'row'} pad={'16px'}>
    <Box>
      <Text size={'28px'}>1Market</Text>
    </Box>
    <Box>
      <Account />
    </Box>
  </Box>
}
