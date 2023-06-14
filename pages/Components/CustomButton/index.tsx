import { Button, Space } from 'antd/lib';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import style from './index.module.scss';

export
function CustomButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');
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
                onClick={openChainModal}>
                Wrong Network
              </Button>;
            }
            return (
              <Space>
                <div
                  className={style.chain_button}
                  style={{ background: chain.iconBackground }}
                  onClick={openChainModal}>
                  {chain.hasIcon ? <div className={style.chain_icon_wrapper}><img
                    src={chain.iconUrl}
                    alt={chain.name ?? 'chain icon'}
                  /></div> : null}
                  {chain.name}
                </div>
                <Button
                  size="middle"
                  type="primary"
                  onClick={openAccountModal}>
                  {account.displayName}
                  {account.displayBalance ? ` (${account.displayBalance})` : ''}
                </Button>
              </Space>
            );
          })()}
        </div>;
      }}
    </ConnectButton.Custom>
  );
};
