 const bip39 = require('bip39');
 const EthereumWallet = require('ethereumjs-wallet');
 const bitcoin = require('bitcoinjs-lib');

class  HelloCryptoWallet
{
    async #resolveAfter() {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve('resolved');
          }, 10);
        });
    } 
    /*
    Function to generate BIP39 mnemonic with specified word count
    Support[12,15,18,21,24]
    */
    async getMnemonic(wordCount=12){
        await this.#resolveAfter(); 
        var bitCount=256;
        switch(wordCount){
            case 12:bitCount=128;break;
            case 15:bitCount=160;break;
            case 18:bitCount=192;break;
            case 21:bitCount=224;break;
            default:bitCount=256;break;
        }
        return bip39.generateMnemonic(bitCount, null, bip39.wordlists.english);
    }
    /*
    typeWallet=>
    [
        0=>bitcoin,
        1=>eth,
        2=>cardano,
        3=>xrp,
        4=>xlm
    ]
    */
    async getWallet(mnemonic,type='eth',index=0){
        await this.#resolveAfter();
        var privateKey="";
        var publicKey="";  
        switch (type){
            case 'eth': 
                var result=this.#generateEthereumWallet(mnemonic,index);
                if(result!=undefined){
                    publicKey=result.address;
                    privateKey=result.privateKey;
                }
            case 'btc':
                break;
            case 'doge':
                var result=this.#generateDogecoinWallet(mnemonic,index);
                if(result!=undefined){
                    publicKey=result.address;
                    privateKey=result.privateKey;
                }
                break;
            case 'sol':
                break;
            break; 
        }  
        return {
            publicKey:publicKey,
            privateKey:privateKey,
            walletIndex:index,
            walletType:type,
            mnemonic:mnemonic
        }
    }
     
    #generateEthereumWallet(mnemonic, index) {
        const seed = bip39.mnemonicToSeedSync(mnemonic);
        console.log(EthereumWallet.hdkey);
        const hdWallet = EthereumWallet.hdkey.fromMasterSeed(seed);
        const wallet = hdWallet.derivePath(`m/44'/60'/0'/0/${index}`).getWallet();
        return {
            address: wallet.getAddressString(),
            privateKey: wallet.getPrivateKeyString()
        };
    } 
    #genrateBitcoinWallet(nmemonic,index){
        
    }
    // Function to generate Dogecoin wallet
    #generateDogecoinWallet(mnemonic, index) {
        const network = bitcoin.networks.dogecoin;
        //console.log(network);
        const seed = bip39.mnemonicToSeedSync(mnemonic);
        const root = bitcoin(seed, network);
        const dogecoinWallet = root.derivePath(`m/44'/3'/0'/0/${index}`);
        console.log(dogecoinWallet);
        const keyPair = bitcoin.ECPair.fromPrivateKey(dogecoinWallet.privateKey, { network });
        const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network });
        return {
            address: address,
            privateKey: keyPair.toWIF()
        };
    }
}

 
(async() => {
    var objHelloCryptoWallet=new HelloCryptoWallet();
    console.log('before start');
  
    var m= await objHelloCryptoWallet.getMnemonic();
    console.log(m);
    console.log(m.split(' ').length);

    var m= await objHelloCryptoWallet.getMnemonic(18);
    console.log(m);
    console.log(m.split(' ').length);

    var m= await objHelloCryptoWallet.getMnemonic(21);
    console.log(m);
    console.log(m.split(' ').length);

    var m= await objHelloCryptoWallet.getMnemonic(24);
    console.log(m);
    console.log(m.split(' ').length);

    var m= await objHelloCryptoWallet.getMnemonic(60);
    console.log(m);
    console.log(m.split(' ').length);
    
    console.log("Generate Wallet ETH");
    var x=await objHelloCryptoWallet.getWallet(m);
    console.log(x);
    var x=await objHelloCryptoWallet.getWallet(m,'eth',1);
    console.log(x);

    console.log("Generate Wallet Doge");
    var x=await objHelloCryptoWallet.getWallet(m,'doge',0);
    console.log(x);
    var x=await objHelloCryptoWallet.getWallet(m,'doge',1);
    console.log(x);
    console.log('after start');
  })();
//console.log(a);
//console.log(b);
module.exports={HelloCryptoWallet};