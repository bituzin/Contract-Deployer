// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MessageBoard {
    string public lastMessage;
    address public lastSender;

    event MessagePosted(address indexed sender, string message);

    function postMessage(string memory message) public {
        lastMessage = message;
        lastSender = msg.sender;
        emit MessagePosted(msg.sender, message);
    }

    function getLastMessage() public view returns (string memory, address) {
        return (lastMessage, lastSender);
    }
}
