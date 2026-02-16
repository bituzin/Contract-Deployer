// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ClickCounter {
    uint256 public count;

    event Clicked(address indexed sender, uint256 newCount);

    function click() public {
        count += 1;
        emit Clicked(msg.sender, count);
    }

    function getCount() public view returns (uint256) {
        return count;
    }
}
