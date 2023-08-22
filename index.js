import { ethers } from 'ethers'
import {PRIVATE_KEY, PRIVATE_KEY_2, ganacheProvider} from './config.js'

const {utils, providers, Wallet } = ethers


const provider = new providers.Web3Provider(ganacheProvider)

const wallet1 = new Wallet(PRIVATE_KEY, provider);
const wallet2 = new Wallet(PRIVATE_KEY_2, provider);

(async () => {
    console.log("balance wallet1: ", utils.formatEther(await wallet1.getBalance()))
    console.log("balance wallet2: ", utils.formatEther(await wallet2.getBalance()))


    // const tx0 = await wallet1.sendTransaction({
    //     value: utils.parseEther(".5"),
    //     to: wallet2.address,
    // })
    // const tx1 = await wallet1.sendTransaction({
    //     value: utils.parseEther(".5"),
    //     to: wallet2.address,
    // })

    
    // const tx2 = await wallet1.sendTransaction({
    //     value: utils.parseEther("5"),
    //     to: wallet2.address,
    // })

    await payroll(50, wallet1, [wallet2.address])

    console.log("after balance wallet1: ", utils.formatEther(await wallet1.getBalance()))
    console.log("after balance wallet2: ", utils.formatEther(await wallet2.getBalance()))
})();

// TODO
/*
- send a transaction *
- inspect the transaction *
- send multiple transactions *
- inspect the nonce *
- inspect the wallet balances *

exercise
- send to multiple addresses at once
- inspect the state of each wallet

exercise
- find all addresses that have received ether from a specified address
*/

async function  payroll(amount, sender, employees) {
    const GAS = 50 // in WEI
    // check that amount is greater than zero *
    // check that employees list has atleast one employee *
    // check that sender has enough balance ?
    // loop through employees
    // call send transaction for each employee with the amount
    if(amount <= 0 || employees.length==0) return
    const senderBalance = await sender.getBalance()
    if( senderBalance >= ((employees.length * amount) + GAS)) {
        await Promise.all(employees.map((employeeAddress) => {
            return sender.sendTransaction({
                value: amount,
                to: employeeAddress,
            })
        }))
    } else {
        console.log('it didnt work...')
    } 
}