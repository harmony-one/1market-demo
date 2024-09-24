import React from 'react'
import { Box, Grommet, Text } from 'grommet'
import { darkTheme } from '../theme/grommet'
import { Header } from './Header'
import { OneMarketDataProvider } from '../provider/DataProvider'
import { MainContent } from '../pages/mainContent'

const App: React.FC = () => {
  return (
    <Grommet theme={darkTheme} themeMode={'dark'} full>
      <OneMarketDataProvider>
        <Header />
        <MainContent />
      </OneMarketDataProvider>
    </Grommet>
  )
}

export default App
