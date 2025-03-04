const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MultiSigWallet", function () {
  let MultiSigWallet;
  let multiSigWallet;
  let owner1;
  let owner2;
  let owner3;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    [owner1, owner2, owner3, addr1, addr2, ...addrs] = await ethers.getSigners();
    MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");
    multiSigWallet = await MultiSigWallet.deploy(
      [owner1.address, owner2.address, owner3.address],
      2
    );
    await multiSigWallet.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owners", async function () {
      const owners = await multiSigWallet.getOwners();
      expect(owners).to.deep.equal([
        owner1.address,
        owner2.address,
        owner3.address,
      ]);
    });

    it("Should set the right number of required confirmations", async function () {
      const numConfirmationsRequired = await multiSigWallet.numConfirmationsRequired();
      expect(numConfirmationsRequired).to.equal(2);
    });
  });

  describe("Transactions", function () {
    it("Should submit transaction", async function () {
      await multiSigWallet
        .connect(owner1)
        .submitTransaction(addr1.address, 100, "0x");
      const transaction = await multiSigWallet.getTransaction(0);
      expect(transaction.to).to.equal(addr1.address);
      expect(transaction.value).to.equal(100);
      expect(transaction.data).to.equal("0x");
      expect(transaction.executed).to.equal(false);
      expect(transaction.numConfirmations).to.equal(0);
    });

    it("Should confirm transaction", async function () {
      await multiSigWallet
        .connect(owner1)
        .submitTransaction(addr1.address, 100, "0x");
      await multiSigWallet.connect(owner1).confirmTransaction(0);
      const transaction = await multiSigWallet.getTransaction(0);
      expect(transaction.numConfirmations).to.equal(1);
    });

    it("Should execute transaction when enough confirmations", async function () {
      await multiSigWallet
        .connect(owner1)
        .submitTransaction(addr1.address, 100, "0x");
      await multiSigWallet.connect(owner1).confirmTransaction(0);
      await multiSigWallet.connect(owner2).confirmTransaction(0);
      await multiSigWallet.connect(owner1).executeTransaction(0);
      const transaction = await multiSigWallet.getTransaction(0);
      expect(transaction.executed).to.equal(true);
    });
  });
}); 