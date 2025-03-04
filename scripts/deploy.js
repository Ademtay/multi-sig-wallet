const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const MultiSigWallet = await hre.ethers.getContractFactory("MultiSigWallet");

  // Example owners (replace with actual addresses)
  const owners = [
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906"
  ];

  // Number of confirmations required (e.g., 2 out of 3)
  const numConfirmationsRequired = 2;

  // Deploy the contract
  const multiSigWallet = await MultiSigWallet.deploy(owners, numConfirmationsRequired);
  await multiSigWallet.deployed();

  console.log("MultiSigWallet deployed to:", multiSigWallet.address);
  console.log("Owners:", owners);
  console.log("Required confirmations:", numConfirmationsRequired);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 