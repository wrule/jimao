import './_app.scss';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, lightTheme, connectorsForWallets } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { arbitrum, goerli, mainnet, optimism, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

import { ConfigProvider, theme } from 'antd/lib';
import Container from './container';
import scrollTestnet from './chains/scroll/scrollTestnet';

import {
  metaMaskWallet,
  coinbaseWallet,
  rainbowWallet,
  walletConnectWallet,
  injectedWallet,
  okxWallet,
  trustWallet,
  imTokenWallet,
} from '@rainbow-me/rainbowkit/wallets';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [scrollTestnet],
  [publicProvider()]
);

const appName = 'jimao';
const projectId = '1993266';

const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [
      metaMaskWallet({ projectId, chains }),
      coinbaseWallet({ appName, chains }),
      rainbowWallet({ projectId, chains }),
      walletConnectWallet({ projectId, chains }),
      injectedWallet({ chains }),
    ],
  },
  {
    groupName: 'Recommended',
    wallets: [
      okxWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      imTokenWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={lightTheme({
          accentColor: '#0037ff',
          borderRadius: 'small',
        })}>
        <ConfigProvider
          componentSize="small"
          theme={{
            algorithm: theme.defaultAlgorithm,
            token: {
              colorPrimary: '#0037ff',
              borderRadius: 1,
            },
          }}>
          <Container>
            <Component {...pageProps} />
          </Container>
        </ConfigProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
