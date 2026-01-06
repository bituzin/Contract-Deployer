// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DeploymentRegistry {
    struct Deployment {
        string contractType;
        address contractAddress;
        uint256 timestamp;
        string network;
        string txHash;
    }

    // Mapping: user address => list of deployments
    mapping(address => Deployment[]) private userDeployments;

    // Event for new deployment registration
    event DeploymentRegistered(
        address indexed user, 
        string contractType, 
        address contractAddress, 
        uint256 timestamp,
        string network,
        string txHash
    );

    // Register a new deployment for msg.sender
    function registerDeployment(
        string calldata contractType, 
        address contractAddress,
        string calldata network,
        string calldata txHash
    ) external {
        Deployment memory newDeployment = Deployment({
            contractType: contractType,
            contractAddress: contractAddress,
            timestamp: block.timestamp,
            network: network,
            txHash: txHash
        });
        userDeployments[msg.sender].push(newDeployment);
        emit DeploymentRegistered(msg.sender, contractType, contractAddress, block.timestamp, network, txHash);
    }

    // Get all deployments for a user
    function getDeployments(address user) external view returns (Deployment[] memory) {
        return userDeployments[user];
    }

    // Get number of deployments for a user
    function getDeploymentCount(address user) external view returns (uint256) {
        return userDeployments[user].length;
    }
    
    // Get deployment by index
    function getDeployment(address user, uint256 index) external view returns (Deployment memory) {
        require(index < userDeployments[user].length, "Index out of bounds");
        return userDeployments[user][index];
    }
}
