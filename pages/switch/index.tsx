import React, { useEffect, useState } from 'react';
import { useNetwork, useSwitchNetwork } from 'wagmi';
import { Button } from 'antd/lib';
import scrollTestnet from '../chains/scroll/scrollTestnet';

export default
function Switch() {
  const network = useNetwork();
  const switchNetwork = useSwitchNetwork({ chainId: scrollTestnet.id });
  const [hydrated, setHydrated] = React.useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) return <></>;
  return <div>
    <Button
      type="primary"
      loading={switchNetwork.isLoading && switchNetwork.pendingChainId === scrollTestnet.id}
      disabled={network.chain?.id === scrollTestnet.id}
      onClick={() => switchNetwork.switchNetwork?.()}>
      切换到Scroll Testnet
    </Button>
    {/* <pre>{JSON.stringify({ ...switchNetwork, chains: undefined, data: undefined }, null, 2)}</pre> */}
  </div>;
}
