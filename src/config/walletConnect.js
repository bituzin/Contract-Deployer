import { createAppKit } from '@reown/appkit/react'
import { sepolia, celo, base, optimism } from '@reown/appkit/networks'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

// Get projectId from https://cloud.walletconnect.com
const projectId = 'adf5dc824747880d3774621d97e778a9'

// Configure networks - dopasowane do sieci w aplikacji
const networks = [sepolia, celo, base, optimism]

// Create Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId
})

// Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata: {
    name: 'Contract Deployer',
    description: 'Deploy smart contracts to multiple networks',
    url: 'https://your-app-url.com',
    icons: ['https://your-app-url.com/icon.png']
  },
  features: {
    analytics: true
  }
})
