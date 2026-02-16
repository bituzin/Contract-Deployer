// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleVoting {
    uint256 public votesA;
    uint256 public votesB;

    event Voted(address indexed voter, string option);

    function voteA() public {
        votesA += 1;
        emit Voted(msg.sender, "A");
    }

    function voteB() public {
        votesB += 1;
        emit Voted(msg.sender, "B");
    }

    function getVotes() public view returns (uint256, uint256) {
        return (votesA, votesB);
    }
}
