# verify contract on Ropsten testnet
```
➜  exactly-finance-challange git:(master) ✗ yarn verify
yarn run v1.22.17
$ npx hardhat verify 0x599E6C043921387E3617f1555c39991E0d431167
Nothing to compile
No need to generate any newer typings.
Compiling 1 file with 0.8.2
Successfully submitted source code for contract
contracts/ETHPool.sol:ETHPool at 0x599E6C043921387E3617f1555c39991E0d431167
for verification on Etherscan. Waiting for verification result...

Successfully verified contract ETHPool on Etherscan.
https://ropsten.etherscan.io/address/0x599E6C043921387E3617f1555c39991E0d431167#code
✨  Done in 38.41s.
```

# smart contract structure
we need to build three of methods : 
1- Receive Deposit in pool
2- Withdraw fund from pool method 
3- Deposit Rewards to distribute rewards in pool ( managing team )
use oppen zeppein access control it support team Roles 
we need to add events we need in this smart contract to add two event to call (deposit & withdraw ) methods

# Advanced Sample Hardhat Project

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help


# Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
hardhat run --network ropsten scripts/sample-script.ts
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```

# Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).
