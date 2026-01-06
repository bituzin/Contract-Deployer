# Contract-Deployer


## 🌐 Online Demo

[➡️ Contract Deployer App](https://contract-deployer-fawn.vercel.app)

Deploy and manage smart contracts directly in your browser.

Deploy smart contracts to multiple EVM networks with one click.

## 🚀 Features

- Supports Sepolia, Celo, Base, Optimism
- One-click deployment from browser
- View contract source code and bytecode
- Track deployed contract addresses and transaction hashes
- **🆕 On-chain deployment registry** - Your deployments visible everywhere (localhost, Vercel, mobile)
- Modern, responsive UI with theme support
- Easy wallet connection (MetaMask & compatible)

## 🔄 New: Cross-Device Deployment Tracking

Your deployments are now stored **on-chain** via DeploymentRegistry contract:
- ✅ Access your deployments from any device/domain
- ✅ Persistent storage on blockchain
- ✅ Automatic sync across all your sessions
- ✅ localStorage backup for reliability

**Setup Guide:** See [QUICKSTART.md](QUICKSTART.md) for 3-minute setup

## 🛠 How It Works

1. Connect your wallet (MetaMask or other EVM wallet)
2. Choose your target network
3. Check contract details (source code, bytecode)
4. Select a contract to deploy
5. Confirm transaction in your wallet
6. Interact with your deployed contract directly from the app

## 📂 Structure

- `src/` – React frontend
- `src/components/contracts/` – Contract details and deployment logic
- `src/config/themes.js` – Theme and color configuration
- `contracts/` – Smart contracts including DeploymentRegistry
- `src/hooks/` – React hooks for deployment tracking

## 📚 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - 3-step setup guide
- **[DEPLOYMENT_SYNC_FIX.md](DEPLOYMENT_SYNC_FIX.md)** - Why and how the sync works
- **[DEPLOYMENT_REGISTRY_GUIDE.md](DEPLOYMENT_REGISTRY_GUIDE.md)** - Full technical documentation

## 💡 Why Contract-Deployer?

- No coding required to deploy contracts
- Transparent contract details
- Multi-network support
- Cross-device deployment tracking
- Fast and intuitive for developers and non-devs

## 📝 License

MIT
