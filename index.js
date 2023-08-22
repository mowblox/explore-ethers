import {ethers } from 'ethers'
import {PRIVATE_KEY, PRIVATE_KEY_2, ganacheProvider} from './config.js'

const {utils, providers, Wallet } = ethers


const provider = new providers.Web3Provider(ganacheProvider)

const wallet = new Wallet(PRIVATE_KEY, provider);
const wall2 = new Wallet(PRIVATE_KEY_2, provider);

// TODO
/*
- send a transaction
- inspect the transaction
- send multiple transactions
- inspect the nonce
- inspect the wallet balances

exercise
- send to multiple addresses at once
- inspect the state of each wallet

exercise
- find all addresses that have received ether from a specified address
*/