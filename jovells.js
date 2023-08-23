import { ethers } from 'ethers'
import {PRIVATE_KEY, PRIVATE_KEY_2, PRIVATE_KEY_3, ganacheProvider, wall} from './config.js'
import { stopMiner, mineBlock } from './where.js';

const {utils, providers, Wallet } = ethers


const provider = new providers.Web3Provider(ganacheProvider);

const wallet4 = ethers.Wallet.createRandom().connect(provider);
const wallet5 = ethers.Wallet.createRandom().connect(provider);
const wallet6 = ethers.Wallet.createRandom().connect(provider);


const wallet1 = new Wallet(PRIVATE_KEY, provider);
const wallet2 = new Wallet(PRIVATE_KEY_2, provider);
const wallet3 = new Wallet(PRIVATE_KEY_3, provider);

// (async () => {
//     console.log("balance wallet1: ", utils.formatEther(await wallet1.getBalance()))
//     console.log("balance wallet2: ", utils.formatEther(await wallet2.getBalance()))
//     console.log("balance wallet3: ", utils.formatEther(await wallet3.getBalance()))
//     console.log("balance wallet4: ", utils.formatEther(await wallet4.getBalance()))
//     console.log("balance wallet4: ", utils.formatEther(await wallet5.getBalance()))
//     console.log("balance wallet4: ", utils.formatEther(await wallet6.getBalance()))

//     stopMiner();
//     let i = 0; 
//     // block 1
//     await payroll(0.3, wallet1, [
//         wallet2.address,
//         wallet3.address,
//         wallet4.address,
//     ]);
//     await payroll(0.3, wallet1, [
//         wallet2.address,
//         wallet3.address,
//         wallet4.address,
//     ]);
//     await payroll(0.3, wallet1, [
//         wallet2.address,
//         wallet3.address,
//         wallet4.address,
//     ]);
//     mineBlock()

//     //block 2;
//     // await payroll(0.3, wallet1, [
//     //     wallet2.address,
//     //     wallet3.address,
//     //     wallet4.address,
//     // ]);
//     // await payroll(0.3, wallet1, [
//     //     wallet2.address,
//     //     wallet3.address,
//     //     wallet4.address,
//     // ]);
//     // await payroll(0.3, wallet1, [
//     //     wallet2.address,
//     //     wallet3.address,
//     //     wallet4.address,
//     // ]);
//     // mineBlock()


//     console.log("after balance wallet1: ", utils.formatEther(await wallet1.getBalance()))
//     console.log("after balance wallet2: ", utils.formatEther(await wallet2.getBalance()))
//     console.log("after balance wallet3: ", utils.formatEther(await wallet3.getBalance()))
//     console.log("after balance wallet4: ", utils.formatEther(await wallet4.getBalance()))
//     console.log("after balance wallet5: ", utils.formatEther(await wallet5.getBalance()))
//     console.log("after balance wallet6: ", utils.formatEther(await wallet6.getBalance()))

//     const add = await findAddresses(wallet1.address)
// console.log("addresses: ", add)
// })();

// TODO
/*
- send a transaction *
- inspect the transaction *
- send multiple transactions *
- inspect the nonce *
- inspect the wallet balances *

exercise
- send to multiple addresses at once *
- inspect the state of each wallet *
- process all amounts in WEI *

assignment
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
    const amountInWei = utils.parseUnits(amount.toString(), 18)
    // console.log('amountInWei', amountInWei)
    // parseEther === parseUnit( 18)
    if( senderBalance >= ((employees.length * amountInWei) + GAS)) {
        // challenge: fix the nonce error when the promises "resolve" at the same time

        // await Promise.all(employees.map((employeeAddress) => {
        //     return sender.sendTransaction({
        //         value: amountInWei,
        //         to: employeeAddress,
        //     })
        // }))

        for(let i=0; i<employees.length; i++) {
            const receipt = await sender.sendTransaction({
                    value: amountInWei,
                    to: employees[i],
                })
                // await receipt.wait()
        } 
    } else {
        console.log('it didnt work...')
    } 
}


// function findAddresses(address) return list of addresses
// provider.getBlockNumber()
// provider.getBlockWithTransactions(integer) returns an array of transactions

// test with at least 5 addresses

//find all addresses that have received ether from a specified address

export async function findAddresses(address){
    let blockNumber = await provider.getBlockNumber();
    const addresses=[];
    while (blockNumber > 0) {
        const blockWithTransactions = await provider.getBlockWithTransactions(blockNumber)
        console.log(`txs in a block ${blockNumber}: `, blockWithTransactions.transactions.length)
        const currentBlock = []
        const transactions = blockWithTransactions.transactions
        transactions.forEach((transaction) => {
            // if(transaction.from === address) {
                currentBlock.push(transaction.to)
            // }
        })
        addresses.push(currentBlock)
        blockNumber--
    }
    return addresses
}