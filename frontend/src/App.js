import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import MultiSigWallet from './artifacts/contracts/MultiSigWallet.sol/MultiSigWallet.json';

const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS"; // Replace with deployed contract address

function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [owners, setOwners] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    to: '',
    value: '',
    data: ''
  });

  useEffect(() => {
    connectWallet();
  }, []);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        setAccount(accounts[0]);

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          MultiSigWallet.abi,
          signer
        );
        setContract(contract);

        // Load owners
        const ownersList = await contract.getOwners();
        setOwners(ownersList);

        // Load transactions
        const txCount = await contract.getTransactionCount();
        const txList = [];
        for (let i = 0; i < txCount; i++) {
          const tx = await contract.getTransaction(i);
          txList.push(tx);
        }
        setTransactions(txList);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const submitTransaction = async () => {
    try {
      const tx = await contract.submitTransaction(
        newTransaction.to,
        ethers.utils.parseEther(newTransaction.value),
        newTransaction.data
      );
      await tx.wait();
      // Refresh transactions
      const txCount = await contract.getTransactionCount();
      const txList = [];
      for (let i = 0; i < txCount; i++) {
        const tx = await contract.getTransaction(i);
        txList.push(tx);
      }
      setTransactions(txList);
    } catch (error) {
      console.error('Error submitting transaction:', error);
    }
  };

  const confirmTransaction = async (index) => {
    try {
      const tx = await contract.confirmTransaction(index);
      await tx.wait();
      // Refresh transactions
      const txCount = await contract.getTransactionCount();
      const txList = [];
      for (let i = 0; i < txCount; i++) {
        const tx = await contract.getTransaction(i);
        txList.push(tx);
      }
      setTransactions(txList);
    } catch (error) {
      console.error('Error confirming transaction:', error);
    }
  };

  const executeTransaction = async (index) => {
    try {
      const tx = await contract.executeTransaction(index);
      await tx.wait();
      // Refresh transactions
      const txCount = await contract.getTransactionCount();
      const txList = [];
      for (let i = 0; i < txCount; i++) {
        const tx = await contract.getTransaction(i);
        txList.push(tx);
      }
      setTransactions(txList);
    } catch (error) {
      console.error('Error executing transaction:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Multi-Signature Wallet</h1>
        <p>Connected Account: {account}</p>
      </header>

      <main>
        <section>
          <h2>Owners</h2>
          <ul>
            {owners.map((owner, index) => (
              <li key={index}>{owner}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Submit New Transaction</h2>
          <div>
            <input
              type="text"
              placeholder="Recipient Address"
              value={newTransaction.to}
              onChange={(e) => setNewTransaction({...newTransaction, to: e.target.value})}
            />
            <input
              type="number"
              placeholder="Amount (ETH)"
              value={newTransaction.value}
              onChange={(e) => setNewTransaction({...newTransaction, value: e.target.value})}
            />
            <input
              type="text"
              placeholder="Data (hex)"
              value={newTransaction.data}
              onChange={(e) => setNewTransaction({...newTransaction, data: e.target.value})}
            />
            <button onClick={submitTransaction}>Submit Transaction</button>
          </div>
        </section>

        <section>
          <h2>Transactions</h2>
          <ul>
            {transactions.map((tx, index) => (
              <li key={index}>
                <p>To: {tx.to}</p>
                <p>Value: {ethers.utils.formatEther(tx.value)} ETH</p>
                <p>Data: {tx.data}</p>
                <p>Executed: {tx.executed ? 'Yes' : 'No'}</p>
                <p>Confirmations: {tx.numConfirmations.toString()}</p>
                {!tx.executed && (
                  <>
                    <button onClick={() => confirmTransaction(index)}>
                      Confirm
                    </button>
                    <button onClick={() => executeTransaction(index)}>
                      Execute
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App; 