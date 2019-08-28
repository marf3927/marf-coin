const CryptoJS = require("crypto-js");


class Block{
    constructor(index, hash, priviousHash, timestamp, data){
        this.index = index;
        this.hash = hash;
        this.priviousHash = priviousHash;
        this.timestamp = timestamp;
        this.data = data
    }
}

const genesisBlock = new Block(
    0,
    '8D34083288D917200362EB3F78EFDD88CF52CACB072B4246BFF9BBBF279C24F9',
    null,
    1566176388296,
    'This is the genesis'
);

let blockchain = [genesisBlock];

const getLastBlock = () => blockchain[blockchain.length -1];

const getTimestamp = () => new Data().getTime()

const getBlockChain = () => blockchain;

const createHash = (index, previousHash, timestamp, data) => 
    CryptoJS.SHA256(index + previousHash + timestamp + JSON.stringify(data)).toString();


const createNewBlock = data => {
    const previousBlock = getLastBlock();
    const newBlockIndex = previousBlock.index + 1;
    const newTimestamp = getTimestamp();
    const newHash = createHash(newBlockIndex, 
        previousBlock.hash, 
        newTimestamp, 
        data
    );
    const  newBlock = new Block(
        newBlockIndex,
        newHash,
        previousBlock.hash,
        newTimestamp,
        data
    );
    addBlockToChain(newBlock);
    return newBlock;
};

const getBlockHash = (block) => createHash(block.index, block.previousBlock, block.timestamp, block.data)

const isNewBlockValid = (candidateBlock, lastestBlock) => {
    if(!isNewStructureValid(candidateBlock)){
        console.log("The candidate block struture is not valid");
        return false;
    }
    else if(lastestBlock.index + 1 !== candidateBlock.index){
        console.log("The candidate block dosen't have a valid index");
        return false;
    }else if(lastestBlock.hash !== candidateBlock.previousHash) {
        console.log("The previousHash of the candidate block is not the hash of the lastes block");
        return false;        
    }else if (getBlockHash(candidateBlock) !== candidateBlock.hash) {
        console.log("The hash of this block is invalid");
        return false;
    } 
    return true;
}

const isNewStructureValid = (block) => {
    typeof block.index === 'number' && 
    typeof block.hash === 'string' && 
    typeof block.previousBlock === 'string' && 
    typeof block.timestamp === 'number'
    typeof isNewBlockValid === 'string'
}


const isChainValid = (candidateChain) => {
    const isGenesisValid = block =>{ 
        return JSON.stringify(block) === JSON.stringify(genesisBlock);
    };
    if (!isGenesisValid(candidateChain[0])){
        console.log("the candidateChain's genesisBlock is not the same as our genesisBlock");
        return false;
    }
    for (let i = 1; i < candidateChain.length; i++){
        if(!isNewBlockValid(candidateChain[i], candidateChain[i-1])){
            return false;
        }
    }
    return true;
};

const replaceChain = candidateChain => {
    if(isChainValid(newChain) && 
    newChain.length > getBlockChain().length){
        blockchain = newChain;
        return true;
    } else {
        return false;
    }
}

const addBlockToChain = newBlock => {
    if(isNewBlockValid(candidateBlock, getLastBlock())){
        getBlockChain().push(candidateBlock);
        return true
    } else {
        return false;
    }
}


module.exports = {
    getBlockChain,
    createNewBlock
}