//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Suyaa is ERC20Capped, Ownable {
    uint256 constant INITIAL_SUPPLY = 1000000000 * (10**18);

    constructor() ERC20("Suyaa", "SYA") ERC20Capped(INITIAL_SUPPLY) {
        console.log("Contract deployed by:", msg.sender);
    }

    function mint(address account, uint256 amount) public onlyOwner {
        _mint(account, amount);
    }

    function burn(uint256 amount) public {
        _burn(_msgSender(), amount);
    }
}
