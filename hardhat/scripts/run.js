async function main() {

    const [deployer, user1, user2] = await hre.ethers.getSigners();
    const contractFactory = await hre.ethers.getContractFactory("Suyaa");
    const contract = await contractFactory.deploy();
    await contract.deployed();
    console.log("Contract deployed to:", contract.address);

    // totalSupply
    const totalSupply = async () => {
        let totalSupply = await contract.totalSupply();
        console.log("totalSupply: %s", totalSupply);
    }

    // balanceOf
    const balanceOf = async (account) => {
        let balanceOf = await contract.balanceOf(account.address);
        console.log("balance of %s: %s", account.address, balanceOf)
    };

    // totalSupplyとbalanceOfをチェック
    const check = async () => {
        // ユーザーのリスト
        const list = [user1, user2];
        for (let i=0; i<list.length; i++) {
            let account = list[i];
            let balanceOf = await contract.balanceOf(account.address);
            console.log("balance of user%s (%s): %s", i+1, account.address, balanceOf);
        }
        await totalSupply();
    }

    // mint
    const mint = async (account, amount, by) => {
        try {
            let mint = await contract.connect(by).mint(account.address, amount);
            await mint.wait();
            console.log("%s minted to %s by %s: true", amount, account.address, by.address);
        } catch {
            console.log("%s minted to %s by %s: false", amount, account.address, by.address);
        }
    };

    // transfer
    const transfer = async (to, amount, by) => {
        try {
            let transfer = await contract.connect(by).transfer(to.address, amount);
            await transfer.wait();
            console.log("%s transferred to %s by %s: true", amount, to.address, by.address);
        } catch {
            console.log("%s transferred to %s by %s: false", amount, to.address, by.address);
        }
    }

    // burn
    const burn = async (account, amount, by) => {
        try {
            let burn = await contract.connect(by).burn(amount);
            await burn.wait();
            console.log("%s owned by %s burned by %s: true", amount, account.address, by.address);
        } catch {
            console.log("%s owned by %s burned by %s: false", amount, account.address, by.address);
        }
    }

    // トークンのnameを確認
    let name = await contract.name();
    console.log("name: %s", name);

    // トークンのsymbolを確認
    let symbol = await contract.symbol();
    console.log("symbol: %s", symbol);

    // トークンのcap（発行上限）を確認
    let cap = await contract.cap()
    console.log("cap: %s", cap);

    // mintテスト
    console.log("mint test");
    await check();
    // deployerがuser1に100をmint
    await mint(user1, 100, deployer);
    await check();
    // user1がuser1に1000をmint
    await mint(user1, 1000, user1);
    await check();

    // transferテスト
    console.log("transfer test");
    await check();
    // user1がuser2に30をtransfer
    await transfer(user2, 30, user1);
    await check();
    // user1がuser2に90をtransfer
    await transfer(user1, 90, user2);
    await check();

    // burnテスト
    console.log("burn test");
    await check();
    // user1がuser1の10をburn
    await burn(user1, 10, user1);
    await check();
    // user1がuser1の100をburn
    await burn(user1, 100, user1);
    await check();
    // user2がuser1の10をburn
    await burn(user1, 10, user2);
    await check();

  }
  
main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});