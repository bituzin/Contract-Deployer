// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract ClickCounter {
    uint256 public count;
    event Clicked(address indexed clicker, uint256 newCount);

 function click() public {
    count += 1;
    emit Clicked(msg.sender, count);
}
}
