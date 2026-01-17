// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract MessageBoard {
    string public message;
    address public sender;

    function post(string calldata _message) external {
        message = _message;
        sender = msg.sender;
    }
}
