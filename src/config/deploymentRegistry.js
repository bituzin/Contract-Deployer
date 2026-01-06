// DeploymentRegistry contract addresses per network
// Deploy the contract to each network and update these addresses
export const DEPLOYMENT_REGISTRY_ADDRESSES = {
  'Sepolia': '0xD478CF44c037ea6624fEc96EcB04B19395F1CA8b',
  'Celo': '0x0000000000000000000000000000000000000000', // TODO: Deploy and update
  'Base': '0xaB74690F2c18906613222c2666BB1D2879330b06',
  'Optimism': '0x3149Bdd1fCdF5F7d48b589cDe21ABA235F46C28b',
};

export const DEPLOYMENT_REGISTRY_ABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "contractType",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "contractAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "network",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "txHash",
        "type": "string"
      }
    ],
    "name": "registerDeployment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "contractType",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "contractAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "network",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "txHash",
        "type": "string"
      }
    ],
    "name": "DeploymentRegistered",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getDeployments",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "contractType",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "contractAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "network",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "txHash",
            "type": "string"
          }
        ],
        "internalType": "struct DeploymentRegistry.Deployment[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getDeploymentCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "getDeployment",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "contractType",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "contractAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "network",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "txHash",
            "type": "string"
          }
        ],
        "internalType": "struct DeploymentRegistry.Deployment",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
