## 1Market Demo

### Deploy a new market
1. Generate random hash string with length 64: https://www.browserling.com/tools/random-hex

2. Change description and hash in <root>/`market.config.js`

3. Redeploy the contract:
```shell
truffle migrate --network harmony --reset
```

### Misc
Original tutorial: https://docs.gnosis.io/conditionaltokens/docs/pmtutorial1

Hash generator: https://www.browserling.com/tools/random-hex
