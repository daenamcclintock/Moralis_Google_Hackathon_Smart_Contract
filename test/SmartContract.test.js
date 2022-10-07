const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Smart Contract Unit Tests", () => {
        let smartContract, smartContractContract

        beforeEach(async () => {
            accounts = await ethers.getSigners() // could also do with getNamedAccounts
            deployer = accounts[0]
            await deployments.fixture(["all"])
            smartContractContract = await ethers.getContract("WebThreeSocial")
            smartContract = webThreeSocialContract.connect(deployer)
        })

        describe("addPost", () => {
            it("reverts if 1 ether is not added", async () => {
                const error = "Please submit 1 ether"
                await expect(
                    webThreeSocial.addPost(POST_TXT, POST_IMG)
                ).to.be.revertedWith(error)
            })

            it("emits an event and creates a post", async () => {
                expect(await webThreeSocial.addPost(
                    POST_TXT, POST_IMG, { value: ethers.utils.parseEther("1") })).to.emit(
                        "postCreated"
                )
            })
        })

        describe("getPost", () => {
            it("reverts if postId is less than counter", async () => {
                const postId = 4
                const counter = 5
                const error = "Post does not exist"
                await expect(
                    webThreeSocial.getPost(postId)
                ).to.be.revertedWith(error)
            })

            it("returns postTxt, postImg, and postSender", async () => {
                const postId = 0
                const webThreeSocialPost = await webThreeSocial.addPost(POST_TXT, POST_IMG, { value: ethers.utils.parseEther("1") })
                const getWebThreeSocialPost = await webThreeSocial.getPost(postId)
                
                assert(getWebThreeSocialPost[0].toString() == POST_TXT.toString())
                assert(getWebThreeSocialPost[1].toString() == POST_IMG.toString())
                assert(getWebThreeSocialPost[2].toString() == deployer.address.toString())
            })
        })
    })