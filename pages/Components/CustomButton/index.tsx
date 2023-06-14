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
                <Button
                  size="middle"
                  type="primary"
                  icon={chain.hasIcon ? <div
                      className={style.chain_icon_wrapper}
                      style={{ background: chain.iconBackground }}>
                    <img src={chain.iconUrl} alt={chain.name ?? 'chain icon'} />
                  </div> : null}
                  onClick={openChainModal}>
                  {chain.hasIcon }
                  {/* {chain.hasIcon && (
                    <div
                      style={{
                        background: chain.iconBackground,
                        width: 12,
                        height: 12,
                        borderRadius: 999,
                        overflow: 'hidden',
                        marginRight: 4,
                      }}
                    >
                      {chain.iconUrl && (
                        <img
                          alt={chain.name ?? 'Chain icon'}
                          src={chain.iconUrl}
                          style={{ width: 12, height: 12 }}
                        />
                      )}
                    </div>
                  )} */}
                  {chain.name}
                </Button>
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
