require("dotenv").config();
const fs = require("fs");
const ethers = require("ethers");

// ABIデータがあるjsonファイルは、assets以下に保存してください。
const Suyaa = JSON.parse(fs.readFileSync("assets/Suyaa.json", "utf8"));

// ABI
const SuyaaABI = Suyaa.abi;
const PrivateKey = process.env.PRIVATE_KEY;
/* Suyaa Contract の アドレス */
const ContractAddress = "0x8CE939b6d0d30a4eb5fB5310Cf23ea3214419D80";

const provider = new ethers.providers.InfuraProvider("maticmum");
// const provider = ethers.getDefaultProvider("maticmum");
const signer = new ethers.Wallet(PrivateKey, provider);
const contract = new ethers.Contract(ContractAddress, SuyaaABI, signer);

// // subscribe
// const onTransfer = async () => {
//   //   const provider = new ethers.providers.Web3Provider(library.provider);
//   //   const filters = contract.filters["Tweeted"];
// };

/**
 *　mint
 * @param {*} account   mint先のアカウント
 * @param {*} amount    mintする量
 */
const mint = async (account, amount) => {
  const tx = await contract.mint(account, amount);
  await tx.wait();
};

// /**
//  *
//  */
// const burn = async (amount) => {
//   const tx = await contract.burn(amount);
//   await tx.wait();
// };

// exports.burn = burn;
exports.mint = mint;
