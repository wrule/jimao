import { Button } from 'antd/lib';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSwitchNetwork } from 'wagmi';
import scrollTestnet from '../../chains/scroll/scrollTestnet';

export default
function ScrollButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openConnectModal,
        mounted,
      }) => {
        const switchNetwork = useSwitchNetwork({ chainId: scrollTestnet.id });
        const ready = mounted;
        const connected = ready && account && chain;
        return <div
          aria-hidden={!ready}
          style={!ready ? {
            opacity: 0,
            pointerEvents: 'none',
            userSelect: 'none',
          } : { }}>
          {(() => {
            if (!connected) {
              return <Button
                size="middle"
                type="primary"
                onClick={openConnectModal}>
                Connect Wallet
              </Button>;
            }
            if (chain.unsupported) {
              return <Button
                size="middle"
                type="primary"
                onClick={() => switchNetwork.switchNetwork?.()}>
                Change Network
              </Button>;
            }
            return <Button
              size="middle"
              type="primary"
              onClick={openAccountModal}>
              {account.displayName}
              {account.displayBalance ? ` (${account.displayBalance})` : ''}
            </Button>;
          })()}
        </div>;
      }}
    </ConnectButton.Custom>
  );
};
