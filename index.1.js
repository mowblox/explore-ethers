import {ethers } from 'ethers'
import {PRIVATE_KEY, PRIVATE_KEY_2, ganacheProvider} from './config.js'

const {utils, providers, Wallet } = ethers


const provider = new providers.Web3Provider(ganacheProvider)

const wallet = new Wallet(PRIVATE_KEY, provider);
const wall2 = new Wallet(PRIVATE_KEY_2, provider);

// wallet.signTransaction({
//     value: utils.parseEther("1.0"),
//     to: wall2.address,
//     gasLimit: 21000,
// }).then((tx) => {
//     console.log('tx2: ', tx);
//     console.log('parsed tx2: ', utils.parseTransaction(tx));
// })

// wallet.signTransaction({
//     value: utils.parseEther("1.0"),
//     to: wall2.address,
//     gasLimit: 21000,
// }).then((tx) => {
//     console.log('tx2: ', tx);
//     // parse the returned hex
//     console.log('parsed tx2: ', utils.parseTransaction(tx));
// })

(async () => {
    const res0 = await wallet.sendTransaction({
        value: utils.parseEther("1.0"),
        to: wall2.address,
        gasLimit: 21000,
    })
    
    const res = await wallet.sendTransaction({
        value: utils.parseEther("2.12"),
        to: wall2.address,
        gasLimit: 21000,
    }, )

    console.log('res0', res0)
    console.log('res', res)

    // get balance

    console.log('balance: ', utils.formatEther(await wallet.getBalance()))
    
    const blockNumber = await provider.getBlockNumber();
    console.log('blocknumber: ', blockNumber)

})()