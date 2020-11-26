const Web3 = require('web3');
const constants = require('../config/constants');

userController = Object.create(null);

userController.getBalance = async (req,res,next) => {

    var address = constants.contractAddress;
    var abi = constants.abi, result=0;
console.log("abi: ", constants.abi, constants.contractAddress, constants.pvtKey,constants.ownerAddress)
    try{
    const web3 = new Web3(new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/6dab407582414625bc25b19122311c8b`))
    let userAddress = web3.utils.toChecksumAddress(req.body.userAddress);
    const contract = new web3.eth.Contract(abi, address);
    //console.log("contract hai: ", contract)
        
    result = await contract.methods.balanceOf(userAddress).call();
    console.log("hehe",result);
    } catch(err){
        return res.status(200).send({
            success:true,
            message:"Error Occured",
            error:err
        })
    }


    
    return res.status(200).send({
        success:true,
        message:"Balance recieved",
        balance: result
    })
}

userController.transfer = async (req,res,next) => {

    var address = constants.contractAddress;
    var abi = constants.abi;

    try{    
    
    const web3 = new Web3(new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/6dab407582414625bc25b19122311c8b`))
    let recipientAddress = web3.utils.toChecksumAddress(req.body.recipientAddress);
    let tokenAmount = req.body.tokenAmount;
    const contract = new web3.eth.Contract(abi, address);
    console.log("contract hai: ")

    let pvtKey = constants.pvtKey;
    let rawTransaction = {
    "from": constants.ownerAddress,
      "to": constants.contractAddress,
      "value": '0x0',
      'gasPrice': web3.utils.toHex(20 * 1e9),
      'gasLimit': web3.utils.toHex(210000),
      "chainId": "0x03",
      "data": contract.methods.transfer(recipientAddress, tokenAmount).encodeABI(),
      }; //--prodChange
      try
      {let signTransaction = web3.eth.accounts.signTransaction(rawTransaction, pvtKey, function(err, res){
        if(err)
        {console.log("Error occured in signtrxn",err)}
        else
        {
          console.log("Sign trxn res: ", res);
          web3.eth.sendSignedTransaction(res.rawTransaction, function(err,res){
            if(err)
            {console.log("Error occured in sendDisngnedtrxnn", err)}
            else
            {
              console.log("Send signed trxn res: ", res);
            }
          })
      }
    });
    } catch(error){
      console.log("in catch of sending transaction trxn: ",error);
      return res.status(200).send({
        success:true,
        message:"Error occured",
        error
    })
    }
    //const result = await contract.methods.transfer('0x8f69A29B647Ff8657Da8e37013Ec40fFe5860632','1').send({ from: '0xB32d0b0922e7bC945ccD5CB60e7B1ac53546d11E', value: web3.utils.toWei('0.01',"ether") });
    //console.log("hehe",result);
    } catch(err){
        console.log(err,"error hai")
        return res.status(200).send({
            success:true,
            message:"Error occured",
            error:err
        })
    }
    return res.status(200).send({
        success:true,
        message:"Tokens transferring"
    })

}

module.exports = userController;