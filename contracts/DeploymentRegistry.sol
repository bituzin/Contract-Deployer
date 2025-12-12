// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DeploymentRegistry {
    struct Deployment {
        string contractType;
        address contractAddress;
        uint256 timestamp;
    }

    // Mapping: user address => list of deployments
    mapping(address => Deployment[]) private userDeployments;

    // Event for new deployment registration
    event DeploymentRegistered(address indexed user, string contractType, address contractAddress, uint256 timestamp);

    // Register a new deployment for msg.sender
    function registerDeployment(string calldata contractType, address contractAddress) external {
        Deployment memory newDeployment = Deployment({
            contractType: contractType,
            contractAddress: contractAddress,
            timestamp: block.timestamp
        });
        userDeployments[msg.sender].push(newDeployment);
        emit DeploymentRegistered(msg.sender, contractType, contractAddress, block.timestamp);
    }

    // Get all deployments for a user
    function getDeployments(address user) external view returns (Deployment[] memory) {
        return userDeployments[user];
    }

    // Get number of deployments for a user
    function getDeploymentCount(address user) external view returns (uint256) {
        return userDeployments[user].length;
    }
}
