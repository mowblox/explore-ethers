import { ethers } from 'ethers'
import Ganache from "ganache-core"
const { utils, Wallet } = ethers

const PRIVATE_KEY = "0xf2f48ee19680706196e2e339e5da3491186e0c4c5030670656b0e0164837257d";
const INITIAL_BALANCE = utils.parseEther('10.0');

const PRIVATE_KEY_2 ="0x4f39d7a86f79964a7129aba81d3c8fdfec6d2e0e33b3d1cc20bbc3c02c1f2b28"; 

const SEED_PHRASE_3 = "carbon subway wet hard weapon minimum satisfy cheese spoon jar gym ensure"

const PRIVATE_KEY_3 = "0xc5ab4681481e4b4b805beea8378e59ebbd241f264c536acd64c0a3b22fa77a76"

const wall = Wallet.fromMnemonic(SEED_PHRASE_3)


// create our test account from the private key, initialize it with 10 ether
const accounts = [].concat([{
    balance: INITIAL_BALANCE.toHexString(),
    secretKey: PRIVATE_KEY,
},{
    balance: INITIAL_BALANCE.toHexString(),
    secretKey: PRIVATE_KEY_2,
},{
    balance: INITIAL_BALANCE.toHexString(),
    secretKey: PRIVATE_KEY_3,
}
]);

const ganacheProvider = Ganache.provider({ accounts });
export {
    INITIAL_BALANCE,
    PRIVATE_KEY,
    PRIVATE_KEY_2,
    PRIVATE_KEY_3,
    ganacheProvider,
    wall
}