var ethers = require('ethers');  
var crypto = require('crypto'); 
//Support[ETH,BTC]
//console.log('init');
const geneateWallet = (type='eth') => {
    var privateKey="";
    var publicKey=""; 
    switch (type){
        case 'eth': 
            var id = crypto.randomBytes(32).toString('hex');
            privateKey = "0x"+id; 
            var wallet = new ethers.Wallet(privateKey);  
            publicKey=wallet.address;  
        case 'btc':
            break;
        break; 
    } 
    console.log("PublicKey:"+publicKey);
    console.log("PrivateKey:"+privateKey);
    return [publicKey,privateKey];
}
//var[a,b]=geneateWallet();
//console.log(a);
//console.log(b);
module.exports={geneateWallet};