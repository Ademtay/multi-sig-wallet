Smart Contract (contracts/MultiSigWallet.sol):
Implements a multi-signature wallet with multiple owners
Allows submitting, confirming, and executing transactions
Requires a specified number of confirmations for execution
Includes security features like reentrancy protection
Deployment Script (scripts/deploy.js):
Deploys the contract with specified owners and required confirmations
Can be customized for different networks
Tests (test/MultiSigWallet.test.js):
Tests contract deployment
Tests transaction submission, confirmation, and execution
Verifies owner management
Frontend (frontend/):
React application for interacting with the contract
Features:
Wallet connection
View owners
Submit new transactions
Confirm transactions
Execute transactions
View transaction history
Modern UI with responsive design
To get started with the project:
Install dependencies:
Compile and deploy the contract:
Update the CONTRACT_ADDRESS in frontend/src/App.js with your deployed contract address.
Start the frontend:
The multi-signature wallet is now ready to use! Users can:
Connect their Web3 wallet
View all owners of the multi-sig wallet
Submit new transactions
Confirm transactions (if they are an owner)
Execute transactions once enough confirmations are received
View the transaction history
