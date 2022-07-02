async function main() {

    const contractFactory = await hre.ethers.getContractFactory("Suyaa");
    const contract = await contractFactory.deploy();
    await contract.deployed();
    console.log("Contract deployed to:", contract.address);

    // トークンのnameを確認
    let name = await contract.name();
    console.log("name: %s", name);

    // トークンのsymbolを確認
    let symbol = await contract.symbol();
    console.log("symbol: %s", symbol);

    // トークンのcap（発行上限）を確認
    let cap = await contract.cap()
    console.log("cap: %s", cap);

  }
  
main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});