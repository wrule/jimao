import './_app.scss';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { arbitrum, goerli, mainnet, optimism, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

import { ConfigProvider, theme } from 'antd/lib';
import Container from './container';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains,
});

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
