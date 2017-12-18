const bitcoinSecp256r1 = require("bitcoinjs-lib-secp256r1");
const bip39 = require("bip39");
const wif = require("wif");
const base58 = require("base-x")("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
const neonjs = require("neon-js");

function findWif () {
  try {
    const bip44path = document.getElementById("bip44path").value;
    const mnemonic = document.getElementById("mnemonic").value;
    const passphrase = document.getElementById("passphrase").value;
    const actualSeed = bip39.mnemonicToSeed(mnemonic,passphrase);
    const rootNode = bitcoinSecp256r1.HDNode.fromSeedBuffer(actualSeed, bitcoinSecp256r1.bitcoin);
    const pathNode = rootNode.derivePath(bip44path);
    const pathNodeChild0 = pathNode.derive(0);
    const wif = pathNodeChild0.keyPair.toWIF();
    document.getElementById("wif").value = wif;
    const address = neonjs.getAccountFromWIFKey(wif);
    document.getElementById("address").value = address.address;
  } catch (e) {
    console.log(e);
  }
  return false;
}

module.exports = {
  findWif : findWif
};