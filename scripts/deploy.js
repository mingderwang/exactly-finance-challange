const hre = require("hardhat");

async function main() {
  await hre.run('compile');

  const ETHPool  = await hre.ethers.getContractFactory("ETHPool");
  const ethpool = await ETHPool.deploy();

  await ethpool.deployed();

  console.log("ETHPool deployed to:", ethpool.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
