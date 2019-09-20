const CryptoJS = require("crypto-js")

class Block {
    constructor(index, hash, previousHash, timestamp, data) {
        this.index = index
        this.hash = hash
        this.previousHash = previousHash
        this.timestamp = timestamp
        this.data = data
    }
}

const genesisBlock = new Block (
    0,
    "26CB48ECE1F365A520EF22D15E38EE7D989A0997B549B310BDF1052C4B7BD22B",
    null,
    1568945302149,
    "This is the Genesis!"
)

let blockchain = [genesisBlock]

const getLastBlock = () =>blockchain[blockchain.length -1]

const getTimestamp = () => new Date().getTime() / 1000

const getBlockchain = () => blockchain

const createHash = (index, previousHash, timestamp, data)=> CryptoJS.SHA256(index+previousHash+timestamp+JSON.stringify(data)).toString()

const createNewBlock = data => {
    const previousBlock = getLastBlock();
    const newBlockIndex = previousBlock.index + 1;
    const newTimestamp =  getTimestamp
    const newHash = createHash(newBlockIndex, previousBlock.hash, newTimestamp, data)
    const newBlock = new Block(newBlockIndex, newHash, previousBlock.hash, newTimestamp, data)
    addBlockToChain(newBlock)
    return newBlock
}

const getBlockHash = (block) => createHash(block.index, block.previousHash, block.timestamp, block.data)

const isNewBlockValid = (candidateBlock, latestBlock) => {
    if (isNewStructureVaild(candidateBlock)){
        console.log("The candidate block struture is not valid")
        return false
    }else if (latestBlock.index+1 !== candidateBlock.index){
        console.log('The candidate block doesnt have a valid index')
        return false
    }else if (latestBlock.hash !== candidateBlock.previousHash){
        console.log('The previous hash of the candidate block is not the hash of the latest block')
        return false
    }else if (getBlockHash(candidateBlock) !== candidateBlock.hash){
        console.log("The haash of this block is invaild")
        return false
    }
    return true
}

const isNewStructureVaild = (block) => {
    return (
        typeof block.index === "number" && 
        typeof block.hash === "string" && 
        typeof block.previousHash === "string" && 
        typeof block.timestamp === "number" &&
        typeof block.data === "string"
    )
}

const isChainValid = (candidateChain) => {
    const isGenesisValid = block => {
        return JSON.stringify(block) === JSON.stringify(getLastBlock)
    }
    if(!isGenesisValid(candidateChain[0])){
        console.log("The candidate chain's genesis block is not the same as our genesis block")
        return false
    }
    for(let i =1; i < candidateChain.length; i++){
        if(!isNewBlockValid(candidateChain[i], candidateChain[i-1])){
            return false
        }
        return true
    }
}

const replaceChain = candidateChain => {
    if(isChainValid(candidateChain) && newChain.length > getBlockchain().length){
        blockchain = newChain
        return true
    }else {
        return false
    }
}

const addBlockToChain = candidateBlock => {

    if(isNewBlockValid(candidateBlock, getLastBlock())){
        getBlockchain().push(candidateBlock)
        return true
    }else{
        return false
    }
}

module.exports = {
    getBlockchain,
    createNewBlock
}


