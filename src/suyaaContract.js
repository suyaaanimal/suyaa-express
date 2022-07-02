require("dotenv").config();
const fs = require("fs");
const ethers = require("ethers");

// const Suyaa = JSON.parse(fs.readFileSync("asserts/ERC20Capped.json", "utf8"));
const Suyaa = JSON.parse(
  fs.readFileSync("artifacts/contracts/Suyaa.sol/Suyaa.json", "utf8")
);

// ABI
const SuyaaABI = Suyaa.abi;
const PrivateKey = process.env.PRIVATE_KEY;
const ContractAddress = process.env.CONTRACT_ADDRESS;

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
