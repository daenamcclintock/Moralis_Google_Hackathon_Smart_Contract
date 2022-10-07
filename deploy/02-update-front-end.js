const {
    frontEndContractsFile,
    // frontEndContractsFile2,
    frontEndAbiLocation,
    // frontEndAbiLocation2,
} = require("../helper-hardhat-config")
require("dotenv").config()
const fs = require("fs")
const { network } = require("hardhat")

module.exports = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Writing to front end...")
        // await updateContractAddresses()
        await updateAbi()
        console.log("Front end written!")
    }
}

async function updateAbi() {
    const smartContract = await ethers.getContract("SmartContract")
    fs.writeFileSync(
        `${frontEndAbiLocation}SmartContract.json`,
        smartContract.interface.format(ethers.utils.FormatTypes.json)
    )
    // fs.writeFileSync(
    //     `${frontEndAbiLocation2}NftMarketplace.json`,
    //     nftMarketplace.interface.format(ethers.utils.FormatTypes.json)
    // )
}

async function updateContractAddresses() {
    const chainId = network.config.chainId.toString()
    const smartContract = await ethers.getContract("SmartContract")
    const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf8"))
    if (chainId in contractAddresses) {
        if (!contractAddresses[chainId]["SmartContract"].includes(smartContract.address)) {
            contractAddresses[chainId]["SmartContract"].push(smartContract.address)
        }
    } else {
        contractAddresses[chainId] = { SmartContract: [smartContract.address] }
    }
    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
    // fs.writeFileSync(frontEndContractsFile2, JSON.stringify(contractAddresses))
}
module.exports.tags = ["all", "frontend"]