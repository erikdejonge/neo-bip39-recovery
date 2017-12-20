const bitcoinSecp256r1 = require("bitcoinjs-lib-secp256r1");
const bip39 = require("bip39");
const wif = require("wif");
const base58 = require("base-x")("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
const neonjs = require("neon-js");

function findWif () {
  try {
    const purpose = document.getElementById("purpose").value;
    const coin = document.getElementById("coin").value;
    const account = document.getElementById("account").value;
    const change = document.getElementById("change").value;
    const startIdx = document.getElementById("startIdx").value;
    const endIdx = document.getElementById("endIdx").value;
    const mnemonic = document.getElementById("mnemonic").value;
    const passphrase = document.getElementById("passphrase").value;
    const bip44path = `m/${purpose}'/${coin}'/${account}'/${change}`;
    const actualSeed = bip39.mnemonicToSeed(mnemonic,passphrase);
    const rootNode = bitcoinSecp256r1.HDNode.fromSeedBuffer(actualSeed, bitcoinSecp256r1.bitcoin);
    const pathNode = rootNode.derivePath(bip44path);

    const derivedList = document.getElementById("derivedList");
    derivedList.innerHTML = '';
    for (i = +startIdx; i <= +endIdx; i++) {
      const pathNodeChild0 = pathNode.derive(i);
      const wif = pathNodeChild0.keyPair.toWIF();
      const address = neonjs.getAccountFromWIFKey(wif);
      const template = document.createElement('template');
      template.innerHTML = `<tr><td>${bip44path}/${i}</td><td>${address.address}</td><td>${wif}</td>`;
      
      derivedList.appendChild(template.content.childNodes[0]);
    }
  } catch (e) {
    console.log(e);
  }
  return false;
}

module.exports = {
  findWif : findWif
};

