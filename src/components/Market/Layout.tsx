import React, { useState } from 'react'
import { Paper, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import styles from '../style.module.css'
import {Box, Text} from 'grommet'
import moment from 'moment'
import { Input, Button, Tabs, TabsProps } from 'antd'
import styled from "styled-components";


type TradingFormProps = {
  isMarketClosed: boolean
  isMarketExpired: boolean
  marketInfo: any
  setSelectedAmount: any
  setSelectedOutcomeToken: any
  selectedOutcomeToken: number
  buy: any
  sell: any
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

type OpType = 'buy' | 'sell'

const VoteButtonContainer = styled(Box)<{
  isPositive: boolean
}>`
    min-width: 150px;
    transition: background-color 250ms;
    cursor: pointer;
    &:hover {
        background: ${props => props.isPositive ? '#5ABF7D' : '#DD6E6E'};
    }
`

const VoteButton = (props: {
  text: string
  isPositive: boolean
  onClick: () => void
}) => {
  return <VoteButtonContainer
    isPositive={props.isPositive}
    pad={'12px'}
    round={'5px'}
    align={'center'}
    background={props.isPositive ? 'positiveBg2' : 'negativeBg2'}
    onClick={props.onClick}
    gap={'4px'}
  >
    <Text color={'white'} size={'16px'} weight={500}>{props.text}</Text>
  </VoteButtonContainer>
}

const TradingForm: React.FC<TradingFormProps> = ({
  isMarketClosed,
  isMarketExpired,
  marketInfo,
  setSelectedAmount,
  setSelectedOutcomeToken,
  selectedOutcomeToken,
  buy,
  sell
}) => {
  const [opType, setOpType] = useState<OpType>('buy')

  const items: TabsProps['items'] = [
    {
      key: 'buy',
      label: <Text size={'16px'} weight={500}>Buy</Text>,
      children: null,
    },
    {
      key: 'sell',
      label: <Text size={'16px'} weight={500}>Sell</Text>,
      children: null,
    }
  ];

  const onChangeTab = (activeKey: string) => {
    setOpType(activeKey as OpType)
  }

  const onYesClicked = async () => {
    if(opType === 'buy') {
      buy(0)
    } else {
      sell(0)
    }
  }

  const onNoClicked = async () => {
    if(opType === 'buy') {
      buy(1)
    } else {
      sell(1)
    }
  }

  return <>
    <Tabs defaultActiveKey="1" size={'large'} items={items} onChange={onChangeTab} />
    <Box margin={{ top: '16px' }} align={'start'} gap={'4px'}>
      <Text weight={500} size={'16px'}>Amount</Text>
      <Input
        size={'large'}
        placeholder="0.00"
        type="number"
        onChange={e => setSelectedAmount(e.target.value)}
        disabled={isMarketClosed}
      />
    </Box>
    <Box direction={'row'} gap={'16px'} margin={{ top: '16px' }} justify={'center'}>
      <Box align={'center'} gap={'4px'}>
        <VoteButton
          isPositive={true}
          text={`Yes ${marketInfo.outcomes[0].probability.toString()}%`}
          // outcome={marketInfo.outcomes[0]}
          onClick={onYesClicked}
        />
        <Text>My balance: {marketInfo.outcomes[0].balance.toFixed(5).toString()}</Text>
      </Box>
      <Box align={'center'} gap={'4px'}>
        <VoteButton
          isPositive={false}
          text={`No ${marketInfo.outcomes[1].probability.toString()}%`}
          // outcome={marketInfo.outcomes[1]}
          onClick={onNoClicked}
        />
        <Text>My balance: {marketInfo.outcomes[1].balance.toFixed(5).toString()}</Text>
      </Box>
    </Box>
    {/*<RadioGroup*/}
    {/*  defaultValue={0}*/}
    {/*  onChange={e => setSelectedOutcomeToken(parseInt(e.target.value))}*/}
    {/*  value={selectedOutcomeToken}*/}
    {/*>*/}
    {/*  {marketInfo.outcomes.map((outcome: any, index: number) => (*/}
    {/*    <div*/}
    {/*      key={outcome.title}*/}
    {/*      className={[*/}
    {/*        styles.outcome,*/}
    {/*        marketInfo.payoutDenominator > 0 && outcome.payoutNumerator > 0 && styles.rightOutcome,*/}
    {/*        marketInfo.payoutDenominator > 0 &&*/}
    {/*          !(outcome.payoutNumerator > 0) &&*/}
    {/*          styles.wrongOutcome,*/}
    {/*      ].join(' ')}*/}
    {/*    >*/}
    {/*      <FormControlLabel*/}
    {/*        value={!isMarketClosed ? outcome.index : 'disabled'}*/}
    {/*        control={<Radio color="primary" />}*/}
    {/*        label={outcome.title}*/}
    {/*      />*/}
    {/*      <div className={styles.outcomeInfo}>Probability: {outcome.probability.toString()}%</div>*/}
    {/*      <div className={styles.outcomeInfo}>*/}
    {/*        My balance: {outcome.balance.toFixed(5).toString()}*/}
    {/*      </div>*/}
    {/*    </div>*/}
    {/*  ))}*/}
    {/*</RadioGroup>*/}
  </>
}

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
      {/*<Button*/}
      {/*  type={'primary'}*/}
      {/*  size={'large'}*/}
      {/*  style={{ width: '120px' }}*/}
      {/*  onClick={buy} disabled={isMarketClosed || !selectedAmount || isMarketExpired}*/}
      {/*>*/}
      {/*  Buy*/}
      {/*</Button>*/}
      {/*<Button*/}
      {/*  type={'primary'}*/}
      {/*  size={'large'}*/}
      {/*  style={{ width: '120px' }}*/}
      {/*  onClick={sell} disabled={isMarketClosed || !selectedAmount || isMarketExpired}*/}
      {/*>*/}
      {/*  Sell*/}
      {/*</Button>*/}
    </Box>
  </>
)

const OperatorActions: React.FC<OperatorActionsProps> = ({ isMarketClosed, close }) => (
  <>
    <h3>Operator actions</h3>
    <Button type={'primary'} size={'large'} onClick={close} disabled={isMarketClosed}>
      Close the Market
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
            buy={buy}
            sell={sell}
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
