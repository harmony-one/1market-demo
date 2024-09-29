import React from 'react'
import { Box, Grommet, Text } from 'grommet'
import { darkTheme } from '../theme/grommet'
import {ConfigProvider} from "antd";
import { Header } from './Header'
import { OneMarketDataProvider } from '../provider/DataProvider'
import { MainContent } from '../pages/mainContent'
import { antdTheme } from '../theme/antd'

const App: React.FC = () => {
  return (
    <ConfigProvider theme={antdTheme}>
      <Grommet theme={darkTheme} themeMode={'dark'} full>
        <OneMarketDataProvider>
          <Header />
          <MainContent />
        </OneMarketDataProvider>
      </Grommet>
    </ConfigProvider>
  )
}

export default App
