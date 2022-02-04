const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Solidity08", function () {
  let owner, addr1, addr2, addr3, addr4, addr5;
  let Solidity08;

  beforeEach(async function () {
    [owner, addr1, addr2, addr3, addr4, addr5] = await ethers.getSigners();

    Solidity08 = await ethers.getContractFactory("Solidity08");
    sol = await Solidity08.deploy();

    await sol.deployed();
  });

  it("Should test() runable", async function () {
    const zeroEther = ethers.BigNumber.from("0");

    const result = await sol.test(1);
    expect(result).to.be.equal(zeroEther);
  });
});
