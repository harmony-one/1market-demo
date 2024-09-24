import React from 'react'
import { Paper, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import styles from '../style.module.css'
import {Box, Text} from 'grommet'
import moment from 'moment'
import { Input, Button } from 'antd'

type TradingFormProps = {
  isMarketClosed: boolean
  isMarketExpired: boolean
  marketInfo: any
  setSelectedAmount: any
  setSelectedOutcomeToken: any
  selectedOutcomeToken: number
}

type TraderActionsProps = {
  marketInfo: any
  isMarketClosed: boolean
  isMarketExpired: boolean
  selectedAmount: string
  redeem: any
  buy: any
  sell: any
}

type OperatorActionsProps = {
  isMarketClosed: boolean
  close: any
}

type OracleActionsProps = {
  isMarketClosed: boolean
  marketInfo: any
  resolve: any
}

type LayoutProps = {
  account: string
  isConditionLoaded: boolean
  isMarketClosed: boolean
  isMarketExpired: boolean
  marketInfo: any
  setSelectedAmount: any
  selectedAmount: string
  setSelectedOutcomeToken: any
  selectedOutcomeToken: number
  buy: any
  sell: any
  redeem: any
  close: any
  resolve: any
}

const TradingForm: React.FC<TradingFormProps> = ({
  isMarketClosed,
  isMarketExpired,
  marketInfo,
  setSelectedAmount,
  setSelectedOutcomeToken,
  selectedOutcomeToken,
}) => (
  <>
    <Box margin={{ top: '40px' }} align={'start'}>
      <Text weight={600}>Amount</Text>
      <Input
        size={'large'}
        placeholder="0.00"
        type="number"
        onChange={e => setSelectedAmount(e.target.value)}
        disabled={isMarketClosed}
      />
    </Box>
    <RadioGroup
      defaultValue={0}
      onChange={e => setSelectedOutcomeToken(parseInt(e.target.value))}
      value={selectedOutcomeToken}
    >
      {marketInfo.outcomes.map((outcome: any, index: number) => (
        <div
          key={outcome.title}
          className={[
            styles.outcome,
            marketInfo.payoutDenominator > 0 && outcome.payoutNumerator > 0 && styles.rightOutcome,
            marketInfo.payoutDenominator > 0 &&
              !(outcome.payoutNumerator > 0) &&
              styles.wrongOutcome,
          ].join(' ')}
        >
          <FormControlLabel
            value={!isMarketClosed ? outcome.index : 'disabled'}
            control={<Radio color="primary" />}
            label={outcome.title}
          />
          <div className={styles.outcomeInfo}>Probability: {outcome.probability.toString()}%</div>
          <div className={styles.outcomeInfo}>
            My balance: {outcome.balance.toFixed(5).toString()}
          </div>
        </div>
      ))}
    </RadioGroup>
  </>
)

const TraderActions: React.FC<TraderActionsProps> = ({
  marketInfo,
  isMarketClosed,
  isMarketExpired,
  selectedAmount,
  redeem,
  buy,
  sell,
}) => (
  <>
    <h3>Trader actions</h3>
    <Box direction={'row'} justify={'center'} gap={'24px'}>
      <Button
        type={'primary'}
        size={'large'}
        onClick={redeem}
        disabled={!isMarketClosed || !marketInfo.payoutDenominator}
        style={{ width: '120px' }}
      >
        Redeem
      </Button>
      <Button
        type={'primary'}
        size={'large'}
        style={{ width: '120px' }}
        onClick={buy} disabled={isMarketClosed || !selectedAmount || isMarketExpired}
      >
        Buy
      </Button>
      <Button
        type={'primary'}
        size={'large'}
        style={{ width: '120px' }}
        onClick={sell} disabled={isMarketClosed || !selectedAmount || isMarketExpired}
      >
        Sell
      </Button>
    </Box>
  </>
)

const OperatorActions: React.FC<OperatorActionsProps> = ({ isMarketClosed, close }) => (
  <>
    <h3>Operator actions</h3>
    <Button type={'primary'} size={'large'} onClick={close} disabled={isMarketClosed}>
      Close
    </Button>
  </>
)

const OracleActions: React.FC<OracleActionsProps> = ({ isMarketClosed, marketInfo, resolve }) => (
  <>
    <h3>Oracle actions</h3>
    <div className={styles.actions}>
      {marketInfo.outcomes.map((outcome: any, index: number) => (
        <Button
          key={outcome.short}
          type={'primary'}
          size={'large'}
          onClick={() => resolve(index)}
          disabled={!isMarketClosed}
        >
          Resolve {outcome.title}
        </Button>
      ))}
    </div>
  </>
)

const Layout: React.FC<LayoutProps> = ({
  account,
  isConditionLoaded,
  isMarketClosed,
  isMarketExpired,
  marketInfo,
  setSelectedAmount,
  selectedAmount,
  setSelectedOutcomeToken,
  selectedOutcomeToken,
  buy,
  sell,
  redeem,
  close,
  resolve,
}) => {
  return (
    <Paper className={styles.condition}>
      {isConditionLoaded ? (
        <>
          <h2>{marketInfo.title}</h2>
          <Box direction={'row'} gap={'32px'} justify={'center'} align={'center'}>
            <Text size={'16px'}>State: {marketInfo.stage}</Text>
            <Text size={'16px'}>🕐 {' '} {moment(marketInfo.expirationTimestamp).format('MMM DD, YYYY')}</Text>
          </Box>
          <TradingForm
            isMarketClosed={isMarketClosed}
            isMarketExpired={isMarketExpired}
            marketInfo={marketInfo}
            setSelectedAmount={setSelectedAmount}
            setSelectedOutcomeToken={setSelectedOutcomeToken}
            selectedOutcomeToken={selectedOutcomeToken}
          />
          <TraderActions
            marketInfo={marketInfo}
            isMarketClosed={isMarketClosed}
            isMarketExpired={isMarketExpired}
            selectedAmount={selectedAmount}
            redeem={redeem}
            buy={buy}
            sell={sell}
          />
          {account === process.env.REACT_APP_OPERATOR_ADDRESS && (
            <OperatorActions isMarketClosed={isMarketClosed} close={close} />
          )}
          {account === process.env.REACT_APP_ORACLE_ADDRESS && (
            <OracleActions
              isMarketClosed={isMarketClosed}
              marketInfo={marketInfo}
              resolve={resolve}
            />
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </Paper>
  )
}

export default Layout
