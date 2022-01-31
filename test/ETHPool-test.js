const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ETHPool", function () {
  let owner, address1, address2, address3, address4, address5;
  let ETHPool;
    
  beforeEach(async function() {
      [owner, address1, address2, address3, address4, address5] = await ethers.getSigners();

      ETHPool = await ethers.getContractFactory("ETHPool");
      ethpool = await ETHPool.deploy();
      
      await ethpool.deployed();
  });

  it("allow deposits", async function () {
    const oneEther = ethers.BigNumber.from("1000000000000000000");

    let txt = {
      to: ethpool.address,
      value: oneEther
    };
  
    await owner.sendTransaction(txt);    
    expect(await ethpool.total()).to.be.equal(oneEther);
  });

  it("allow deposits from multiple users", async function () {
    const oneEther = ethers.BigNumber.from("1000000000000000000");
    let txt = {
      to: ethpool.address,
      value: oneEther
    };
  
    await owner.sendTransaction(txt);
    await address1.sendTransaction(txt);
    expect(await ethpool.total()).to.be.equal(oneEther.mul(2));
  });

  it("allow multiple deposits from single user", async function () {
    const oneEther = ethers.BigNumber.from("1000000000000000000");

    let txt = {
      to: ethpool.address,
      value: oneEther
    };
  
    await owner.sendTransaction(txt);
    await owner.sendTransaction(txt);
    
    expect(await ethpool.total()).to.be.equal(oneEther.mul(2));
  });
  
  it("withdraw same amount whithout rewards ", async function () {
    const balance = await owner.getBalance();
    const oneEther = ethers.BigNumber.from("1000000000000000000");

    const txt = {
      to: ethpool.address,
      value: oneEther
    };

    await owner.sendTransaction(txt);
    
    await ethpool.connect(owner).withdraw();
    
    const newBalance = await owner.getBalance();

    expect(newBalance).to.be.within(balance.sub(oneEther), balance); 
  });

  it("not distribute rewards if pool is empty", async function () {
    const oneEther = ethers.BigNumber.from("1000000000000000000");

    await expect(ethpool.connect(owner).depositRewards({ value : oneEther })).to.be.reverted;
  });
  

  it("allow deposit rewards from team ", async function () {
    const balance1 = await address1.getBalance();
    const balance2 = await address2.getBalance();

    const oneHundredEth = ethers.BigNumber.from("100000000000000000000");
    const twoHundredEth = ethers.BigNumber.from("200000000000000000000");
    const threeHundredEth = ethers.BigNumber.from("300000000000000000000");

    const fiftyEth = ethers.BigNumber.from("50000000000000000000");
    const oneHundredAndfiftyEth = ethers.BigNumber.from("150000000000000000000");
    
    let txt1 = {
      to: ethpool.address,
      value: oneHundredEth
    };
  
    let txt2 = {
      to: ethpool.address,
      value: threeHundredEth
    };
  
    await address1.sendTransaction(txt1);
    await address2.sendTransaction(txt2);

    await ethpool.connect(owner).depositRewards({ value : twoHundredEth });

    await ethpool.connect(address1).withdraw();
    await ethpool.connect(address2).withdraw();

    const newBalance1 = await address1.getBalance();
    const newBalance2 = await address2.getBalance();
    
    expect(newBalance1).to.be.within(balance1, balance1.add(fiftyEth)); // + 50 ethers
    expect(newBalance2).to.be.within(balance2, balance2.add(oneHundredAndfiftyEth)); // + 150 ethers
  });

  it("rewards for users in pool", async function () {
    const balance1 = await address1.getBalance();
    const balance2 = await address2.getBalance();

    const oneEther = ethers.BigNumber.from("1000000000000000000");
    const oneHundredEth = ethers.BigNumber.from("100000000000000000000");
    const twoHundredEth = ethers.BigNumber.from("200000000000000000000");
    const threeHundredEth = ethers.BigNumber.from("300000000000000000000");

    const fiftyEth = ethers.BigNumber.from("50000000000000000000");
    const oneHundredAndfiftyEth = ethers.BigNumber.from("150000000000000000000");
    
    let txt1 = {
      to: ethpool.address,
      value: oneHundredEth
    };
    let txt2 = {
      to: ethpool.address,
      value: threeHundredEth
    };
    await address1.sendTransaction(txt1);
    await address2.sendTransaction(txt2);
    await ethpool.connect(address1).withdraw();
    await ethpool.connect(owner).depositRewards({ value : twoHundredEth });    
    await ethpool.connect(address2).withdraw();
    const newBalance1 = await address1.getBalance();
    const newBalance2 = await address2.getBalance();
    
    expect(newBalance1).to.be.within(balance1.sub(oneEther), balance1); 
    expect(newBalance2).to.be.within(balance2, balance2.add(twoHundredEth)); // + 200 ethers
  });

  it("rewards to single user in pool", async function () {
    const balance1 = await address1.getBalance();
    const oneHundredEth = ethers.BigNumber.from("100000000000000000000");
    const twoHundredEth = ethers.BigNumber.from("200000000000000000000");
    const threeHundredEth = ethers.BigNumber.from("300000000000000000000");
    let txt1 = {
      to: ethpool.address,
      value: oneHundredEth
    };
    let txt2 = {
      to: ethpool.address,
      value: threeHundredEth
    };
  
    await address1.sendTransaction(txt1);
    await address1.sendTransaction(txt2);
    await ethpool.connect(owner).depositRewards({ value : twoHundredEth });
    await ethpool.connect(address1).withdraw();
    const newBalance1 = await address1.getBalance();
    
    expect(newBalance1).to.be.within(balance1, balance1.add(twoHundredEth)); // Original Balance + 200 ethers
  });

  it("Should add and remove team member", async function () {
    
    const txtAdd = await (await ethpool.addTeam(address1.address)).wait();
    const txtRemove = await (await ethpool.removeTeam(address1.address)).wait();
    
    expect(txtAdd.events?.filter((x) => {return x.event == "RoleGranted"})).to.not.be.null;
    expect(txtRemove.events?.filter((x) => {return x.event == "RoleRevoked"})).to.not.be.null;
  });

});
