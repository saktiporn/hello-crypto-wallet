//Support[ETH]
function geneateWallet(type='eth'){
    var privateKey="";
    var publicKey=""; 
    switch (type){
        case 'eth':
            var ethers = require('ethers');  
            var crypto = require('crypto'); 
            var id = crypto.randomBytes(32).toString('hex');
            privateKey = "0x"+id; 
            var wallet = new ethers.Wallet(privateKey);  
            publicKey=wallet.address;  
        break;
    } 
    console.log("PublicKey:"+publicKey);
    console.log("PrivateKey:"+privateKey);
    return [publicKey,privateKey];
}
module.exports=geneateWallet;