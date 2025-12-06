import { createAppKit } from '@reown/appkit/react'
import { mainnet, polygon, arbitrum, base, optimism } from '@reown/appkit/networks'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

// Get projectId from https://cloud.walletconnect.com
const projectId = 'YOUR_PROJECT_ID_HERE'

// Configure networks
const networks = [mainnet, polygon, arbitrum, base, optimism]

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
