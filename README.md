# Multi-Signature Wallet

A secure multi-signature wallet implementation on Ethereum blockchain that requires multiple owners to approve transactions before execution.

## Features

- Create a multi-signature wallet with multiple owners
- Set required number of approvals for transactions
- Submit transactions for approval
- Approve/reject transactions
- Execute approved transactions
- View transaction history
- Add/remove owners (with required approvals)

## Project Structure

```
├── contracts/           # Smart contracts
├── frontend/           # React frontend application
├── scripts/            # Deployment and testing scripts
└── test/              # Test files
```

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Compile contracts:
```bash
npx hardhat compile
```

3. Deploy contracts:
```bash
npx hardhat run scripts/deploy.js --network <network>
```

4. Start frontend:
```bash
cd frontend
npm start
```

## Technologies Used

- Solidity
- Hardhat
- React
- Web3.js
- Ethers.js 