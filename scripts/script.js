const { ethers, network } = require("hardhat")
const { moveBlocks } = require("../utils/move-blocks")

const script = async () => {
    const smartContract = await ethers.getContract("SmartContract")
    const transaction = await smartContract.function()
    await transaction.wait(1)
      .then(() => {
        console.log(`Smart contract function called...`)
      })
    if (network.config.chainId == "31337") {
        await moveBlocks(2, (sleepAmount = 1000))
    }
}


script()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
