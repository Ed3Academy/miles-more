import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { goerli, mainnet, polygon, polygonMumbai } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { getDefaultWallets, RainbowKitProvider, connectorsForWallets } from '@rainbow-me/rainbowkit'
import { metaMaskWallet } from '@rainbow-me/rainbowkit/wallets'

const { chains, provider, webSocketProvider } = configureChains([mainnet, polygon, polygonMumbai, goerli], [publicProvider()])

// const { connectors } = getDefaultWallets({
//   appName: 'RainbowKit App',
//   chains
// })
const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [metaMaskWallet({ chains })]
  }
])

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider
})

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default MyApp
